import * as React from 'react';
import Button from '@mui/material/Button';
import { increment, decrement, selectCounterState } from '../../store/counterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';

export default function History() {
    const counterState = useSelector(selectCounterState);
    const dispatch = useDispatch();

  return (
    <div>
      <Button onClick={ () => dispatch(decrement({type: 'counter/decrement'})) } color="secondary" variant="contained">Decrement</Button>
      <Button onClick={ () => dispatch(increment({type: 'counter/increment'})) } color="primary" variant="contained">Increment</Button>
      <Badge badgeContent={counterState} color="warning">
            <MailIcon color="primary" />
      </Badge>

    </div>
  )
}