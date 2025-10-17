import React, { useState, useEffect } from 'react';
import {
  Box,
  Tab,
  Tabs,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Paper,
  IconButton,
  Chip,
  FormControl,
  InputLabel,
  Autocomplete,
  type SxProps,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';
import CustomTextField from '../common/CustomTextField'; 
import CustomDataGrid from '../common/CustomDataGrid';
import { type GridColDef, GridActionsCellItem } from '@mui/x-data-grid';

// Types
interface User {
  id: string; // Added id field
  EN: string;
  GRP_KEY?: string;
  NAME: string;
  EMAIL: string;
  CREATED_DATE: string;
  CREATED_BY: string;
  UPDATED_DATE: string;
  UPDATED_BY: string;
  IS_ACTIVE: number;
}

interface CommodityGroup {
  id: string; // Added id field
  GRP_KEY: string;
  GRP_NAME: string;
  CREATED_DATE: string;
  CREATED_BY: string;
  UPDATED_DATE: string;
  UPDATED_BY: string;
  IS_ACTIVE: number;
}

interface CommodityGroupMap {
  id: string; // Added id field
  GRP_KEY: string;
  CMT_NAME: string;
  CREATED_DATE: string;
  CREATED_BY: string;
  UPDATED_DATE: string;
  UPDATED_BY: string;
  IS_ACTIVE: number;
}

// Mock Data with id fields
const initialUsers: User[] = [
  { id: '1', EN: 'U001', GRP_KEY: 'G001', NAME: 'Alice Johnson', EMAIL: 'alice@example.com', CREATED_DATE: new Date().toISOString(), CREATED_BY: 'admin', UPDATED_DATE: new Date().toISOString(), UPDATED_BY: 'admin', IS_ACTIVE: 1 },
  { id: '2', EN: 'U002', GRP_KEY: 'G002', NAME: 'Bob Smith', EMAIL: 'bob@example.com', CREATED_DATE: new Date().toISOString(), CREATED_BY: 'admin', UPDATED_DATE: new Date().toISOString(), UPDATED_BY: 'admin', IS_ACTIVE: 1 },
];

const initialGroups: CommodityGroup[] = [
  { id: '1', GRP_KEY: 'G001', GRP_NAME: 'Electronics', CREATED_DATE: new Date().toISOString(), CREATED_BY: 'admin', UPDATED_DATE: new Date().toISOString(), UPDATED_BY: 'admin', IS_ACTIVE: 1 },
  { id: '2', GRP_KEY: 'G002', GRP_NAME: 'Apparel', CREATED_DATE: new Date().toISOString(), CREATED_BY: 'admin', UPDATED_DATE: new Date().toISOString(), UPDATED_BY: 'admin', IS_ACTIVE: 1 },
];

const initialMaps: CommodityGroupMap[] = [
  { id: '1', GRP_KEY: 'G001', CMT_NAME: 'Laptops', CREATED_DATE: new Date().toISOString(), CREATED_BY: 'admin', UPDATED_DATE: new Date().toISOString(), UPDATED_BY: 'admin', IS_ACTIVE: 1 },
  { id: '2', GRP_KEY: 'G001', CMT_NAME: 'Smartphones', CREATED_DATE: new Date().toISOString(), CREATED_BY: 'admin', UPDATED_DATE: new Date().toISOString(), UPDATED_BY: 'admin', IS_ACTIVE: 1 },
  { id: '3', GRP_KEY: 'G002', CMT_NAME: 'T-Shirts', CREATED_DATE: new Date().toISOString(), CREATED_BY: 'admin', UPDATED_DATE: new Date().toISOString(), UPDATED_BY: 'admin', IS_ACTIVE: 1 },
];

// Main Component
const CommodityManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [groups, setGroups] = useState<CommodityGroup[]>(initialGroups);
  const [maps, setMaps] = useState<CommodityGroupMap[]>(initialMaps);

  // Dialog States
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [openGroupDialog, setOpenGroupDialog] = useState(false);
  const [openMapDialog, setOpenMapDialog] = useState(false);

  // Selected Item for Edit
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<CommodityGroup | null>(null);
  const [selectedMap, setSelectedMap] = useState<CommodityGroupMap | null>(null);

  // Form Values
  const [userForm, setUserForm] = useState<Omit<User, 'CREATED_DATE' | 'UPDATED_DATE'> & { CREATED_DATE?: string, UPDATED_DATE?: string }>({
    id: '',
    EN: '',
    GRP_KEY: '',
    NAME: '',
    EMAIL: '',
    CREATED_BY: 'admin',
    UPDATED_BY: 'admin',
    IS_ACTIVE: 1,
  });

  const [groupForm, setGroupForm] = useState<Omit<CommodityGroup, 'CREATED_DATE' | 'UPDATED_DATE'> & { CREATED_DATE?: string, UPDATED_DATE?: string }>({
    id: '',
    GRP_KEY: '',
    GRP_NAME: '',
    CREATED_BY: 'admin',
    UPDATED_BY: 'admin',
    IS_ACTIVE: 1,
  });

  const [mapForm, setMapForm] = useState<Omit<CommodityGroupMap, 'CREATED_DATE' | 'UPDATED_DATE'> & { CREATED_DATE?: string, UPDATED_DATE?: string }>({
    id: '',
    GRP_KEY: '',
    CMT_NAME: '',
    CREATED_BY: 'admin',
    UPDATED_BY: 'admin',
    IS_ACTIVE: 1,
  });

  // Handlers
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const openAddUserDialog = () => {
    setSelectedUser(null);
    setUserForm({
      id: uuidv4(),
      EN: uuidv4().slice(0, 6).toUpperCase(),
      GRP_KEY: '',
      NAME: '',
      EMAIL: '',
      CREATED_BY: 'admin',
      UPDATED_BY: 'admin',
      IS_ACTIVE: 1,
    });
    setOpenUserDialog(true);
  };

  const openEditUserDialog = (user: User) => {
    setSelectedUser(user);
    setUserForm({ ...user });
    setOpenUserDialog(true);
  };

  const saveUser = () => {
    const now = new Date().toISOString();
    const updatedUser = {
      ...userForm,
      CREATED_DATE: selectedUser ? userForm.CREATED_DATE : now,
      UPDATED_DATE: now,
    };

    if (selectedUser) {
      setUsers(users.map(u => u.EN === selectedUser.EN ? updatedUser : u));
    } else {
      setUsers([...users, updatedUser]);
    }
    setOpenUserDialog(false);
  };

  const deleteUser = (en: string) => {
    setUsers(users.filter(u => u.EN !== en));
  };

  const openAddGroupDialog = () => {
    setSelectedGroup(null);
    setGroupForm({
      id: uuidv4(),
      GRP_KEY: uuidv4().slice(0, 6).toUpperCase(),
      GRP_NAME: '',
      CREATED_BY: 'admin',
      UPDATED_BY: 'admin',
      IS_ACTIVE: 1,
    });
    setOpenGroupDialog(true);
  };

  const openEditGroupDialog = (group: CommodityGroup) => {
    setSelectedGroup(group);
    setGroupForm({ ...group });
    setOpenGroupDialog(true);
  };

  const saveGroup = () => {
    const now = new Date().toISOString();
    const updatedGroup = {
      ...groupForm,
      CREATED_DATE: selectedGroup ? groupForm.CREATED_DATE : now,
      UPDATED_DATE: now,
    };

    if (selectedGroup) {
      setGroups(groups.map(g => g.GRP_KEY === selectedGroup.GRP_KEY ? updatedGroup : g));
    } else {
      setGroups([...groups, updatedGroup]);
    }
    setOpenGroupDialog(false);
  };

  const deleteGroup = (grpKey: string) => {
    setGroups(groups.filter(g => g.GRP_KEY !== grpKey));
    // Also remove related maps
    setMaps(maps.filter(m => m.GRP_KEY !== grpKey));
    // Also update users who reference this group
    setUsers(users.map(u => u.GRP_KEY === grpKey ? { ...u, GRP_KEY: '' } : u));
  };

  const openAddMapDialog = () => {
    setSelectedMap(null);
    setMapForm({
      id: uuidv4(),
      GRP_KEY: '',
      CMT_NAME: '',
      CREATED_BY: 'admin',
      UPDATED_BY: 'admin',
      IS_ACTIVE: 1,
    });
    setOpenMapDialog(true);
  };

  const openEditMapDialog = (map: CommodityGroupMap) => {
    setSelectedMap(map);
    setMapForm({ ...map });
    setOpenMapDialog(true);
  };

  const saveMap = () => {
    const now = new Date().toISOString();
    const updatedMap = {
      ...mapForm,
      CREATED_DATE: selectedMap ? mapForm.CREATED_DATE : now,
      UPDATED_DATE: now,
    };

    if (selectedMap) {
      setMaps(maps.map(m => m.GRP_KEY === selectedMap.GRP_KEY && m.CMT_NAME === selectedMap.CMT_NAME ? updatedMap : m));
    } else {
      setMaps([...maps, updatedMap]);
    }
    setOpenMapDialog(false);
  };

  const deleteMap = (grpKey: string, cmtName: string) => {
    setMaps(maps.filter(m => !(m.GRP_KEY === grpKey && m.CMT_NAME === cmtName)));
  };

  // DataGrid Columns
  const userColumns: GridColDef<User>[] = [
    { field: 'EN', headerName: 'EN', width: 100 },
    { field: 'GRP_KEY', headerName: 'Group Key', width: 120 },
    { field: 'NAME', headerName: 'Name', flex: 1 },
    { field: 'EMAIL', headerName: 'Email', flex: 1 },
    {
      field: 'CREATED_DATE',
      headerName: 'Created',
      width: 150,
      renderCell: (params) => new Date(params.value as string).toLocaleString()
    },
    {
      field: 'IS_ACTIVE',
      headerName: 'Active',
      width: 80,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      )
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => openEditUserDialog(params.row as User)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          color="error"
          onClick={() => deleteUser(params.row.EN)}
        />,
      ],
    },
  ];

  const groupColumns: GridColDef<CommodityGroup>[] = [
    { field: 'GRP_KEY', headerName: 'Group Key', width: 120 },
    { field: 'GRP_NAME', headerName: 'Group Name', flex: 1 },
    {
      field: 'CREATED_DATE',
      headerName: 'Created',
      width: 150,
      renderCell: (params) => new Date(params.value as string).toLocaleString()
    },
    {
      field: 'IS_ACTIVE',
      headerName: 'Active',
      width: 80,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      )
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => openEditGroupDialog(params.row as CommodityGroup)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          color="error"
          onClick={() => deleteGroup(params.row.GRP_KEY)}
        />,
      ],
    },
  ];

  const mapColumns: GridColDef<CommodityGroupMap>[] = [
    { field: 'GRP_KEY', headerName: 'Group Key', width: 120 },
    { field: 'CMT_NAME', headerName: 'Commodity Name', flex: 1 },
    {
      field: 'CREATED_DATE',
      headerName: 'Created',
      width: 150,
      renderCell: (params) => new Date(params.value as string).toLocaleString()
    },
    {
      field: 'IS_ACTIVE',
      headerName: 'Active',
      width: 80,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      )
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 120,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          onClick={() => openEditMapDialog(params.row as CommodityGroupMap)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          color="error"
          onClick={() => deleteMap(params.row.GRP_KEY, params.row.CMT_NAME)}
        />,
      ],
    },
  ];

  // Render
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Commodity & User Management
      </Typography>

      <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="User Management" />
        <Tab label="Commodity Groups" />
        <Tab label="Group-Commodity Map" />
      </Tabs>

      {/* User Management Tab */}
      {activeTab === 0 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Users</Typography>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={openAddUserDialog}
            >
              Add User
            </Button>
          </Box>
          <Paper sx={{ height: 400, width: '100%' }}>
            <CustomDataGrid<User>
              rows={users}
              columns={userColumns}
              onRowClick={(params) => console.log(params.row.NAME)}
            />
          </Paper>
        </Box>
      )}

      {/* Commodity Groups Tab */}
      {activeTab === 1 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Commodity Groups</Typography>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={openAddGroupDialog}
            >
              Add Group
            </Button>
          </Box>
          <Paper sx={{ height: 400, width: '100%' }}>
            <CustomDataGrid<CommodityGroup>
              rows={groups}
              columns={groupColumns}
              onRowClick={(params) => console.log(params.row.GRP_NAME)}
            />
          </Paper>
        </Box>
      )}

      {/* Group-Commodity Map Tab */}
      {activeTab === 2 && (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Group-Commodity Mapping</Typography>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={openAddMapDialog}
            >
              Add Mapping
            </Button>
          </Box>
          <Paper sx={{ height: 400, width: '100%' }}>
            <CustomDataGrid<CommodityGroupMap>
              rows={maps}
              columns={mapColumns}
              onRowClick={(params) => console.log(params.row.CMT_NAME)}
            />
          </Paper>
        </Box>
      )}

      {/* User Dialog */}
      <Dialog open={openUserDialog} onClose={() => setOpenUserDialog(false)}>
        <DialogTitle>{selectedUser ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <CustomTextField
            label="EN (Auto)"
            value={userForm.EN}
            handleChange={() => {}} // No change handler for auto field
            disabled
            sx={{ mb: 2 }}
          />
          
          <FormControl fullWidth margin="dense">
            <InputLabel>Group Key</InputLabel>
            <Select
              value={userForm.GRP_KEY}
              onChange={(e) => setUserForm({ ...userForm, GRP_KEY: e.target.value })}
              label="Group Key"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {groups.map((g) => (
                <MenuItem key={g.GRP_KEY} value={g.GRP_KEY}>{g.GRP_NAME} ({g.GRP_KEY})</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <CustomTextField
            label="Name"
            value={userForm.NAME}
            handleChange={(e) => setUserForm({ ...userForm, NAME: e.target.value })}
            sx={{ mt: 2 }}
          />
          
          <CustomTextField
            label="Email"
            value={userForm.EMAIL}
            handleChange={(e) => setUserForm({ ...userForm, EMAIL: e.target.value })}
            type="email"
            sx={{ mt: 2 }}
          />
          
          <FormControl fullWidth margin="dense" sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={userForm.IS_ACTIVE}
              onChange={(e) => setUserForm({ ...userForm, IS_ACTIVE: Number(e.target.value) })}
              label="Status"
            >
              <MenuItem value={1}>Active</MenuItem>
              <MenuItem value={0}>Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenUserDialog(false)}>Cancel</Button>
          <Button onClick={saveUser} variant="contained">
            {selectedUser ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Group Dialog */}
      <Dialog open={openGroupDialog} onClose={() => setOpenGroupDialog(false)}>
        <DialogTitle>{selectedGroup ? 'Edit Group' : 'Add Group'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <CustomTextField
            label="Group Key (Auto)"
            value={groupForm.GRP_KEY}
            handleChange={() => {}} // No change handler for auto field
            disabled
            sx={{ mb: 2 }}
          />
          
          <CustomTextField
            label="Group Name"
            value={groupForm.GRP_NAME}
            handleChange={(e) => setGroupForm({ ...groupForm, GRP_NAME: e.target.value })}
            sx={{ mt: 2 }}
          />
          
          <FormControl fullWidth margin="dense" sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={groupForm.IS_ACTIVE}
              onChange={(e) => setGroupForm({ ...groupForm, IS_ACTIVE: Number(e.target.value) })}
              label="Status"
            >
              <MenuItem value={1}>Active</MenuItem>
              <MenuItem value={0}>Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenGroupDialog(false)}>Cancel</Button>
          <Button onClick={saveGroup} variant="contained">
            {selectedGroup ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Map Dialog */}
      <Dialog open={openMapDialog} onClose={() => setOpenMapDialog(false)}>
        <DialogTitle>{selectedMap ? 'Edit Mapping' : 'Add Mapping'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <FormControl fullWidth margin="dense">
            <InputLabel>Group Key</InputLabel>
            <Select
              value={mapForm.GRP_KEY}
              onChange={(e) => setMapForm({ ...mapForm, GRP_KEY: e.target.value })}
              label="Group Key"
            >
              <MenuItem value=""><em>Select Group</em></MenuItem>
              {groups.map((g) => (
                <MenuItem key={g.GRP_KEY} value={g.GRP_KEY}>{g.GRP_NAME} ({g.GRP_KEY})</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <CustomTextField
            label="Commodity Name"
            value={mapForm.CMT_NAME}
            handleChange={(e) => setMapForm({ ...mapForm, CMT_NAME: e.target.value })}
            sx={{ mt: 2 }}
          />
          
          <FormControl fullWidth margin="dense" sx={{ mt: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={mapForm.IS_ACTIVE}
              onChange={(e) => setMapForm({ ...mapForm, IS_ACTIVE: Number(e.target.value) })}
              label="Status"
            >
              <MenuItem value={1}>Active</MenuItem>
              <MenuItem value={0}>Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenMapDialog(false)}>Cancel</Button>
          <Button onClick={saveMap} variant="contained">
            {selectedMap ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CommodityManagement;