import { type GridColDef, GridActionsCellItem } from "@mui/x-data-grid";
import CustomDataGrid from "../common/CustomDataGrid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value: any, row: any) =>
      `${row.firstName || ""} ${row.lastName || ""}`,
    flex: 1
  },
  {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 120,
    align: "right",
    alignItems: "right",
    getActions: (params: any) => [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        onClick={() => console.log(params.row.firstName)}
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        color="error"
        onClick={() => console.log(params.row.firstName)}
      />,
    ],
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  { id: 10, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 11, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 12, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 13, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 14, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 15, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 16, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 17, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 18, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 19, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const UserManagement = () => {
  return <CustomDataGrid rows={rows} columns={columns} />;
};

export default UserManagement;
