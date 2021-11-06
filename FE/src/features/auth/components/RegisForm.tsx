import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import { InputField, RadioGroupField } from 'components/FormField';
import { Users } from 'models';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
export interface RegisFormProps {
  initialValue?: Users;
  onSubmit?: (formValue: Users) => void;
}
const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  fullname: yup.string().required('Fullname is required'),
  address: yup.string().required('Address is required'),
  email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
});

export default function RegisForm({ initialValue, onSubmit }: RegisFormProps) {
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
        <InputField name="fullname" control={control} label="Fullname" />
        <InputField name="address" control={control} label="Address" />
        <InputField name="email" control={control} label="Email" />
        <RadioGroupField
          name="roles_id"
          control={control}
          options={[
            // { label: 'Seller', value: '3' },
            { label: 'Bidder', value: '2' },
            // { label: 'Guest', value: '4' },
          ]}
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}&nbsp;Register
          </Button>
        </Box>
      </form>
    </Box>
  );
}
