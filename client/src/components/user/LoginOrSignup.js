import { useSelector } from "react-redux";
import {
  getSigninUserFormStatus,
  getSignupUserFormStatus,
} from "../../features/eLearningSlice";
import Login from "./Login";
import Signup from "./Signup";

const LoginOrSignup = () => {
  const displayLoginForm = useSelector(getSigninUserFormStatus);
  const displaySignupForm = useSelector(getSignupUserFormStatus);

  return (
    <>
      {displayLoginForm ? <Login /> : null}

      {displaySignupForm ? <Signup /> : null}
    </>
  );
};

export default LoginOrSignup;
