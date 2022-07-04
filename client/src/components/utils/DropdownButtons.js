import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";

const DropdownButtons = ({
  items,
  clickEvents,
  buttonText,
  icon,
  handleClick,
  handleClose,
  anchorEl,
  open,
  startIcon,
}) => {
  return (
    <div style={{ marginLeft: "auto" }}>
      <Button
        style={{ color: "white", fontSize: "20px", textTransform: "none" }}
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        startIcon={startIcon}
        endIcon={icon}
      >
        {buttonText}
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        {items.map((item, index) => {
          return (
            <MenuItem key={index} onClick={clickEvents[index]} disableRipple>
              {item}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

export default DropdownButtons;
