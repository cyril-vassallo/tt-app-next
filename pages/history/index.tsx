import {useEffect} from 'react';
import Button from '@mui/material/Button';
import { increment, decrement, selectCounterState } from '../../store/counterSlice';
import { selectUsersState, getUsersError, getUsersStatus, fetchUsers } from '../../store/usersSlice';
import {selectAccountState, getAccountError, getAccountStatus, fetchAccount } from '../../store/AccountSlice';
import { Alert, Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { User } from '../../interfaces/user.interface';
import { Pending } from '@mui/icons-material';


export default function History() {
    const counterState = useAppSelector(selectCounterState);
    const usersState = useAppSelector(selectUsersState);
    const AccountState = useAppSelector(selectAccountState);
    const usersStatus = useAppSelector(getUsersStatus);
    const userStatus = useAppSelector(getAccountStatus);
    const usersError = useAppSelector(getUsersError);
    const userError = useAppSelector(getAccountError);
    const dispatch = useAppDispatch();


    useEffect(() => {
      if(usersStatus === 'idle'){
        dispatch(fetchUsers());
      }
    },[])

    const renderUsers = usersState.map((user, index) => {
      return <div style={{display: 'flex', margin: '5px'}} key={index}>
          <Alert onClick={() => dispatch(fetchAccount({ id: user.id} ))} severity="info">{user.firstName} {user.lastName}</Alert>
        </div>
    }) 

    const renderUser = AccountState && (
      <ul>
        <li>
          {AccountState.firstName}
        </li>
        <li>
          {AccountState.email}
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
      <Button onClick={ () => dispatch(fetchUsers()) } color="primary" variant="contained">Fetch</Button>
      { !usersError && renderUsers}
      { !userError && renderUser}
    </div>
  )
}