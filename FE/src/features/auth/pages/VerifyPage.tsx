import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { createTheme, Paper, Typography, Box, Alert } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { authActions, VerifyPayload } from '../authSlice';
import VerifyForm from '../components/VerifyForm';

const usetheme = createTheme();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    textAlign: 'center',
  },
  box: {
    padding: usetheme.spacing(2),
  },
}));

export default function VerifyPage() {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const message = useAppSelector((state) => state.auth.errormessage);

  const { email } = useParams<{ email: string }>();

  const handleVerifyClick = async (formValue: VerifyPayload) => {
    dispatch(authActions.verify(formValue));
  };

  const initialValue: VerifyPayload = {
    email: email ? email : '',
    tokenMail: '',
  };

  return (
    <div className={classes.root}>
      <Paper elevation={1} className={classes.box}>
        <Typography variant="h4">Verify</Typography>
        {message && (
          <Alert style={{ marginTop: '10px' }} severity="error">
            {message}
          </Alert>
        )}
        <VerifyForm initialValue={initialValue} onSubmit={handleVerifyClick} />
        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to="/regis" style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
              <ChevronLeft /> Back Register
            </Typography>
          </Link>
          <Link to="/login" style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="caption" style={{ display: 'flex', alignItems: 'center' }}>
              Back Login
              <ChevronRight />
            </Typography>
          </Link>
        </Box>
      </Paper>
    </div>
  );
}
