import { useEffect } from 'react';
import { selectUsersState, getUsersError, getUsersStatus, fetchUsers } from '../../store/usersSlice';
import { selectAccountState, getAccountError, getAccountStatus, fetchLogin } from '../../store/AccountSlice';
import { Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';

export default function History() {
    const usersState = useAppSelector(selectUsersState);
    const AccountState = useAppSelector(selectAccountState);
    const usersStatus = useAppSelector(getUsersStatus);
    const accountStatus = useAppSelector(getAccountStatus);
    const userStatus = useAppSelector(getAccountStatus);
    const usersError = useAppSelector(getUsersError);
    const userError = useAppSelector(getAccountError);
    const dispatch = useAppDispatch();


    useEffect(() => {
      if(usersStatus === 'idle'){
        dispatch(fetchUsers());
      }
      if(accountStatus === 'idle'){
        dispatch(fetchLogin({email: "cv@demo.fr", password: "123"})) 
      }  
    },[usersStatus,accountStatus, dispatch])

    const renderUsers = usersState.map((user, index) => {
      return <div style={{display: 'flex', margin: '5px'}} key={index}>
          <Alert  severity="info">{user.firstName} {user.lastName}</Alert>
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
      { !usersError && renderUsers}
      { !userError && renderUser}
    </div>
  )
}