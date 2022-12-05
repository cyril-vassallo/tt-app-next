import { Alert, Button, FilledInput, FormControl, InputLabel, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import styles from './login.module.scss';
import LoginIcon from '@mui/icons-material/Login';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchLogin, getAccountStatus } from '../../store/AccountSlice';
import { useRouter } from 'next/router'
import { THUNK_STATUS } from '../../enums/actions.enums';

export default function Login() {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const accountStatus = useAppSelector(getAccountStatus); 

  const handleSubmit = async () => {
    console.log('handleSubmit');
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    if( email && password) {
      console.log('has good data');
      setDisplayMessage(false);
      await dispatch(fetchLogin({email, password}));
      
      if(accountStatus === THUNK_STATUS.PENDING){
        setIsLoading(true);
        console.log(isLoading);

        setDisplayMessage(false);
      }

      if(accountStatus === THUNK_STATUS.SUCCEEDED) {
        console.log(isLoading);
        router.push('/history');
      }
    }else {
      setIsLoading(false);
      setDisplayMessage(true);
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
        {displayMessage && <Alert className={styles.alert} severity="error">Check filled information !</Alert>}
        <Button onClick={()=> handleSubmit()} color="primary" variant="contained" endIcon={<LoginIcon />}>
          {isLoading ? 'Loading': 'Login'}
        </Button>
      </form>
    </main>
    )

}