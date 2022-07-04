import { useSelector } from "react-redux";

import {
  getLoggedUserData,
  getCloseAccountFormStatus,
  getEditUserFormStatus,
  getEditUserPasswordFormStatus,
  getEvents,
  getFilter,
  getUserToken,
} from "../../features/eventsSlice";
import AddEvent from "../events/AddEvent";
import Events from "../events/Events";

const DashboardRightPanel = ({ socket }) => {
  const loggedUser = useSelector(getLoggedUserData);
  const events = useSelector(getEvents);
  const filter = "allEvents";

  return (
    <>
      {window.location.pathname === "createEvent" ? (
        <AddEvent />
      ) : (
        <Events socket={socket} />
      )}
    </>
  );
};

export default DashboardRightPanel;
