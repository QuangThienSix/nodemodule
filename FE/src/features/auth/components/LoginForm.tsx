import { Button, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import { InputField } from 'components/FormField';
import { Users } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginPayload } from '../authSlice';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
export interface LoginFormProps {
  initialValue?: LoginPayload;
  onSubmit?: (formValue: Users) => void;
}

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export default function LoginForm({ initialValue, onSubmit }: LoginFormProps) {
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
        <InputField name="password" control={control} label="Password" />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}&nbsp;Login
          </Button>
        </Box>
      </form>
    </Box>
  );
}
