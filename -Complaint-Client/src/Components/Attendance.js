import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState } from "react";
import Cookies from "universal-cookie";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import swal from "sweetalert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// import Geocode from "react-geocode";
import { RotatingLines } from "react-loader-spinner";
import moment from "moment";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";



const headCells = [
  {
    label: "Name",
  },
  {
    label: "Date",
  },
  {
    label: "Working Time",
  },
  {
    label: "Wastage Time",
  },
  {
    label: "Travelling Time",
  },
  {
    label: "Total Duration",
  },
  {
    label: "Lunch Time",
  },
  // {
  //   label: "Action",
  // },
];

function Row(props) {
  const { row, seletedEditData, getData, index } = props;
  const [open, setOpen] = React.useState(false);

  let navigate = useNavigate();
  let cookies = new Cookies();

  const [accessType, setAccessType] = useState(null);

  React.useEffect(() => {
    if (cookies.get("token")) {
      const jwt = jwt_decode(cookies.get("token"));
      setAccessType(jwt.accessType);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // Delete selected
  var handleDelete = (selected) => {
    axios
      .post(
        "https://spr-cms-babe93641764.herokuapp.com/attendance/delete_engineer_attendance",
        selected
      )
      .then((response) => {
        if (response.data.statusCode === 200) {
          getData();
          swal("", response.data.message, "success");
        }
      });
  };

  // WesTage Time Calculation
  let totalDuration = moment.duration(row.totalDuration);
  let totalWorkingTime = moment.duration(row.totalWorkingTime);
  let lunchTime = moment.duration(row.LunchTime);
  let travelTime = moment.duration(row.totalTravelingTime);

  let totalDiff = moment.duration(0);

  totalDiff.add(totalDuration);
  totalDiff.subtract(lunchTime);
  totalDiff.subtract(travelTime);
  totalDiff.subtract(totalWorkingTime);

  let hours = Math.floor(totalDiff.asHours());
  let minutes = totalDiff.minutes();
  let finalWestageTime = moment({ hour: hours, minute: minutes }).format(
    "HH:mm"
  ); // format the time as hh:mm

  return (
    <React.Fragment>
      <TableRow hover key={index}>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.name}</TableCell>
        <TableCell align="center">{row.currentDate}</TableCell>
        <TableCell align="center">{row.totalWorkingTime}</TableCell>
        {/* <TableCell align="center">{row.westagTime}</TableCell> */}
        {/* <TableCell align="center">{finalWestageTime}</TableCell> */}
        <TableCell align="center">

          {finalWestageTime === "Invalid date" ? "00:00" : finalWestageTime}

        </TableCell>
        <TableCell align="center">{row.totalTravelingTime}</TableCell>
        <TableCell align="center">{row.totalDuration}</TableCell>
        <TableCell align="center">{row.LunchTime}</TableCell>

        {accessType &&
          (() => {
            if (!accessType.includes("Allow To Delete")) {
              return null;
            }
            return (
              <>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleDelete(row.engineerAttendanceId)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </>
            );
          })()}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ paddingLeft: 15, margin: 2 }}>
              <Typography variant="h5" gutterBottom component="div">
                Other Data :
              </Typography>

              {/* ... (other code) */}
              <div>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">#</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Time</TableCell>
                      <TableCell align="center">Location</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.dailyAttdance && row.dailyAttdance.map((dailyAttdance, index) => {
                      return (
                        <TableRow key={dailyAttdance._id}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell align="center">
                            {dailyAttdance.status}
                          </TableCell>
                          <TableCell align="center">
                            {dailyAttdance.time}
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              window.open(
                                "https://maps.google.com?q=" +
                                dailyAttdance.location?.latitude +
                                "," +
                                dailyAttdance.location?.longitude
                              );
                            }}
                          >
                            {dailyAttdance.location?.address}
                          </TableCell>
                          <TableCell align="center">
                            <button
                              class="btn btn-default"
                              onClick={() => seletedEditData(dailyAttdance)}
                            >
                              <EditIcon />
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
              {/* ... (other code) */}

            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function EngineerAttendance() {
  let navigate = useNavigate();
  let cookies = new Cookies();

  const [accessType, setAccessType] = useState(null);

  React.useEffect(() => {
    if (cookies.get("token")) {
      const jwt = jwt_decode(cookies.get("token"));
      setAccessType(jwt.accessType);
    } else {
      navigate("/login");
    }
  }, [navigate]);

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

  let [attendanceData, setAttendanceData] = useState([]);
  console.log(attendanceData, "abc");
  let [countData, setCountData] = useState(0);
  let [loader, setLoader] = React.useState(true);
  const [searchPage, setSearchPage] = React.useState(0);
  const [searchRowsPerPage, setSearchRowsPerPage] = React.useState(10);


  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let getData = async () => {
    let res = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/attendance/gets_engineer_attendance",
      {
        engineerCity: localStorage.getItem("city"),
        machineType: localStorage.getItem("machine"),
        pageSize: rowsPerPage,
        pageNumber: page,
      }
    );
    setLoader(false);
    // console.log("comp", res.data.data);
    setAttendanceData(res.data.data);
    setCountData(res.data.engineerAttendanceCount);
    // tempData = [...data.data.data];
  };

  React.useEffect(() => {
    getData();
  }, [rowsPerPage, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let [filter, setFilter] = useState({ name: "" });

  let handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFilter((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };




  let handleSearchData = async () => {
    if (filter.name) {
      let res = await axios.post(
        "http://localhost:5000/attendance/filter_engineer_attendance_date_vice",
        {
          engineerCity: localStorage.getItem("city"),
          machineType: localStorage.getItem("machine"),
          name: filter.name,
        }
      );

      if (res.data.statusCode === 200) {
        setAttendanceData(res.data.data);
        setSearchPage(0); // Reset the page to 0 when searching
        setSearchRowsPerPage(res.data.data.length); // Set rowsPerPage to match search results
      } else {
        // Handle any potential errors here
      }
    } else {
      // If no engineer name is selected, fetch all data
      getData();
    }
  };



  React.useEffect(() => {
    handleSearchData();
  }, [filter.name]);




  let [modalShowForPopupFormAdd, setModalShowForPopupFormAdd] =
    React.useState(false);

  //   edit Engineer here
  let [modalShowForPopupFormEdit, setModalShowForPopupFormEdit] =
    React.useState(false);
  let [id, setId] = React.useState();

  let handleSubmit = async (values) => {
    values.time = moment(values.time, "hh:mm:ss").format("HH:mm:ss");
    let response = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/attendance/add_engineer_attendance",
      values
    );
    if (response.data.statusCode === 200) {
      setModalShowForPopupFormAdd(false);
      getData();
      swal("", response.data.message, "success");
    } else {
      swal("", response.data.message, "error");
    }
  };

  //   engineer name
  let [engineerData, setEngineerData] = React.useState([]);
  let getEngineerData = async () => {
    let response = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/eng/engineer_name",
      {
        engineerCity: localStorage.getItem("city"),
        machineType: localStorage.getItem("machine"),
      }
    );
    setEngineerData(response.data.data);
  };

  React.useEffect(() => {
    getEngineerData();
  }, [localStorage.getItem("city"), localStorage.getItem("machine")]);

  let [editData, setEditData] = React.useState({});
  let [values, setValues] = React.useState({});
  const FormikValues = () => {
    const formik = useFormikContext();
    React.useEffect(() => {
      setValues(formik.values);
    }, [formik.values]);
    return null;
  };

  let handleEdit = async (values) => {
    values.time = moment(values.time, "hh:mm:ss").format("HH:mm:ss");
    let response = await axios.put(
      "https://spr-cms-babe93641764.herokuapp.com/attendance/update_engineer_attendance/" +
      id,
      values
    );
    if (response.data.statusCode === 200) {
      setModalShowForPopupFormEdit(false);
      getData();
      swal("", "attendance updated successfully", "success");
    }
  };

  //   auto form fill up in edit
  let seletedEditData = async (datas) => {
    setModalShowForPopupFormEdit(true);
    setId(datas._id);
    setEditData(datas);
  };

  return (
    <>
      <UserSidebar getData={getData} />
      <Box sx={{ width: "100%", pb: "2%", pl: "2%", pr: "2%" }}>
        {accessType &&
          (() => {
            if (!accessType.includes("Add Attendance")) {
              return null;
            }
            return (
              <div>
                <div className="d-flex flex-row justify-content-end mb-2">
                  <Button
                    className="text-capitalize"
                    size="small"
                    onClick={() => setModalShowForPopupFormAdd(true)}
                    style={{ backgroundColor: "rgb(11, 11, 59) " }}
                  >
                    Add Attendance
                  </Button>
                </div>
              </div>
            );
          })()}

        <Paper sx={{ width: "100%" }} className="table_bg_img">
          <Toolbar
            className="border-top border-bottom"
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
            }}
          >
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              All Engineer Attendance
            </Typography>
            <form className="d-flex flex-row  gap-3 ">
              {/* <input
                id="serchbar-size"
                className="form-control mr-sm-2"
                type="search"
                onChange={(e) => handleSearchData(e.target.value)}
                placeholder="Search"
                aria-label="Search"
              /> */}
              <FormControl sx={{ minWidth: 220 }} size="small">
                <InputLabel>Eng Name</InputLabel>
                <Select
                  label="Eng Name"
                  name="name"
                  value={filter?.name}
                  onChange={handleOnChange}
                  MenuProps={{
                    style: {
                      maxHeight: 250,
                    },
                  }}
                >
                  {engineerData?.map((e, i) => {
                    return (
                      <MenuItem key={i} value={e.name}>
                        {e.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <Button
                onClick={() => {
                  getData();
                  setFilter({
                    name: "",
                    currantDate: "",
                  });
                }}
              >
                All
              </Button>
            </form>
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
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center"></TableCell>
                    {headCells.map((headCell, id) => {
                      return (
                        <TableCell key={id} className="fw-bold" align="center">
                          {headCell.label}
                        </TableCell>
                      );
                    })}
                    {accessType &&
                      (() => {
                        if (!accessType.includes("Allow To Delete")) {
                          return null;
                        }
                        return (
                          <TableCell className="fw-bold" align="center">
                            Action
                          </TableCell>
                        );
                      })()}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {attendanceData?.map((row, index) => {
                    return (
                      <Row
                        key={index}
                        row={row}
                        index={index}
                        seletedEditData={seletedEditData}
                        getData={getData}
                      />
                    );
                  })}
                </TableBody>
              </Table>

              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={countData}
                rowsPerPage={filter.name ? searchRowsPerPage : rowsPerPage}
                page={filter.name ? searchPage : page}
                onPageChange={(event, newPage) =>
                  filter.name ? setSearchPage(newPage) : handleChangePage(event, newPage)
                }
                onRowsPerPageChange={(event) => {
                  const newRowsPerPage = +event.target.value;
                  if (filter.name) {
                    setSearchPage(0);
                    setSearchRowsPerPage(newRowsPerPage);
                  } else {
                    setRowsPerPage(newRowsPerPage);
                    setPage(0);
                  }
                }}
              />

            </TableContainer>
          )}
        </Paper>
      </Box>

      {/* add Attdance */}
      <Dialog
        fullWidth
        open={modalShowForPopupFormAdd}
        onClose={() => setModalShowForPopupFormAdd(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Attendance Form"}</DialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              name: editData && editData.name ? editData.name : "",
              status: editData && editData.status ? editData.status : "",
              time: editData && editData.time ? editData.time : "",
              currentDate:
                editData && editData.currentDate ? editData.currentDate : "",
              engineerCity:
                editData && editData.engineerCity
                  ? editData.engineerCity
                  : localStorage.getItem("city") === "All"
                    ? ""
                    : localStorage.getItem("city"),
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Please Enter Name"),
              status: Yup.string().required("Please Enter status"),
              time: Yup.string().required("Please Enter time"),
              currentDate: Yup.string().required("Please Enter Current Date"),
              engineerCity: Yup.string().required("Please Select city"),
            })}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm(values);
            }}
          >
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <Form>
                <FormikValues />

                <div className="mt-4">
                  <FormControl fullWidth>
                    <InputLabel size="small">Select Engineer Name *</InputLabel>
                    <Select
                      size="small"
                      select
                      label="Select Engineer Name *"
                      name="name"
                      value={values.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      MenuProps={{
                        style: {
                          maxHeight: 300,
                        },
                      }}
                    >
                      <MenuItem>Select Name</MenuItem>
                      {engineerData?.map((option, index) => (
                        <MenuItem key={index} value={option.name}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {errors.name && touched.name ? (
                    <div className="text-danger">{errors.name}</div>
                  ) : null}
                </div>
                <div className="w-100 mt-4">
                  <TextField
                    fullWidth
                    select
                    size="small"
                    placeholder="Status"
                    label="Status"
                    name="status"
                    value={values.status}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <MenuItem>Select Status</MenuItem>
                    <MenuItem value="Punch In">Punch In</MenuItem>
                    <MenuItem value="Punch Out">Punch Out</MenuItem>
                    <MenuItem value="Lunch In">Lunch In</MenuItem>
                    <MenuItem value="Lunch Out">Lunch Out</MenuItem>
                  </TextField>
                  {errors.status && touched.status ? (
                    <div className="text-danger">{errors.status}</div>
                  ) : null}
                </div>
                <div className="mt-4">
                  <TextField
                    fullWidth
                    type="time"
                    placeholder="time"
                    size="small"
                    label="time"
                    name="time"
                    value={values.time}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {touched.time && errors.time ? (
                    <div className="text-danger">{errors.time}</div>
                  ) : null}
                </div>
                <div className="mt-4">
                  <TextField
                    fullWidth
                    type="date"
                    placeholder="currentDate"
                    size="small"
                    label="currentDate"
                    name="currentDate"
                    value={values.currentDate}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {touched.currentDate && errors.currentDate ? (
                    <div className="text-danger">{errors.currentDate}</div>
                  ) : null}
                </div>
                <div className="w-100 mt-3">
                  <TextField
                    fullWidth
                    size="small"
                    select
                    label="Select City"
                    name="engineerCity"
                    value={values.engineerCity}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <MenuItem>Select City</MenuItem>
                    <MenuItem value="Bhavnagar">Bhavnagar</MenuItem>
                    <MenuItem value="Surat">Surat</MenuItem>
                  </TextField>
                  {touched.engineerCity && errors.engineerCity ? (
                    <div className="text-danger">{errors.engineerCity}</div>
                  ) : null}
                </div>

                {!id ? (
                  <Button className="mt-3" type="submit" variant="primary">
                    Add Attendance
                  </Button>
                ) : (
                  <Button className="mt-3" type="submit" variant="warning">
                    Update Attendance
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* dailyAttdance array in side edit form */}
      <Dialog
        fullWidth
        open={modalShowForPopupFormEdit}
        onClose={() => setModalShowForPopupFormEdit(false)}
      >
        <DialogTitle>{"Attendance"}</DialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              status: editData && editData.status ? editData.status : "",
              time: editData && editData.time ? editData.time : "",
            }}
            validationSchema={Yup.object().shape({
              status: Yup.string().required("status is required"),
              time: Yup.string().required("time is required"),
            })}
            onSubmit={(values, { resetForm, setSubmitting }) => {
              handleEdit(values);
              resetForm(values);
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              isSubmitting,
            }) => (
              <Form>
                <FormikValues />
                <div>
                  <div className="d-flex gap-4 my-3">
                    <div className="w-100">
                      <TextField
                        fullWidth
                        select
                        type="text"
                        size="small"
                        placeholder="Status"
                        label="Status"
                        name="status"
                        value={values.status}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      >
                        <MenuItem>Select Status</MenuItem>
                        <MenuItem value="Punch In">Punch In</MenuItem>
                        <MenuItem value="Punch Out">Punch Out</MenuItem>
                        <MenuItem value="Lunch In">Lunch In</MenuItem>
                        <MenuItem value="Lunch Out">Lunch Out</MenuItem>
                      </TextField>
                      {errors.status && touched.status ? (
                        <div className="text-danger">{errors.status}</div>
                      ) : null}
                    </div>

                    <div className="w-100">
                      <TextField
                        fullWidth
                        type="time"
                        size="small"
                        label="Time"
                        name="time"
                        value={values.time}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                      {errors.time && touched.time ? (
                        <div className="text-danger">{errors.time}</div>
                      ) : null}
                    </div>
                  </div>
                </div>

                {!id ? (
                  <Button
                    className="mt-3"
                    disabled={isSubmitting}
                    type="submit"
                    variant="primary"
                  >
                    Add Attendance
                  </Button>
                ) : (
                  <Button
                    className="mt-3"
                    disabled={isSubmitting}
                    type="submit"
                    variant="warning"
                  >
                    Update Attendance
                  </Button>
                )}
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}
