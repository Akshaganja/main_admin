import React from "react";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import { useRef } from "react";
import emailjs from "@emailjs/browser";

function ForgotPassword() {
  const form = useRef();
  let navigate = useNavigate();

  let cookies = new Cookies();

  let handleSubmit = async (values) => {
    let res = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/register/forgot-password",
      values
    );

    if (res.data.statusCode === 200) {
      swal("", "Password reset email sent", "success");
    } else {
      swal("", res.data.message, "error");
    }
  };

  let loginFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      handleSubmit(values);
      resetForm(values);
    },
  });

  return (
    <>
      <div class="container d-flex flex-column">
        <div
          class="row align-items-center justify-content-center
      min-vh-100 g-0"
        >
          <div class="">
         
            <div class="card shadow-sm">
              <div class="card-body">
                <div class="mb-4">
                  <h5>Forgot Password?</h5>
                  <p class="mb-2">
                    Enter your registered email ID to reset the password
                  </p>
                </div>
                <form onSubmit={loginFormik.handleSubmit} ref={form}>
                  <div class="mb-3">
                    <label for="email" class="form-label">
                      Email
                    </label>
                    {/* <input
                      type="email"
                      id="email"
                      class="form-control"
                      name="email"
                      placeholder="Enter Your Email"
                      required=""
                    /> */}
                    <TextField
                      type="email"
                      placeholder="Your Email"
                      label="Your Email"
                      // variant="standard"
                      fullWidth
                      name="email"
                      onBlur={loginFormik.handleBlur}
                      onChange={loginFormik.handleChange}
                      value={loginFormik.values.email}
                    />
                    {loginFormik.touched.email && loginFormik.errors.email ? (
                      <div style={{ color: "red" }}>
                        {loginFormik.errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div class="mb-3 d-grid">
                    <button type="submit" class="btn btn-primary">
                      Send Reset Link
                    </button>
                  </div>
                  {/* <span>
                    Don't have an account? <a href="sign-in.html">sign in</a>
                  </span> */}
                  <p className="text-center">
                    <Button
                      onClick={() => navigate("/signup")}
                      className="text-dark shadow-none"
                      style={{ backgroundColor: "#ffff", border: "none" }}
                    >
                      <span className="text-muted">
                        Don't have an account?&nbsp;&nbsp;
                      </span>
                      Signup
                    </Button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
