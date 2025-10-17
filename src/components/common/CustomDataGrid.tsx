import * as React from "react";
import Box from "@mui/material/Box";
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
}

const CustomDataGrid = <T extends GridRowModel>(
  props: CustomDataGridProps<T>
) => {
  const {
    rows,
    columns,
    initialState = {
      pagination: {
        paginationModel: { pageSize: 5, page: 0 },
      },
    },
    pageSizeOptions = [5, 10, 25],
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
  } = props;

  return (
    <Box sx={{ height: 500, width: "100%", borderRadius: 1, overflow: 'hidden', boxShadow: 1 }}>
      <DataGrid
        rows={rows}
        columns={columns}
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
      />
    </Box>
  );
};

export default CustomDataGrid;
