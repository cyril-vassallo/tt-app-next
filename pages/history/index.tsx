import { useEffect } from 'react';
import { selectUsersState, getUsersError, getUsersStatus, fetchUsers } from '../../store/usersSlice';
import { selectAccountState, getAccountError  } from '../../store/accountSlice';
import { Alert, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchTasksByUser, selectTasksState, getTasksError } from '../../store/tasksSlice';
import { UserThunkArgsInterface } from '../../interfaces/user.interface';
import styles from './history.module.scss';

export default function History() {
  const dispatch = useAppDispatch();

  const taskError = useAppSelector(getTasksError); 
  const tasksState = useAppSelector(selectTasksState);
  const userError = useAppSelector(getAccountError);
  const usersError = useAppSelector(getUsersError);
  const usersState = useAppSelector(selectUsersState);
  const usersStatus = useAppSelector(getUsersStatus);
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
      return (<Grid  className={styles.task} item xs={2} sm={4} md={4} key={index}>
              { task.list.map((listItem, i) => <li key={i}>{listItem}</li> )}
            </Grid>)
    });
    

  return (
    <div className={styles.history}>
      { !usersError && renderUsers}
      { !userError && renderUser}
      { !taskError && (<Grid className={styles.tasks} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>{renderTasks}</Grid>)}
    </div>
  )
}