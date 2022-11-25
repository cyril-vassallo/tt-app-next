import type { NextPage } from "next";
import { selectAuthState, setAuthState } from "../../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from '@mui/material/Button';

const Settings: NextPage = () => {
  const authState = useSelector(selectAuthState);
  const dispatch = useDispatch();
  return (
    <div>
      <div>{authState ? "Logged in" : "Not Logged In"}</div>
      <Button color="secondary"
        onClick={() =>
          authState
            ? dispatch(setAuthState(false))
            : dispatch(setAuthState(true))
        }
      >
        {authState ? "Logout" : "LogIn"}
      </Button>
    </div>
  );
};

export default Settings;