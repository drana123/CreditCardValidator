import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { SearchState } from "@devexpress/dx-react-grid";
import { DataTypeProvider, EditingState } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  PagingPanel,
  TableEditColumn,
  SearchPanel,
  Toolbar,
} from "@devexpress/dx-react-grid-material-ui";
import {
  PagingState,
  SortingState,
  IntegratedSorting,
  IntegratedPaging,
  IntegratedFiltering,
} from "@devexpress/dx-react-grid";
import azure from "../../api/azure";
import { IconButton, Button } from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

const getRowId = (row) => row.emailId;

const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: 'center' }}>
    <Button
      color="primary"
      onClick={onExecute}
      title="Create new row"
    >
      <AddCircleIcon/>
    </Button>
  </div>
);

const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Edit row">
    <EditIcon />
  </IconButton>
);

const DeleteButton = ({ onExecute }) => (
  <IconButton
    onClick={() => {
      if (window.confirm('Are you sure you want to delete this row?')) {
        onExecute();
      }
    }}
    title="Delete row"
  >
    <DeleteIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Save changes">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
    <CancelIcon />
  </IconButton>
);

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return (
    <CommandButton
      onExecute={onExecute}
    />
  );
};

const customSort = (s1, s2) => {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  if (s1 === s2) {
    return 0;
  }

  return s1 > s2 ? 1 : -1;
};

export default () => {
  const [columns] = useState([
    { name: "emailId", title: "Email Id" },
    { name: "username", title: "User Name" },
    { name: "userRoleName", title: "User Role" },
  ]);
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const fetchUserRoles = async () => {
      let userRoleNames = [];
      const response = await azure.get("/api/userManagement/role-get");
      const data = await response.data;
      for (let i = 0; i < data.length; i++) {
        userRoleNames.push(response.data[i].userRoleName);
      }
      setUserRoles(userRoleNames);
    };
    fetchUserRoles();
  }, []);

  const BooleanFormatter = ({ value }) => <Chip label={value} />;

  const BooleanEditor = ({ value, onValueChange, row }) => {
    return (
      <Select
        input={<Input />}
        value={value}
        onChange={(event) => {
          onValueChange(event.target.value);
        }}
        style={{ width: "60%" }}
      >
        {userRoles.map((userRole) => {
          return <MenuItem value={userRole}>{userRole}</MenuItem>;
        })}
      </Select>
    );
  };

  const BooleanTypeProvider = (props) => {
    return (
      <DataTypeProvider
        formatterComponent={BooleanFormatter}
        editorComponent={BooleanEditor}
        {...props}
      />
    );
  };

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      await azure.get("/api/userManagement/user-get").then((response) => {
        var array = response.data;
        setRows(array);
      });
    };
    fetchUserData();
  }, []);

  

  const [searchValue, setSearchState] = useState("");
  const [integratedSortingColumnExtensions] = useState([
    { columnName: "emailId", compare: customSort },
    { columnName: "username", compare: customSort },
    { columnName: "userRoleName", compare: customSort },
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [pageSizes] = useState([5, 10, 15]);
  const [booleanColumns] = useState(["userRoleName"]);

  const [filteringColumnExtensions] = useState([
    {
      predicate: (value, filter, row) => {
        if (!filter.value.length) return true;
        return IntegratedFiltering.defaultPredicate(value, filter, row);
      },
    },
  ]);
  const commitChanges = async ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].emailId : "";

      const params = {
        emailId: added[0].emailId,
        username: added[0].username,
        userRoleName: added[0].userRoleName,
      };

      const response = await azure.post("/api/userManagement/user-add", params);
      if (response.data.status == null) {
        changedRows = [
          ...rows,
          ...added.map((row, index) => ({
            emailId: startingAddedId + index,
            ...row,
          })),
        ];
      }
    }
    if (changed) {
      const email = Object.keys(changed)[0];
      const selectedRow = rows.filter((row) => row.emailId === email);
      const userRole = changed[email].userRoleName;
      const username = changed[email].username;
      const params = {
        emailId: email,
        userRoleName: userRole ? userRole : selectedRow[0].userRoleName,
        username: username ? username : selectedRow[0].username,
      };

      const response = await azure.put(
        "/api/userManagement/user-role-update",
        params
      );
      if (response.data.emailId) {
        changedRows = rows.map((row) =>
          changed[row.emailId] ? { ...row, ...changed[row.emailId] } : row
        );
      }
    }

    if (deleted) {
      console.log(deleted);
      const deletedSet = new Set(deleted);
      changedRows = rows.filter((row) => !deletedSet.has(row.emailId));
      const email = deleted[0];
      const response = await azure.delete(
        `/api/userManagement/user-delete/${email}`
      );
    }
    setRows(changedRows);
  };

  const [tableColumnExtensions] = useState([
    { columnName: "emailId", align: "center" },
    { columnName: "username", align: "center" },
    { columnName: "userRoleName", align: "center" },
  ]);

  return (
    <div className="flex-container">
      <Paper>
        <div data-testid="grid">
          <Grid rows={rows} columns={columns} getRowId={getRowId}>
            <SearchState value={searchValue} onValueChange={setSearchState} />
            <div data-testid="editingState">
              <EditingState onCommitChanges={commitChanges} />
            </div>
            <SortingState />

            <div data-testid="pagingState">
              <PagingState
                currentPage={currentPage}
                onCurrentPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
              />
            </div>

            <IntegratedFiltering columnExtensions={filteringColumnExtensions} />
            <IntegratedSorting
              columnExtensions={integratedSortingColumnExtensions}
            />
            <IntegratedPaging />

            <BooleanTypeProvider for={booleanColumns} />
            <Table columnExtensions={tableColumnExtensions} />
            <TableHeaderRow showSortingControls />

            <TableEditRow />
            <TableEditColumn showAddCommand showEditCommand showDeleteCommand commandComponent={Command}/>
            <div data-testid="pagingPanel">
              <PagingPanel pageSizes={pageSizes} />
            </div>
            <Toolbar />
            <SearchPanel />
          </Grid>
        </div>
      </Paper>
    </div>
  );
};
