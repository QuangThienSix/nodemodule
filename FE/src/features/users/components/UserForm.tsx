import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import { InputField } from 'components/FormField';
import { Users } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

export interface UsersFormProps {
  initialValue?: Users;
  isEdit: Boolean;
  onSubmit?: (formValue: Users) => void;
}

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  fullname: yup.string().required('Fullname is required'),
  address: yup.string().required('Address is required'),
  email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
});

export default function UsersForm({ initialValue, isEdit, onSubmit }: UsersFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Users>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValue: Users) => {
    await onSubmit?.(formValue);
  };
  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="username" control={control} label="Username" />
        {!isEdit && <InputField name="password" control={control} label="Password" />}
        <InputField name="fullname" control={control} label="Fullname" />
        <InputField name="address" control={control} label="Address" />
        <InputField name="email" control={control} label="Email" />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}&nbsp;Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}
