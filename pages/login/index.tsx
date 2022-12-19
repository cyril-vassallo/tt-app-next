import { Alert, Button, FilledInput, FormControl, InputLabel, Typography, useForkRef, Link } from '@mui/material';
import React, { useRef, useState } from 'react'
import styles from './login.module.scss';
import LoginIcon from '@mui/icons-material/Login';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchCurrentUserAccount, fetchCreateAccount, getAccountStatus, selectAccountState } from '../../store/accountSlice';
import { fetchLoginWithCredential, getAccessTokenStatus, selectAccessTokenState } from '../../store/authSlice';
import { useRouter } from 'next/router'
import { THUNK_STATUS } from '../../enums/actions.enums';
import { useEffect } from 'react';
import { jwtService } from '../../services/jwt.service';



export default function Login() {
  const dispatch = useAppDispatch();
  const [displayMessage, setDisplayMessage] = useState(false);
  const [displaySubscribeBloc, setDisplaySubscribeBloc] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const accountStatus = useAppSelector(getAccountStatus);
  const accountState = useAppSelector(selectAccountState);  
  const accessTokenStatus = useAppSelector(getAccessTokenStatus); 
  const accessTokenState = useAppSelector(selectAccessTokenState); 

  useEffect(()=> {
    if(accountStatus === THUNK_STATUS.PENDING){
      setDisplayMessage(false);
    }

    if(accountStatus === THUNK_STATUS.SUCCEEDED) {
      if(accountState) {
        router.push('/history');
      }else{
        setDisplaySubscribeBloc(false);
      }
    
    }

    if(accessTokenStatus === THUNK_STATUS.SUCCEEDED){
      jwtService.setToken(accessTokenState);
    }

  }, [accessTokenStatus, accessTokenState, accountStatus, accountState, dispatch, router]);

  const handleSubmit = async () => {
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    if( email && password) {
      setDisplayMessage(false);
      await dispatch(fetchLoginWithCredential({email, password}));
      await dispatch(fetchCurrentUserAccount());
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


  const handleChange = (event: any) => {
    const value = event.target.value
    setEmail(value);
    setPassword(value);
    setPasswordConfirm(value);
    setLastName(value);
    setFirstName(value);
  };

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
            <FilledInput inputRef={emailRef} id="email"  type="email" name="email" color='primary' margin="dense" onChange={handleChange} value={email} required />
          </FormControl>
          <FormControl variant="outlined"  className={styles.field}>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <FilledInput inputRef={passwordRef} id="password"  type="password" name="password" color='primary' margin="dense" onChange={handleChange} value={password} required />
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
            <InputLabel htmlFor='firstName'>Firstname</InputLabel>
            <FilledInput inputRef={firstNameRef} id="firstName"  type="text" name="firstName"  color='primary' margin="dense" value={firstName} required />
          </FormControl>
          <FormControl variant="outlined" className={styles.field}>
            <InputLabel htmlFor='lastName'>Lastname</InputLabel>
            <FilledInput inputRef={lastNameRef} id="lastName"  type="text" name="lastName"  color='primary' margin="dense" value={lastName} required />
          </FormControl>
          <FormControl variant="outlined" className={styles.field}>
            <InputLabel htmlFor='email'>Email</InputLabel>
            <FilledInput inputRef={emailRef} id="email"  type="email" name="email" color='primary' margin="dense" value={email} required />
          </FormControl>
          <FormControl variant="outlined"  className={styles.field}>
            <InputLabel htmlFor='password'>Password</InputLabel>
            <FilledInput inputRef={passwordRef} id="password"  type="password" name="password" color='primary' margin="dense" value={password} required />
          </FormControl>
          <FormControl variant="outlined"  className={styles.field}>
            <InputLabel htmlFor='passwordConfirm'>Confirmation password</InputLabel>
            <FilledInput inputRef={passwordConfirmRef} id="passwordConfirm"  type="password" name="passwordConfirm" color='primary' margin="dense" value={passwordConfirm} required />
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