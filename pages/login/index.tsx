import { FilledInput, FormControl, Input, InputLabel, TextField, Typography, OutlinedInput } from '@mui/material';
import React from 'react'
import { useTheme } from '@mui/material/styles';
import styles from './login.module.scss';


export default function Login() {
  const theme = useTheme();

  const matStyles = {

  }

  return (
    <main className={styles.login}>
      <Typography color="secondary" variant="h1" className={styles.title}>Login</Typography  >
      <div  className={styles.fields}>
        <FormControl variant="outlined" className={styles.field}>
          <InputLabel htmlFor='email'>Email</InputLabel>
          <FilledInput id="email"  type="email"  color='primary' margin="dense" required />
        </FormControl>
        <FormControl variant="outlined"  className={styles.field}>
          <InputLabel htmlFor='password'>Password</InputLabel>
          <FilledInput id="password"  type="password"  color='primary' margin="dense" required />
        </FormControl>
      </div>
    </main>
    )

}