import { TextField, Grid } from "@mui/material";

export default function TextFieldsGenerator({
  array,
  handleChange,
  values,
  value,
  className,
  labels,
  types,
  placeholder,
  multiline,
}) {
  return (
    <>
      {array.map((item, index) => (
        <Grid key={item} item>
          <br />
          <p style={{ textAlign: "left" }}>{labels[index]}</p>
          <div
            className={className}
            style={{
              borderStyle: "solid",
              borderColor: "black",
              borderWidth: "1px",
            }}
          >
            <TextField
              // placeholder={placeholder[index]}
              autoFocus
              fullWidth
              onChange={handleChange(item)}
              value={values[value[index]]}
              type={types[index]}
              multiline={multiline[index]}
            />
          </div>
        </Grid>
      ))}
    </>
  );
}
