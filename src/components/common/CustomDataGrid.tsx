import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import {
  DataGrid,
  type GridColDef,
  type GridRowModel,
  type GridSlots,
  type GridSortModel,
  type GridFilterModel,
  type GridPaginationModel,
  type GridInitialState,
} from "@mui/x-data-grid";

interface CustomDataGridProps<T extends GridRowModel> {
  rows: T[];
  columns: GridColDef<T>[];
  initialState?: GridInitialState;
  pageSizeOptions?: number[];
  checkboxSelection?: boolean;
  disableRowSelectionOnClick?: boolean;
  slots?: GridSlots;
  sortModel?: GridSortModel;
  onSortModelChange?: (model: GridSortModel) => void;
  filterModel?: GridFilterModel;
  onFilterModelChange?: (model: GridFilterModel) => void;
  paginationModel?: GridPaginationModel;
  onPaginationModelChange?: (model: GridPaginationModel) => void;
  loading?: boolean;
  onRowClick?: (params: { row: T }) => void;
  searchPlaceholder?: string;
  defaultSearch?: string;
  /** enable global edit mode */
  isEditable?: boolean;
  /** when a row gets updated */
  onRowUpdate?: (newRow: T, oldRow: T) => void;
}

const DEBOUNCE_MS = 200;

const CustomDataGrid = <T extends GridRowModel,>({
  rows,
  columns,
  initialState = { pagination: { paginationModel: { pageSize: 10, page: 0 } } },
  pageSizeOptions = [5, 10, 25, 50, 100],
  checkboxSelection = false,
  disableRowSelectionOnClick = true,
  slots = {},
  sortModel,
  onSortModelChange,
  filterModel,
  onFilterModelChange,
  paginationModel,
  onPaginationModelChange,
  loading = false,
  onRowClick,
  searchPlaceholder = "Search…",
  defaultSearch = "",
  isEditable = false,
  onRowUpdate,
}: CustomDataGridProps<T>) => {
  const [search, setSearch] = React.useState(defaultSearch);
  const [debounced, setDebounced] = React.useState(defaultSearch);
  const [localRows, setLocalRows] = React.useState(rows);

  React.useEffect(() => setLocalRows(rows), [rows]);

  React.useEffect(() => {
    const id = window.setTimeout(() => setDebounced(search), DEBOUNCE_MS);
    return () => window.clearTimeout(id);
  }, [search]);

  const lc = (v: unknown): string => {
    if (v == null) return "";
    if (typeof v === "string") return v.toLowerCase();
    if (typeof v === "number" || typeof v === "boolean") return String(v).toLowerCase();
    if (v instanceof Date) return v.toISOString().toLowerCase();
    try {
      return JSON.stringify(v).toLowerCase();
    } catch {
      return String(v).toLowerCase();
    }
  };

  const filteredRows = React.useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!q) return localRows;
    const searchableFields = columns
      .filter((c) => !c.hide && c.field)
      .map((c) => c.field as keyof T);
    return localRows.filter((row) =>
      searchableFields.some((f) => lc((row as any)[f]).includes(q))
    );
  }, [localRows, columns, debounced]);

  const handleRowUpdate = (newRow: any, oldRow: any) => {
    const updatedRow = { ...oldRow, ...newRow };
    const updatedRows = localRows.map((r) => (r.id === oldRow.id ? updatedRow : r));
    setLocalRows(updatedRows);
    onRowUpdate?.(updatedRow, oldRow);
    return updatedRow;
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          p: 1.5,
          pb: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <TextField
          size="small"
          value={search}
          placeholder={searchPlaceholder}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "100%", maxWidth: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
            endAdornment: search ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="clear search"
                  size="small"
                  onClick={() => setSearch("")}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          }}
        />
      </Box>

      <Box
        sx={{
          height: 500,
          width: "100%",
          borderRadius: 1,
          overflow: "hidden",
          boxShadow: 1,
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns.map((col) => ({
            ...col,
            editable: isEditable || col.editable,
          }))}
          initialState={initialState}
          pageSizeOptions={pageSizeOptions}
          checkboxSelection={checkboxSelection}
          disableRowSelectionOnClick={disableRowSelectionOnClick}
          slots={slots}
          sortModel={sortModel}
          onSortModelChange={onSortModelChange}
          filterModel={filterModel}
          onFilterModelChange={onFilterModelChange}
          paginationModel={paginationModel}
          onPaginationModelChange={onPaginationModelChange}
          loading={loading}
          onRowClick={(params) => onRowClick?.({ row: params.row as T })}
          processRowUpdate={handleRowUpdate}
        />
      </Box>
    </Box>
  );
};

export default CustomDataGrid;
