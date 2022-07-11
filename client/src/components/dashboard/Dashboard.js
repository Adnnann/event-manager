import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getLoggedUserData } from "../../features/eventsSlice";
import DashboardRightPanel from "./DashboardRightPanel";

const Dashboard = ({ socket }) => {
  const loggedUser = useSelector(getLoggedUserData);

  useEffect(() => {
    loggedUser?.user && socket?.emit("getUserData", loggedUser.user._id);
  }, []);

  return <DashboardRightPanel socket={socket} />;
};

export default Dashboard;
