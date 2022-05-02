import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export function Signup() {
  const navigate = useNavigate();
  const formvalidationSchema = yup.object({
    name: yup.string().required("email is required"),
    email: yup
      .string()
      .min(4, "Email must be at least 4 characters")
      .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Email is not valid")
      .required("Email is required"),
    password: yup
      .string()
      .min(8, "Password is too Small")
      .max(14, "Password is to Big")
      .matches(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#!%&])/g,
        "Pattern is not matched"
      )
      .required("Password is required"),
  });

  const { handleChange, handleSubmit, handleBlur, errors, values, touched } =
    useFormik({
      initialValues: { name: "", email: "", password: "" },
      validationSchema: formvalidationSchema,
      onSubmit: async (values) => {
        console.log(values);
        fetch("https://hari-movie-review.herokuapp.com/signup_login/signup", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "User created") {
              navigate("/login");
              return;
            }
          });
      },
    });
  return (
    <div id="sginlog">
      <form id="login" onSubmit={handleSubmit}>
        <TextField
          error={touched.name && errors.name ? true : false}
          helperText={touched.name && errors.name ? errors.name : ""}
          margin="dense"
          id="name"
          className="name"
          placeholder="Name"
          type="text"
          fullWidth
          size="small"
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
        />
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
          size="small"
          fullWidth
          variant="outlined"
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <br /> <br />
        <Button variant="contained" type="submit">
          Sgin Up
        </Button>
        <br />
      </form>
    </div>
  );
}
