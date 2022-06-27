import { useSelector } from "react-redux";
import { getLoggedUserData } from "../../features/eLearningSlice";
import AddEvent from "../events/AddEvent";
import Events from "../events/Events";

const DashboardRightPanel = () => {
  const loggedUser = useSelector(getLoggedUserData);

  return (
    <>
      {window.location.pathname === "createEvent" ? <AddEvent /> : <Events />}
    </>
  );
};

export default DashboardRightPanel;
