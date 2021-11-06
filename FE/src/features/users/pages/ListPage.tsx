import { Box, Button, Pagination, Typography } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import usersApi from 'api/usersApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { RoleAdmin } from 'constants/user_roles';
import { selectRoleList, selectRoleMap } from 'features/roles/roleSlice';
import { ListParams, PaginationParams, Users } from 'models';
import React, { useEffect } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { addSingle } from 'utils';
import UserFilters from '../components/UserFilters';
import UserTable from '../components/UsersTable';
import {
  selectUsersFilter,
  selectUsersList,
  selectUsersPagination,
  usersAction
} from '../usersSlice';

export interface IListPageProps {
  roles_id: string;
}

const usetheme = createTheme();
const useStyles = makeStyles(() => ({
  root: {},
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: usetheme.spacing(4),
  },
  loading: {
    position: 'absolute',
    padding: usetheme.spacing(-1),
    with: '100%',
  },
}));

export default function ListPage({ roles_id }: IListPageProps) {
  const usersList = useAppSelector(selectUsersList);
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectUsersFilter);
  const roleMap = useAppSelector(selectRoleMap);
  const history = useHistory();
  const match = useRouteMatch();
  const roleList = useAppSelector(selectRoleList);

  const pagination = useAppSelector<PaginationParams>(selectUsersPagination);

  const handlePageChange = (e: any, page: number) => {
    dispatch(
      usersAction.setFilter({
        ...filter,
        _page: page,
      })
    );
  };

  const classes = useStyles();

  useEffect(() => {
    dispatch(usersAction.fetchUsersList(filter));
  }, [dispatch, filter]);

  const handleEditUsers = async (user: Users) => {
    history.push(`${match.url}/${user.user_id}`);
  };
  const handleRemoveUsers = async (user: Users) => {
    try {
      // Remove user API
      await usersApi.remove(user?.user_id || '');
      addSingle('success', 'Remove user successfully!');
      // Trigger to re-fetch user list with current filter
      const newFilter = { ...filter };
      dispatch(usersAction.setFilter(newFilter));
    } catch (error) {
      // Toast error
      console.log('Failed to fetch user', error);
    }
  };
  const handleFilterChange = (newFilter: ListParams) => {
    dispatch(usersAction.setFilter(newFilter));
  };
  const handleSearchChange = (newFilter: ListParams) => {
    dispatch(usersAction.setFilterWithDebounce(newFilter));
  };

  return (
    <Box className={classes.root}>
      {/* Add User */}
      {String(roles_id) === RoleAdmin && (
        <Box className={classes.titleContainer}>
          <Typography variant="h4">User</Typography>

          <Link to={`${match.url}/add`} style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">
              Add new user
            </Button>
          </Link>
        </Box>
      )}

      {/* Filters */}
      <Box mb={3}>
        <UserFilters
          filter={filter}
          roleList={roleList}
          onChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </Box>

      {/* User Table */}
      <UserTable
        roleMap={roleMap}
        usersList={usersList}
        onEdit={handleEditUsers}
        onRemove={handleRemoveUsers}
      />

      {/* Pagination */}

      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          color="primary"
          count={Math.ceil(pagination?._totalRows / pagination?._limit)}
          page={pagination?._page}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
