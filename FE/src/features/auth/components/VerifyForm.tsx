import { Button, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import { InputField } from 'components/FormField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { VerifyPayload } from '../authSlice';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
export interface VerifyFormProps {
  initialValue?: VerifyPayload;
  onSubmit?: (formValue: VerifyPayload) => void;
}
const schema = yup.object().shape({
  tokenMail: yup.string().required('Password is required'),
  email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
});

export default function VerifyForm({ initialValue, onSubmit }: VerifyFormProps) {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<VerifyPayload>({
    defaultValues: initialValue,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValue: VerifyPayload) => {
    await onSubmit?.(formValue);
  };
  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputField name="email" control={control} label="Email" />
        <InputField name="tokenMail" control={control} label="OTP" />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting && <CircularProgress size={16} color="primary" />}&nbsp;Verify
          </Button>
        </Box>
      </form>
    </Box>
  );
}
