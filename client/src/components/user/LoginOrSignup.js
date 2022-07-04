import { useSelector } from "react-redux";
import {
  getSigninUserFormStatus,
  getSignupUserFormStatus,
} from "../../features/eventsSlice";
import Login from "./Login";
import Signup from "./Signup";

const LoginOrSignup = ({ socket }) => {
  const displayLoginForm = useSelector(getSigninUserFormStatus);
  const displaySignupForm = useSelector(getSignupUserFormStatus);

  return (
    <>
      {displayLoginForm ? <Login socket={socket} /> : null}

      {displaySignupForm ? <Signup /> : null}
    </>
  );
};

export default LoginOrSignup;
