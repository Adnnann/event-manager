import { Select, MenuItem } from "@mui/material";

const SelectComponent = ({
  handleChange,
  selectedValue,
  array,
  disabled,
  className,
  label,
  defaultChecked,
}) => {
  return (
    <>
      <p style={{ textAlign: "left" }}>{label}</p>
      <Select
        fullWidth
        onChange={handleChange}
        value={selectedValue}
        disabled={disabled}
        className={className}
      >
        {array.map((item, index) => {
          return (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};

export default SelectComponent;
