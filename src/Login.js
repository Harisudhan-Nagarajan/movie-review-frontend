import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const formvalidationSchema = yup.object({
    email: yup.string().required("email is required"),

    password: yup.string().required("Password is required"),
  });

  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: formvalidationSchema,
      onSubmit: async (values) => {
        console.log(values);
        fetch("https://hari-movie-review.herokuapp.com/signup_login/login", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.token) {
              localStorage.setItem("token", data.token);
              localStorage.setItem("email", data.email);
              navigate("/");
              setError("");
              return;
            }
            setError("Invalid email or password");
          });
      },
    });

  return (
    <div id="sginlog">
      <form id="login" onSubmit={handleSubmit}>
        <TextField
          error={touched.email && errors.email ? true : false}
          helperText={touched.email && errors.email ? errors.email : ""}
          margin="dense"
          id="email"
          className="email"
          placeholder="Email"
          type="text"
          fullWidth
          size="small"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          error={touched.password && errors.password ? true : false}
          helperText={
            touched.password && errors.password ? errors.password : ""
          }
          margin="dense"
          id="password"
          className="password"
          type="password"
          placeholder="password"
          fullWidth
          size="small"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <br />
        <Button
          style={{
            border: "none",
            backgroundColor: "transparent",
          }}
        >
          <b>Forgotten your Password?</b>
        </Button>
        <br /> <br />
        <p style={{ color: "red" }}>{error}</p>
        <Button variant="contained" type="submit">
          Log in
        </Button>
        <br />
        <Button variant="contained" onClick={() => navigate("/signup")}>
          Create A new Account
        </Button>
      </form>
    </div>
  );
}
