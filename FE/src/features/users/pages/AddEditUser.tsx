import { ChevronLeft } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import usersApi from 'api/usersApi';
import { useAppSelector } from 'app/hooks';
import { selectMessage } from 'features/socket/socketSlice';
import { Users } from 'models';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { addSingle } from 'utils';
import UsersForm from '../components/UserForm';

export interface IAddEdiProps {}

export default function AddEditPage(props: IAddEdiProps) {
  const testMessage = useAppSelector(selectMessage);
  console.log('Message Server send: ', testMessage);
  const history = useHistory();
  const { user_id } = useParams<{ user_id: string }>();
  const isEdit = Boolean(user_id);
  const [user, setUser] = useState<Users>();

  useEffect(() => {
    if (!user_id) return;

    // IFFE
    (async () => {
      try {
        const data: Users = await usersApi.getById(user_id);
        setUser(data);
      } catch (error) {
        console.log('Failed to fetch user details', error);
      }
    })();
  }, [user_id]);

  const handleUserFormSubmit = async (formValues: Users) => {
    // TODO: Handle submit here, call API  to add/update user
    if (isEdit) {
      try {
        await usersApi.update(formValues);
        // Toast success
        addSingle('success', 'Save users successfully!');

        // Redirect back to user list
        history.push('/admin/user');
      } catch (error: any) {
        console.log(error);
        addSingle(
          'error',
          error.data.errormessage ? error.data.errormessage : 'Failed users update!'
        );
      }
    } else {
      try {
        await usersApi.add(formValues);
        // Toast success
        addSingle('success', 'Save users successfully!');

        // Redirect back to user list
        history.push('/admin/user');
      } catch (error: any) {
        addSingle('error', error.data.errormessage ? error.data.errormessage : 'Failed users add!');
      }
    }
  };
  const initialValues: Users = {
    username: '',
    password: '',
    fullname: '',
    address: '',
    email: '',
    ratting: '',
    accessToken: '',
    refreshToken: '',
    islock: true,
    roles_id: '2',
    ...user,
  } as Users;
  return (
    <Box>
      <Link to="/admin/user">
        <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
          <ChevronLeft /> Back to user list
        </Typography>
      </Link>

      <Typography variant="h4">{isEdit ? 'Update user info' : 'Add new user'}</Typography>

      {(!isEdit || Boolean(user)) && (
        <Box mt={3}>
          <UsersForm isEdit={isEdit} initialValue={initialValues} onSubmit={handleUserFormSubmit} />
        </Box>
      )}
    </Box>
  );
}
