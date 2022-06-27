import { useSelector } from "react-redux";
import { getLoggedUserData } from "../../features/eLearningSlice";
import AddEvent from "../courses/AddEvent";
import MentorCourses from "../courses/MentorCourses";
import UserCourses from "../courses/UserCourses";

const DashboardRightPanel = () => {
  const loggedUser = useSelector(getLoggedUserData);

  return <>{window.location.pathname === "createEvent" && <AddEvent />}</>;
};

export default DashboardRightPanel;
