import AddEvent from "../events/AddEvent";
import Events from "../events/Events";

const DashboardRightPanel = ({ socket }) => {
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
