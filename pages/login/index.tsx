import { Alert, Button, FilledInput, FormControl, InputLabel, Typography, useForkRef, Link } from '@mui/material';
import React, { useRef, useState } from 'react'
import styles from './login.module.scss';
import LoginIcon from '@mui/icons-material/Login';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchLogin, fetchCreateAccount, getAccountStatus } from '../../store/AccountSlice';
import { useRouter } from 'next/router'
import { THUNK_STATUS } from '../../enums/actions.enums';
import { useEffect } from 'react';


export default function Login() {
  const dispatch = useAppDispatch();
  const [displayMessage, setDisplayMessage] = useState(false);
  const [displaySubscribeBloc, setDisplaySubscribeBloc] = useState(false);
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const accountStatus = useAppSelector(getAccountStatus); 

  useEffect(()=> {
    if(accountStatus === THUNK_STATUS.PENDING){
      setDisplayMessage(false);
    }

    if(accountStatus === THUNK_STATUS.SUCCEEDED) {
      router.push('/history');
    }

  }, [accountStatus, dispatch, router]);

  const handleSubmit = async () => {
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    if( email && password) {
      setDisplayMessage(false);
      dispatch(fetchLogin({email, password}));
    }else {
      setDisplayMessage(true);
    }
  }

  const handleSubscribe = async () => {
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;
    const passwordConfirm = passwordConfirmRef?.current?.value;
    const firstName = firstNameRef?.current?.value;
    const lastName = lastNameRef?.current?.value;

    if( email && password && passwordConfirm && firstName && lastName) {
      setDisplayMessage(false);
      dispatch(fetchCreateAccount({email, password, firstName, lastName}));
    }else {
      setDisplayMessage(true);
    }
  }

  const handleClickLink = () => {
    setDisplaySubscribeBloc(!displaySubscribeBloc);
    setDisplayMessage(false);
  }

  return (
    <main className={styles.login}>
        <Typography color='primary' variant="h1" className={styles.titlePart1}>
          Taski
          <span className={styles.titlePart2}>Team</span>
        </Typography>

     { !displaySubscribeBloc ?  
      ( 
      <div id="login">
        <Typography color="secondary" variant="h2" className={styles.subtitle}>Login</Typography>
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
          <Button className={styles.submit}  onClick={()=> handleSubmit()} color="primary" variant="contained" endIcon={<LoginIcon />}>
            Login
          </Button>
        </form>
        <div className={styles.link}>
          <Link onClick={() => handleClickLink()}  href="#login" color="primary" underline="none" variant='subtitle2'>
            Pas encore de compte
          </Link>
        </div>
      </div>
     )
     :
     (
      <div id="subscribe">
        <Typography color="secondary" variant="h2" className={styles.subtitle}>Subscribe</Typography>
        <form  className={styles.fields}>
          <FormControl variant="outlined" className={styles.field}>
            <InputLabel htmlFor='lastName'>Firstname</InputLabel>
            <FilledInput inputRef={firstNameRef} id="firstName"  type="firstName"  color='primary' margin="dense" required />
          </FormControl>
          <FormControl variant="outlined" className={styles.field}>
            <InputLabel htmlFor='lastName'>Lastname</InputLabel>
            <FilledInput inputRef={lastNameRef} id="lastName"  type="lastName"  color='primary' margin="dense" required />
          </FormControl>
          <FormControl variant="outlined" className={styles.field}>
            <InputLabel htmlFor='email'>Email</InputLabel>
            <FilledInput inputRef={emailRef} id="email"  type="email"  color='primary' margin="dense" required />
          </FormControl>
          <FormControl variant="outlined"  className={styles.field}>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <FilledInput inputRef={passwordRef} id="password"  type="password"  color='primary' margin="dense" required />
          </FormControl>
          <FormControl variant="outlined"  className={styles.field}>
            <InputLabel htmlFor='passwordConfirm'>Confirmation password</InputLabel>
            <FilledInput inputRef={passwordConfirmRef} id="passwordConfirm"  type="passwordConfirm"  color='primary' margin="dense" required />
          </FormControl>
          {displayMessage && <Alert className={styles.alert} severity="error">Check filled information !</Alert>}
          <Button className={styles.submit}  onClick={()=> handleSubscribe()} color="primary" variant="contained" endIcon={<GroupAddIcon />}>
            Subscribe
          </Button>
        </form>
        <div className={styles.link}>
          <Link  onClick={() => handleClickLink()} href="#subscribe" color="primary" underline="none" variant='subtitle2'>
            Retour à la page de connexion
          </Link>
        </div>
      </div> 
           )}
    </main>
    )

}