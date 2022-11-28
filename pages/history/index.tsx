import {useEffect} from 'react';
import Button from '@mui/material/Button';
import { increment, decrement, selectCounterState } from '../../store/counterSlice';
import { selectUsersState, getUsersError, getUsersStatus, fetchUsers, fetchUser, selectUserState } from '../../store/usersSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Alert, Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';


export default function History() {
    const counterState = useSelector(selectCounterState);
    const usersState = useSelector(selectUsersState);
    const userState = useSelector(selectUserState);
    const usersStatus = useSelector(getUsersStatus);
    const error = useSelector(getUsersError);
    const dispatch = useDispatch<any>();

    useEffect(() => {
      if(usersStatus === 'idle'){
        dispatch(fetchUsers());
      }
    },[usersStatus, dispatch])

    const renderUsers = usersState.map((user, index) => {
      return <div style={{display: 'flex', margin: '5px'}} key={index}>
          <Alert onClick={() => dispatch(fetchUser(user.id))} severity="info">{user.name}</Alert>
        </div>
    }) 

    const renderUser = userState && (
      <ul>
        <li>
          {userState.name}
        </li>
        <li>
          {userState.email}
        </li>
      </ul>
    );
    

  return (
    
    <div>
      <Button onClick={ () => dispatch(decrement({type: 'counter/decrement'})) } color="secondary" variant="contained">Decrement</Button>
      <Button onClick={ () => dispatch(increment({type: 'counter/increment'})) } color="primary" variant="contained">Increment</Button>
      <Badge badgeContent={counterState} color="warning">
            <MailIcon color="primary" />
      </Badge>
      { !error && renderUsers}
      { !error && renderUser}
    </div>
  )
}