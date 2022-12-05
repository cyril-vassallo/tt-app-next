import { Button, FilledInput, FormControl, InputLabel, Typography } from '@mui/material';
import React, { useRef } from 'react'
import styles from './login.module.scss';
import LoginIcon from '@mui/icons-material/Login';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchLogin, getAccountStatus } from '../../store/AccountSlice';
import { useRouter } from 'next/router'
import { THUNK_STATUS } from '../../enums/actions.enums';

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const accountStatus = useAppSelector(getAccountStatus);

  const handleSubmit = async () => {
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    if( email && password) {
      await dispatch(fetchLogin({email, password}));
      if(accountStatus === THUNK_STATUS.SUCCEEDED) {
        router.push('/history');
      }
    }
  }


  return (
    <main className={styles.login}>
      <Typography color='primary' variant="h1" className={styles.titlePart1}>
        Taski
        <span className={styles.titlePart2}>Team</span>
      </Typography>
      <Typography color="secondary" variant="h2" className={styles.title}>Login</Typography>
      <form  className={styles.fields}>
        <FormControl variant="outlined" className={styles.field}>
          <InputLabel htmlFor='email'>Email</InputLabel>
          <FilledInput inputRef={emailRef} id="email"  type="email"  color='primary' margin="dense" required />
        </FormControl>
        <FormControl variant="outlined"  className={styles.field}>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <FilledInput inputRef={passwordRef} id="password"  type="password"  color='primary' margin="dense" required />
        </FormControl>
        <Button onClick={()=> handleSubmit()} color="primary" variant="contained" endIcon={<LoginIcon />}>
          Login
        </Button>
      </form>
    </main>
    )

}