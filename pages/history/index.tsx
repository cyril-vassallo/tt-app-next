import { useEffect } from 'react';
import { selectUsersState, getUsersError, getUsersStatus, fetchUsers } from '../../store/usersSlice';
import { selectAccountState, getAccountError, getAccountStatus, fetchLogin } from '../../store/AccountSlice';
import { Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchTasksByUser, selectTasksState, getTasksError } from '../../store/tasksSlice';
import { UserThunkArgsInterface } from '../../interfaces/user.interface';

export default function History() {
  const dispatch = useAppDispatch();

  const taskError = useAppSelector(getTasksError); 
  const tasksState = useAppSelector(selectTasksState);
  const userError = useAppSelector(getAccountError);
  const usersError = useAppSelector(getUsersError);
  const usersState = useAppSelector(selectUsersState);
  const usersStatus = useAppSelector(getUsersStatus);
  const userStatus = useAppSelector(getAccountStatus);
  const accountState = useAppSelector(selectAccountState);


    useEffect(() => {
      if(usersStatus === 'idle'){
        dispatch(fetchUsers());
      }
    },[usersStatus, dispatch])

    const renderUsers = usersState.map((user, index) => {
      return <div style={{display: 'flex', margin: '5px'}} key={index}>
          <Alert onClick={()=> dispatch(fetchTasksByUser(user as UserThunkArgsInterface))}  severity="info">{user.firstName} {user.lastName}</Alert>
        </div>
    }) 

    const renderUser = accountState && (
      <ul>
        <li>
          {accountState.firstName}
        </li>
        <li>
          {accountState.email}
        </li>
      </ul>
    );

    const renderTasks = tasksState && tasksState.map((task, index) => {
      return (<ul key={index}> 
         { task.list.map((listItem, i) => <li key={i}>{listItem}</li> )}
        </ul>
      )
    
    });
    

  return (
    <div>
      { !usersError && renderUsers}
      { !userError && renderUser}
      { !taskError && renderTasks}
    </div>
  )
}