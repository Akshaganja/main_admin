import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import { alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import UserSidebar from "./UserSidebar";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState } from "react";
import Cookies from "universal-cookie";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import swal from "sweetalert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import moment from "moment";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import { RotatingLines } from "react-loader-spinner";
import CloseIcon from "@mui/icons-material/Close";
// import jwt_decode from "jwt-decode";

import bcrypt from "bcryptjs";

const headCells = [
  //   {
  //     label: "#",
  //   },
  {
    label: "Name",
  },
  {
    label: "Email",
  },
  {
    label: "Role",
  },
];

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function Row(props) {
  const { row, handleClick, isItemSelected, labelId, seletedEditData } = props;
  // let cookies = new Cookies();
  const [open, setOpen] = React.useState(false);

  // var RoleName = jwt_decode(cookies.get("token"));
  // var [passwordCPasswordHide, setPasswordCPasswordHide] = useState(true);

  const otpExpiryTime = new Date();
  console.log(otpExpiryTime);
  const [accessType, setAccessType] = useState(null);

  

  return (
    <React.Fragment>
      <TableRow
        hover
        onClick={(event) => handleClick(event, row._id)}
        role="checkbox"
        aria-checked={isItemSelected}
        tabIndex={-1}
        key={row._id}
        selected={isItemSelected}
      >
        <TableCell align="center">
          <IconButton
           aria-label="expand row"
           size="small"
           onClick={(event) => {
             event.stopPropagation(); // Stop event propagation
             setOpen(!open);
           }}
            // aria-label="expand row"
            // size="small"
            // onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" padding="checkbox">
          <Checkbox
            color="primary"
            checked={isItemSelected}
            inputProps={{
              "aria-labelledby": labelId,
            }}
          />
        </TableCell>

        {accessType &&
          (() => {
            if (!accessType.includes("Allow To Delete")) {
              return null;
            }
            return (
              <TableCell align="center" padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </TableCell>
            );
          })()}





        {/* <TableCell align="center">{row.accessId}</TableCell> */}
        <TableCell align="center">{row.userName}</TableCell>
        <TableCell align="center">{row.email}</TableCell>
        <TableCell align="center">{row.role}</TableCell>
        <TableCell align="center">
          <button
            class="btn btn-default"
            onClick={() => {
              seletedEditData(row);
              // setPasswordCPasswordHide(false);
            }}
          >
            <EditIcon />
          </button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ paddingLeft: 15, margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Other Data :
              </Typography>
              <div>
                <Typography variant="p" gutterBottom component="div">
                  {row.accessType?.map((accessType, id) => {
                    return (
                      <span className="d-flex flex-column">
                        {id + 1}. {accessType}
                      </span>
                    );
                  })}
                  {/* <span className="fw-bold">Access:</span> {row.accessType} */}
                </Typography>
                {/* <div>
                  <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Create At:</span> {row.createAt}
                  </Typography>
                  {row.upadateAt ? (
                    <Typography variant="p" gutterBottom component="div">
                      <span className="fw-bold">Upadate At:</span>
                      {row.upadateAt}
                    </Typography>
                  ) : null}
                </div> */}
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  let navigate = useNavigate();
  let cookies = new Cookies();

  // Check Authe(token)
  let chackAuth = async () => {
    if (cookies.get("token")) {
      let config = {
        headers: {
          token: cookies.get("token"),
        },
      };
      // auth post method
      let res = await axios.post(
        "https://spr-cms-babe93641764.herokuapp.com/register/auth",
        { purpose: "validate access" },
        config
      );
      if (res.data.statusCode !== 200) {
        cookies.remove("token");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  React.useEffect(() => {
    chackAuth();
  }, [cookies.get("token")]);

  let [engineerData, setEngineerData] = useState([]);
  let [countData, setCountData] = useState(0);
  let [loader, setLoader] = useState(true);
  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  //   let [loader, setLoader] = React.useState(true);
  let getData = async () => {
    let res = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/register/get_registers",
      {
        pageSize: rowsPerPage,
        pageNumber: page,
      }
    );
    setLoader(false);
    setEngineerData(res.data.data);
    setCountData(res.data.accessCount);
  };

  React.useEffect(() => {
    getData();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [selected, setSelected] = React.useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = engineerData.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Delete selected
  // var handleDelete = () => {
  //   axios
  //     .post(
  //       "https://spr-cms-babe93641764.herokuapp.com/register/delete-access",
  //       selected
  //     )
  //     .then((response) => {
  //       if (response.data.statusCode === 200) {
  //         getData();
  //          setSelected([]);
  //         swal("", response.data.message, "success");
  //       }
  //     });
  // };
  var handleDelete = () => {
    console.log("Selected IDs: ", selected);
    axios
      .post("https://spr-cms-babe93641764.herokuapp.com/register/delete-access", selected)
      .then((response) => {
        if (response.data.statusCode === 200) {
          getData();
          setSelected([]);
          swal("", response.data.message, "success");
        } else {
          swal("", response.data.message, "error");
        }
      })
      .catch((error) => {
        console.log("Error deleting records: ", error);
        swal("", "Error deleting records", "error");
      });
  };
  
    // Searchbar
    let handleSearchData = async (values) => {
      let res = await axios.post(
        "https://spr-cms-babe93641764.herokuapp.com/register/search-access",
        {
          search: values,
        } 
      );
      if (res.data.statusCode === 200) {
        if (values !== "") {
          setEngineerData(res.data.data);
        } else {
          getData();
        }
      }
    };
  


  //  let [search, setSearch] = React.useState("");

  //   edit Engineer here
  let [modalShowForPopupForm, setModalShowForPopupForm] = React.useState(false);
  let [id, setId] = React.useState();

  let [editData, setEditData] = React.useState({});

  if (!id) {
    var handleSubmit = async (values) => {
      values["createAt"] = moment(new Date()).format("YYYY-MM-DD, HH:mm:ss");
      values["upadateAt"] = moment(new Date()).format("YYYY-MM-DD, HH:mm:ss");
      let res = await axios.post(
        "https://spr-cms-babe93641764.herokuapp.com/register/register",
        values
      );
      if (res.data.statusCode === 200) {
        setModalShowForPopupForm(false);
        getData();
        swal("", res.data.message, "success");
      }
    };
  } else {
    handleSubmit = async (values) => {
      values["createAt"] = moment(new Date()).format("YYYY-MM-DD, HH:mm:ss");
      values["upadateAt"] = moment(new Date()).format("YYYY-MM-DD, HH:mm:ss");
      if (values.password === "") {
        values.password = editData.password;
      }
      if (values.cPassword === "") {
        values.cPassword = editData.cPassword;
      }
      let response = await axios.put(
        "https://spr-cms-babe93641764.herokuapp.com/register/edit_access/" + id,
        values
      );
      if (response.data.statusCode === 200) {
        setModalShowForPopupForm(false);
        getData();
        swal("", response.data.message, "success");
      }
    };
  }

  // let handleSubmit = async (values) => {
  //   console.log(values);

  //   let res = await axios.post(
  //     "https://spr-cms-babe93641764.herokuapp.com/register/register",
  //     values
  //   );
  //   if (res.data.statusCode === 200) {
  //     setModalShowForPopupForm(false);
  //     getData();
  //     swal("", res.data.message, "success");
  //   }
  // };

  var hashPassword = async (pwd) => {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(pwd, salt);
    return hash;
  };

  let signUpFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userName: editData && editData.userName ? editData.userName : "",
      email: editData && editData.email ? editData.email : "",
      // password: editData && editData.password ? editData.password : "",
      password: "",
      // cPassword: editData && editData.cPassword ? editData.cPassword : "",
      cPassword: "",
      role: editData && editData.role ? editData.role : "",
      accessType: editData && editData.accessType ? editData.accessType : [],
    },
    validationSchema: yup.object({
      userName: yup.string().required("Required field"),
      email: yup.string().email("Invalid Email").required("Required field"),
      password: yup
        .string()
        .required("No Password Provided")
        .min(8, "Password is too short")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
          "Must Contain One Uppercase or One Lowercase, One Number and one special case Character"
        ),
      cPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Required field"),
      role: yup.string().required("Required field"),
      accessType: yup.array().required("Please Select Machine Type"),
    }),
    onSubmit: async (values) => {
      if (values.password !== values.cPassword) {
        swal("", "Passwords do not match", "error");
        return;
      }
      if (values.password !== "") {
        values.password = await hashPassword(values.password);
      }
      if (values.cPassword !== "") {
        values.cPassword = await hashPassword(values.cPassword);
      }
      handleSubmit(values);
    },
  });

  //   auto form fill up in edit
  let seletedEditData = async (datas) => {
    setModalShowForPopupForm(true);
    setId(datas._id);
    setEditData(datas);
  };

  var [passwordCPasswordHide, setPasswordCPasswordHide] = useState(true);

  return (
    <>
      <UserSidebar getData={getData} />
      <Box sx={{ width: "100%", pb: "2%", pl: "2%", pr: "2%" }}>
        <div className="d-flex flex-row justify-content-end mb-2">
          <Button
            className="text-capitalize"
            size="small"
            onClick={() => {
              setModalShowForPopupForm(true);
              setId(null);
              setEditData({});
            }}
            style={{ backgroundColor: "rgb(11, 11, 59) " }}
          >
            Add Access
          </Button>
        </div>

        <Paper sx={{ width: "100%" }} className="table_bg_img">
          <Toolbar
            className="border-top border-bottom"
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              ...(selected.length > 0 && {
                bgcolor: (theme) =>
                  alpha(
                    theme.palette.primary.main,
                    theme.palette.action.activatedOpacity
                  ),
              }),
            }}
          >
            {selected.length > 0 ? (
              <Typography
                sx={{ flex: "1 1 100%" }}
                color="inherit"
                variant="subtitle1"
                component="div"
              >
                {selected.length} selected
              </Typography>
            ) : (
              <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h6"
                id="tableTitle"
                component="div"
              >
                Access Table
              </Typography>
            )}
            <form className="form-inline">
              <input
                id="serchbar-size"
                className="form-control mr-sm-2"
                type="search"
                onChange={(e) => handleSearchData(e.target.value)}
                // onChange={(e) => handleSearchData(e.target.value)}
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            {selected.length > 0 ? (
              <Tooltip title="Delete">
                <IconButton onClick={() => handleDelete()}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ) : null}
          </Toolbar>
          {loader ? (
            <div className="d-flex flex-direction-row justify-content-center align-items-center p-5 m-5">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="50"
                visible={loader}
              />
            </div>
          ) : (
            <TableContainer>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center" padding="checkbox">
                      <Checkbox
                        color="primary"
                        indeterminate={
                          selected.length > 0 &&
                          selected.length < engineerData.length
                        }
                        checked={
                          engineerData?.length > 0 &&
                          selected.length === engineerData?.length
                        }
                        onChange={handleSelectAllClick}
                        inputProps={{
                          "aria-label": "select all desserts",
                        }}
                      />
                    </TableCell>
                    {headCells.map((headCell, id) => {
                      return (
                        <TableCell key={id} className="fw-bold" align="center">
                          {headCell.label}
                        </TableCell>
                      );
                    })}
                    <TableCell className="fw-bold" align="center">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {engineerData?.map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <Row
                        key={row.empId}
                        row={row}
                        isItemSelected={isItemSelected}
                        labelId={labelId}
                        handleClick={handleClick}
                        selected={selected}
                        index={index}
                        seletedEditData={seletedEditData}
                      />
                    );
                  })}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={countData}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          )}
        </Paper>
      </Box>

      <Dialog
        fullWidth
        open={modalShowForPopupForm}
        onClose={() => {
          setModalShowForPopupForm(false);
          // setPasswordCPasswordHide(false);
        }}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Access Form"}
          <IconButton
            aria-label="close"
            onClick={() => setModalShowForPopupForm(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={signUpFormik.handleSubmit}>
            <div>
              <div className="mt-4">
                <TextField
                  type="text"
                  size="small"
                  fullWidth
                  placeholder="UserName"
                  label="UserName"
                  name="userName"
                  onBlur={signUpFormik.handleBlur}
                  onChange={signUpFormik.handleChange}
                  value={signUpFormik.values.userName}
                />
                {signUpFormik.touched.userName &&
                signUpFormik.errors.userName ? (
                  <div className="text-danger">
                    {signUpFormik.errors.userName}
                  </div>
                ) : null}
              </div>

              <div className="mt-4">
                <TextField
                  type="email"
                  size="small"
                  fullWidth
                  placeholder="Email"
                  label="Email"
                  name="email"
                  onBlur={signUpFormik.handleBlur}
                  onChange={signUpFormik.handleChange}
                  value={signUpFormik.values.email}
                />
                {signUpFormik.touched.email && signUpFormik.errors.email ? (
                  <div style={{ color: "red" }}>
                    {signUpFormik.errors.email}
                  </div>
                ) : null}
              </div>

              {/* {!passwordCPasswordHide && ( */}
              <>
                <div className="mt-4">
                  <TextField
                    type="password"
                    size="small"
                    fullWidth
                    placeholder="Password"
                    label="Password"
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

                <div className="mt-4">
                  <TextField
                    type="password"
                    size="small"
                    fullWidth
                    placeholder="Confirm Password"
                    label="Confirm Password"
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
              </>
              <div className="mt-4">
                <TextField
                  fullWidth
                  size="small"
                  select
                  label="Select Role"
                  name="role"
                  value={signUpFormik.values.role}
                  onBlur={signUpFormik.handleBlur}
                  onChange={signUpFormik.handleChange}
                >
                  <MenuItem>Select role</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Super Admin">Super Admin</MenuItem>
                  <MenuItem value="Administrator">Administrator</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                </TextField>
                {signUpFormik.touched.role && signUpFormik.errors.role ? (
                  <div className="text-danger">{signUpFormik.errors.role}</div>
                ) : null}
              </div>

              <div className="w-100 mt-3">
                <FormControl fullWidth>
                  <InputLabel size="small">Access Type</InputLabel>
                  <Select
                    multiple
                    size="small"
                    name="accessType"
                    value={signUpFormik.values.accessType}
                    onChange={signUpFormik.handleChange}
                    input={<OutlinedInput label="Access Type" />}
                    renderValue={(selected) => selected.join(", ")}
                    onBlur={signUpFormik.handleBlur}
                    MenuProps={MenuProps}
                  >
                    {accessTypeData.map((e) => (
                      <MenuItem key={e} value={e}>
                        <Checkbox
                          checked={
                            signUpFormik?.values?.accessType.indexOf(e) > -1
                          }
                        />
                        <ListItemText primary={e} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {signUpFormik.touched.accessType &&
                signUpFormik.errors.accessType ? (
                  <div className="text-danger">
                    {signUpFormik.errors.accessType}
                  </div>
                ) : null}
              </div>

              {!id ? (
                <Button className="mt-3" type="submit" variant="primary">
                  Add Access
                </Button>
              ) : (
                <Button className="mt-3" type="submit" variant="warning">
                  Update Access
                </Button>
              )}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
