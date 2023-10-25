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
import { useParams } from "react-router-dom";

function AddNewPassword() {
  let navigate = useNavigate();
  const form = useRef();
  const { id, token } = useParams();

  let handleSubmit = async (values) => {
    let res = await axios.post(
      `https://spr-cms-babe93641764.herokuapp.com/register/reset-password/${id}/${token}`,
      values
    );

    if (res.data.statusCode === 200) {
      swal("", "Your Password Change Successfully", "success");
      navigate("/login");
    } else {
      swal("", res.data.message, "error");
    }
  };

  let resetPasswordFormik = useFormik({
    initialValues: {
      password: "",
      cPassword: "",
    },
    validationSchema: yup.object({
      password: yup.string().required("Required"),
      cPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      if (values.password !== values.cPassword) {
        swal("", "Passwords do not match", "error");
        return;
      }
      resetForm(values);
      handleSubmit(values);
    },
  });

  return (
    <div>
      {" "}
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
                    <h5>Reset Password</h5>
                    <p class="mb-2">Add New Password</p>
                  </div>
                  <form onSubmit={resetPasswordFormik.handleSubmit} ref={form}>
                    <div class="mb-3">
                      {/* <label for="email" class="form-label">
                        Email
                      </label> */}
                      <div>
                        <TextField
                          type="password"
                          placeholder="Enter New Password"
                          label="Enter New Password"
                          // variant="standard"
                          fullWidth
                          name="password"
                          onBlur={resetPasswordFormik.handleBlur}
                          onChange={resetPasswordFormik.handleChange}
                          value={resetPasswordFormik.values.password}
                        />
                        {resetPasswordFormik.touched.password &&
                        resetPasswordFormik.errors.password ? (
                          <div style={{ color: "red" }}>
                            {resetPasswordFormik.errors.password}
                          </div>
                        ) : null}
                      </div>

                      <div className="mt-3">
                        <TextField
                          type="password"
                          placeholder="Repeat Password"
                          label="Repeat Password"
                          // variant="standard"
                          fullWidth
                          name="cPassword"
                          onBlur={resetPasswordFormik.handleBlur}
                          onChange={resetPasswordFormik.handleChange}
                          value={resetPasswordFormik.values.cPassword}
                        />
                        {resetPasswordFormik.touched.cPassword &&
                        resetPasswordFormik.errors.cPassword ? (
                          <div style={{ color: "red" }}>
                            {resetPasswordFormik.errors.cPassword}
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div class="mb-3 d-grid">
                      <button type="submit" class="btn btn-primary">
                        Submit
                      </button>
                    </div>
                    {/* <span>
                  Don't have an account? <a href="sign-in.html">sign in</a>
                </span> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default AddNewPassword;
