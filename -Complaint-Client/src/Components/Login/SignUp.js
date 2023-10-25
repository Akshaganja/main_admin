import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import TextField from "@mui/material/TextField";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const accessTypeData = [
  "Access",
  "engineer form",
  "party form",
  "Add Parts",
  "Add Machine Problems",
  "Add Machine Type",
  "Add Complaint",
  "Add Attendance",
  "Delete Attendance",
  "Edit Machine And Extend AMC",
  "Allow To Delete",
  "Allow To Edit",
  "Engineer Page",
  "Party Page",
  "Machine Tyoe Page",
  "Machine Page",
  "Complaint Page",
  "Review Complaint Page",
  "Pending Complaint Page",
  "Report Page",
  "Party Vice Machine Page",
  "Renames Engineer and Party Name Page",
  "Parts Page",
  "MachineType Problems Page",
  "Bill Page",
  "Parts req/Approval Page",
  "Attendance Page",
  "Dashboard - Complaint",
  "Dashboard - Complete Complaint",
  "Dashboard - Review Complaint",
  "Dashboard - Pending Complaint",
  "Dashboard - Free Engineer",
  "Dashboard - Engineer",
  "Dashboard - Party",
  "Dashboard - Machine",
  "Dashboard - Amc Date",
  "Dashboard - Parts",
];

function SignUp() {
  let navigate = useNavigate();

  let handleSubmit = async (values) => {
    values["accessType"] = accessTypeData;
    values["role"] = "Super Admin";
    let res = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/register/register",
      values
    );
    if (res.data.statusCode === 200) {
      navigate("/login");
      alert(res.data.message);
    } else if (res.data.statusCode === 403) {
      alert(res.data.message);
    } else {
      console.log(res.data.message);
    }
  };

  let signUpFormik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      cPassword: "",
    },
    validationSchema: yup.object({
      userName: yup.string().required("Required"),
      email: yup.string().email("Invalid Email").required("Required"),
      password: yup
        .string()
        .required("No Password Provided")
        .min(8, "Password is too short")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"
        ),
      cPassword: yup
        .string()
        .required("No Password Provided")
        .min(8, "Password is too short")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain One Uppercase, One Lowercase, One Number and one special case Character"
        ),
    }),
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    },
  });

  return (
    <div>
      <section className="vh-100" style={{ backgroundcolor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={signUpFormik.handleSubmit}
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          {/* <i className="fas fa-user fa-lg me-3 fa-fw"></i> */}
                          <PersonIcon fontSize="large" className="me-3 mt-3" />
                          <div className="form-outline flex-fill mb-0">
                            {/* <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                            />
                            <label className="form-label" for="form3Example1c">
                              Your Name
                            </label> */}
                            <TextField
                              type="text"
                              placeholder="Your Name"
                              label="Your Name"
                              variant="standard"
                              fullWidth
                              name="userName"
                              onBlur={signUpFormik.handleBlur}
                              onChange={signUpFormik.handleChange}
                              value={signUpFormik.values.userName}
                            />
                            {signUpFormik.touched.userName &&
                            signUpFormik.errors.userName ? (
                              <div style={{ color: "red" }}>
                                {signUpFormik.errors.userName}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          {/* <i className="fas fa-envelope fa-lg me-3 fa-fw"></i> */}
                          <EmailIcon fontSize="large" className="me-3 mt-3" x />
                          <div className="form-outline flex-fill mb-0">
                            {/* <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                            />
                            <label className="form-label" for="form3Example3c">
                              Your Email
                            </label> */}
                            <TextField
                              type="email"
                              placeholder="Your Email"
                              label="Your Email"
                              variant="standard"
                              fullWidth
                              name="email"
                              onBlur={signUpFormik.handleBlur}
                              onChange={signUpFormik.handleChange}
                              value={signUpFormik.values.email}
                            />
                            {signUpFormik.touched.email &&
                            signUpFormik.errors.email ? (
                              <div style={{ color: "red" }}>
                                {signUpFormik.errors.email}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          {/* <i className="fas fa-lock fa-lg me-3 fa-fw"></i> */}
                          <LockIcon fontSize="large" className="me-3 mt-3" />
                          <div className="form-outline flex-fill mb-0">
                            {/* <input
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                            />
                            <label className="form-label" for="form3Example4c">
                              Password
                            </label> */}
                            <TextField
                              type="password"
                              placeholder="Password"
                              label="Password"
                              variant="standard"
                              fullWidth
                              name="password"
                              onBlur={signUpFormik.handleBlur}
                              onChange={signUpFormik.handleChange}
                              value={signUpFormik.values.password}
                            />
                            {signUpFormik.touched.password &&
                            signUpFormik.errors.password ? (
                              <div style={{ color: "red" }}>
                                {signUpFormik.errors.password}
                              </div>
                            ) : null}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          {/* <i className="fas fa-key fa-lg me-3 fa-fw"></i> */}
                          <VpnKeyIcon fontSize="large" className="me-3 mt-3" />
                          <div className="form-outline flex-fill mb-0">
                            {/* <input
                              type="password"
                              id="form3Example4cd"
                              className="form-control"
                            />
                            <label className="form-label" for="form3Example4cd">
                              Repeat your password
                            </label> */}
                            <TextField
                              type="password"
                              placeholder="Confirm Password"
                              label="Confirm Password"
                              variant="standard"
                              fullWidth
                              name="cPassword"
                              onBlur={signUpFormik.handleBlur}
                              onChange={signUpFormik.handleChange}
                              value={signUpFormik.values.cPassword}
                            />
                            {signUpFormik.touched.cPassword &&
                            signUpFormik.errors.cPassword ? (
                              <div style={{ color: "red" }}>
                                {signUpFormik.errors.cPassword}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        {/* <div className="d-flex flex-row align-items-center mb-4">
                          <PersonIcon fontSize="large" className="me-3 mt-3" />
                          <div className="form-outline flex-fill mb-0">
                            <FormControl fullWidth variant="standard">
                              <InputLabel id="demo-simple-select-label">
                                Role
                              </InputLabel>
                              <Select
                                label="Role"
                                name="role"
                                onBlur={signUpFormik.handleBlur}
                                onChange={signUpFormik.handleChange}
                                value={signUpFormik.values.role}
                              >
                                <MenuItem value={"Admin"}>Admin</MenuItem>
                                <MenuItem value={"User"}>User</MenuItem>
                              </Select>
                            </FormControl>
                            {signUpFormik.touched.role &&
                            signUpFormik.errors.role ? (
                              <div style={{ color: "red" }}>
                                {signUpFormik.errors.role}
                              </div>
                            ) : null}
                          </div>
                        </div> */}
                        {/* <div className="form-check d-flex justify-content-center mb-5">
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox defaultChecked />}
                              label="I agree all statements in"
                            />
                          </FormGroup>
                          <a href="#!">Terms of service</a>
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                          />
                          <label className="form-check-label" for="form2Example3">
                            I agree all statements in
                            <a href="#!">Terms of service</a>
                          </label>
                        </div> */}

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <Button
                            variant="contained"
                            size="large"
                            type="submit"
                          >
                            Register
                          </Button>
                        </div>
                        <p className="text-center">
                          <Button
                            onClick={() => navigate("/login")}
                            className="text-dark shadow-none"
                            style={{ backgroundColor: "#ffff", border: "none" }}
                          >
                            <span className="text-muted">
                              Have an account&nbsp;?&nbsp;
                            </span>
                            Login
                          </Button>
                        </p>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;
