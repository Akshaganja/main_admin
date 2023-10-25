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
// import * as yup from "yup";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import swal from "sweetalert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextareaAutosize from "@mui/material/TextareaAutosize";
// import Geocode from "react-geocode";
import { RotatingLines } from "react-loader-spinner";
import moment from "moment";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";

import Geocode from "react-geocode";
import jwt_decode from "jwt-decode";
import CloseIcon from "@mui/icons-material/Close";
// Get latitude & longitude from address.
// Geocode.fromAddress("Eiffel Tower").then(
//   (response) => {
//     const { lat, lng } = response.results[0].geometry.location;
//     console.log(lat, lng);
//   },
//   (error) => {
//     console.error(error);
//   }
// );

const headCells = [
  {
    label: "#",
  },
  {
    label: "Name",
  },
  {
    label: "Mobile Number",
  },
  {
    label: "PassWord",
  },
  {
    label: "City",
  },
  // {
  //   label: "Action",
  // },
];

function Row(props) {
  const { row, handleClick, isItemSelected, labelId, seletedEditData, index } =
    props;
  const [open, setOpen] = React.useState(false);
  let cookies = new Cookies();
  let navigate = useNavigate();
  const [accessType, setAccessType] = useState(null);

  React.useEffect(() => {
    if (cookies.get("token")) {
      const jwt = jwt_decode(cookies.get("token"));
      setAccessType(jwt.accessType);
    } else {
      navigate("/login");
    }
  }, [navigate]);

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

        <TableCell align="center">{row.partyId}</TableCell>
        <TableCell align="center">{row.partyName}</TableCell>
        <TableCell align="center">{row.mobileNumber}</TableCell>
        <TableCell align="center">{row.passWord}</TableCell>
        <TableCell align="center">{row.partyCity}</TableCell>

        {accessType &&
          (() => {
            if (!accessType.includes("Allow To Edit")) {
              return null;
            }
            return (
              <TableCell align="center">
                <button
                  class="btn btn-default"
                  onClick={() => seletedEditData(row)}
                >
                  <EditIcon />
                </button>
              </TableCell>
            );
          })()}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ paddingLeft: 15, margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Other Data :
              </Typography>
              <Typography variant="p" gutterBottom component="div">
                <span className="fw-bold">Create At:</span>{" "}
                {moment(row.createAt).format("DD/MM/YYYY, H:mm:ss")}
              </Typography>
              <Typography variant="p" gutterBottom component="div">
                <span className="fw-bold">Upadate At:</span>{" "}
                {moment(row.upadateAt).format("DD/MM/YYYY, H:mm:ss")}
              </Typography>
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
      if (accessType.includes("Party Page")) {
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
        navigate("/error-page");
      }
    } else {
      navigate("/login");
    }
  };

  React.useEffect(() => {
    chackAuth();
  }, [cookies.get("token")]);

  let [partyData, setPartyData] = useState([]);
  let [countData, setCountData] = useState(0);
  let [loader, setLoader] = React.useState(true);

  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let getData = async () => {
    let res = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/party/findby_machine_or_city_pagination",
      {
        partyCity: localStorage.getItem("city"),
        pageSize: rowsPerPage,
        pageNumber: page,
      }
    );
    setLoader(false);
    setPartyData(res.data.data);
    setCountData(res.data.partyCount);
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

  const [selected, setSelected] = React.useState([]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = partyData.map((n) => n._id);
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
  var handleDelete = () => {
    axios
      .post("https://spr-cms-babe93641764.herokuapp.com/party/delete-party", selected)
      .then((response) => {
        if (response.data.statusCode === 200) {
          getData();
          setSelected([])
          swal("", response.data.message, "success");
        }
      });
  };

  //
  // Searchbar
  let handleSearchData = async (values) => {
    let res = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/party/search-party",
      {
        search: values,
      }
    );
    if (res.data.statusCode === 200) {
      if (values !== "") {
        setPartyData(res.data.data);
      } else {
        getData();
      }
    }
  };

  // let [serchingData, setSerchingData] = React.useState("");
  // let handleSearchData = (e) => {
  //   let serching = e.target.value;
  //   setSerchingData(serching);

  //   let serchData = tempData.filter((row) => {
  //     return Object.values(row)
  //       .join(" ")
  //       .toLowerCase()
  //       .includes(serching.toLowerCase());
  //   });
  //   if (serching !== "" || serching !== null) {
  //     setPartyData(serchData);
  //   } else {
  //     setPartyData(partyData);
  //   }
  // };

  //   edit Engineer here
  let [modalShowForPopupForm, setModalShowForPopupForm] = React.useState(false);
  let [id, setId] = React.useState();

  if (!id) {
    var handleSubmit = async (values) => {
      values["createAt"] = moment(new Date()).format("YYYY-MM-DD, HH:mm:ss");
      values["upadateAt"] = moment(new Date()).format("YYYY-MM-DD, HH:mm:ss");
      let response = await axios.post(
        "https://spr-cms-babe93641764.herokuapp.com/party/party",
        values
      );
      if (response.data.statusCode === 200) {
        setModalShowForPopupForm(false);
        getData();
        swal("", response.data.message, "success");
      } else {
        swal("", response.data.message, "error");
      }
    };
  } else {
    handleSubmit = async (values) => {
      values["upadateAt"] = moment(new Date()).format("YYYY-MM-DD, HH:mm:ss");
      let response = await axios.put(
        "https://spr-cms-babe93641764.herokuapp.com/party/party/" + id,
        values
      );
      if (response.data.statusCode === 200) {
        setModalShowForPopupForm(false);
        getData();
        swal("", response.data.message, "success");
      }
    };
  }

  //    // "add fom logic"
  let [editData, setEditData] = React.useState({});
  let [values, setValues] = React.useState({});
  const FormikValues = () => {
    const formik = useFormikContext();
    React.useEffect(() => {
      setValues(formik.values);
    }, [formik.values]);
    return null;
  };

  //   auto form fill up in edit
  let seletedEditData = async (datas) => {
    setModalShowForPopupForm(true);
    setId(datas._id);
    setEditData(datas);
  };

  return (
    <>
      <UserSidebar getData={getData} />
      <Box sx={{ width: "100%", pb: "2%", pl: "2%", pr: "2%" }}>
        {accessType &&
          (() => {
            if (!accessType.includes("party form")) {
              return null;
            }
            return (
              <div className="d-flex flex-row justify-content-end mb-2">
                <Button
                  className="text-capitalize"
                  style={{ backgroundColor: "rgb(11, 11, 59) " }}
                  size="small"
                  onClick={() => {
                    setModalShowForPopupForm(true);
                    setId(null);
                    setEditData({});
                  }}
                >
                  Add Party
                </Button>
              </div>
            );
          })()}

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
                All Party
              </Typography>
            )}
            <form className="form-inline">
              <input
                id="serchbar-size"
                className="form-control mr-sm-2"
                type="search"
                onChange={(e) => handleSearchData(e.target.value)}
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            {accessType &&
              (() => {
                if (!accessType.includes("Allow To Delete")) {
                  return null;
                }
                return (
                  <>
                    {selected.length > 0 ? (
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete()}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    ) : null}
                  </>
                );
              })()}
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

                    {accessType &&
                      (() => {
                        if (!accessType.includes("Allow To Delete")) {
                          return null;
                        }
                        return (
                          <TableCell align="center" padding="checkbox">
                            <Checkbox
                              color="primary"
                              indeterminate={
                                selected.length > 0 &&
                                selected.length < partyData.length
                              }
                              checked={
                                partyData?.length > 0 &&
                                selected.length === partyData?.length
                              }
                              onChange={handleSelectAllClick}
                              inputProps={{
                                "aria-label": "select all desserts",
                              }}
                            />
                          </TableCell>
                        );
                      })()}

                    {headCells.map((headCell, id) => {
                      return (
                        <TableCell key={id} className="fw-bold" align="center">
                          {headCell.label}
                        </TableCell>
                      );
                    })}
                    {accessType &&
                      (() => {
                        if (!accessType.includes("Allow To Edit")) {
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
                  {partyData?.map((row, index) => {
                    const isItemSelected = isSelected(row._id);
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
                      <Row
                        key={row.name}
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
        onClose={() => setModalShowForPopupForm(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Party Form"}
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
          <Formik
            initialValues={{
              partyName:
                editData && editData.partyName ? editData.partyName : "",
              mobileNumber:
                editData && editData.mobileNumber ? editData.mobileNumber : "",
              address: editData && editData.address ? editData.address : "",
              passWord: editData && editData.passWord ? editData.passWord : "",
              partyCity:
                editData && editData.partyCity
                  ? editData.partyCity
                  : localStorage.getItem("city") === "All"
                  ? ""
                  : localStorage.getItem("city"),
            }}
            validationSchema={Yup.object().shape({
              partyName: Yup.string().required("Please Enter partyName"),
              mobileNumber: Yup.number().required("Please Enter MobileNumber"),
              address: Yup.string().required("Please Enter address"),
              passWord: Yup.string().required("Please Enter PassWord"),
              partyCity: Yup.string().required("Please Select city"),
            })}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm(values);
            }}
          >
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <Form>
                <FormikValues />
                {/* <Field name="partyName" /> */}
                <div className="mt-4">
                  <TextField
                    type="text"
                    size="small"
                    fullWidth
                    placeholder="PartyName"
                    label="PartyName"
                    name="partyName"
                    value={values.partyName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {errors.partyName && touched.partyName ? (
                    <div className="text-danger">{errors.partyName}</div>
                  ) : null}
                </div>
                <div className="mt-4">
                  <TextField
                    fullWidth
                    type="text"
                    size="small"
                    placeholder="MobileNumber"
                    label="MobileNumber"
                    name="mobileNumber"
                    value={values.mobileNumber}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="mobile-number-input"
                    style={{
                      WebkitAppearance: 'none',
                      MozAppearance: 'textfield',
                    }}
                  />
                  
                  {touched.mobileNumber && errors.mobileNumber ? (
                    <div className="text-danger">{errors.mobileNumber}</div>
                  ) : null}
                </div>
                <div className=" mt-4">
                  <TextField
                    fullWidth
                    type="passWord"
                    placeholder="Password"
                    size="small"
                    label="Password"
                    name="passWord"
                    value={values.passWord}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.passWord && errors.passWord ? (
                    <div className="text-danger">{errors.passWord}</div>
                  ) : null}
                </div>
                <div className="mt-3">
                  <TextareaAutosize
                    fullWidth
                    className="text-area-max_height"
                    aria-label="minimum height"
                    size="small"
                    label="Address"
                    placeholder="Address"
                    name="address"
                    style={{ width: "100%" }}
                    value={values.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  {touched.address && errors.address ? (
                    <div className="text-danger">{errors.address}</div>
                  ) : null}
                </div>
                <div className="w-100 mt-3">
                  <TextField
                    fullWidth
                    size="small"
                    select
                    label="Select City"
                    name="partyCity"
                    value={values.partyCity}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  >
                    <MenuItem>Select City</MenuItem>
                    <MenuItem value="Bhavnagar">Bhavnagar</MenuItem>
                    <MenuItem value="Surat">Surat</MenuItem>
                  </TextField>
                  {touched.partyCity && errors.partyCity ? (
                    <div className="text-danger">{errors.partyCity}</div>
                  ) : null}
                </div>

                {!id ? (
                  <Button className="mt-3" type="submit" variant="primary">
                    Add Party
                  </Button>
                ) : (
                  <Button className="mt-3" type="submit" variant="warning">
                    Update Party
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
