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
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState } from "react";
import Cookies from "universal-cookie";
import { useFormik } from "formik";
// import * as yup from "yup";
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
import { Formik, Form } from "formik";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";
import CloseIcon from "@mui/icons-material/Close";
// import moment from 'moment'; // Make sure to import the moment library

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
  const [open, setOpen] = React.useState(false);
  let cookies = new Cookies();
  const [accessType, setAccessType] = useState(null);
  let navigate = useNavigate();

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

        <TableCell align="center">{row.engId}</TableCell>
        <TableCell align="center">{row.name}</TableCell>
        <TableCell align="center">{row.mobileNumber}</TableCell>
        <TableCell align="center">{row.passWord}</TableCell>
        <TableCell align="center">{row.engineerCity}</TableCell>

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
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ paddingLeft: 15, margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Other Data :
              </Typography>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "20px",
                }}
              >
                <div>
  <Typography variant="p" gutterBottom component="div">
    <span className="fw-bold">Create At:</span> {row.createAt}
  </Typography>
  {row.upadateAt && row.createAt !== row.upadateAt ? (
    <Typography variant="p" gutterBottom component="div">
      <span className="fw-bold">Update At:</span>
      {row.upadateAt}
    </Typography>
  ) : null}
</div>
                {/* <div>
                  <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Create At:</span> {row.createAt}
                  </Typography>
                  {row.upadateAt ? (
                    <Typography variant="p" gutterBottom component="div">
                      <span className="fw-bold">Update At:</span>
                      {row.upadateAt}
                    </Typography>
                  ) : null}
                </div> */}
                <div>
                  <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Machine Type:</span>{" "}
                    {row.machineType.map((machineType, id) => {
                      return (
                        <span className="d-flex flex-column">
                          {id + 1}. {machineType}
                        </span>
                      );
                    })}
                  </Typography>
                </div>
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
      if (accessType.includes("Engineer Page")) {
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

  let [engineerData, setEngineerData] = useState([]);
  console.log(engineerData);
  let [countData, setCountData] = useState(0);
  let [loader, setLoader] = useState(true);
  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [queryParameters] = useSearchParams();
  // console.log(queryParameters.get("value"));
  let getData = async () => {
    if (!queryParameters.get("value")) {
      let res = await axios.post(
        "https://spr-cms-babe93641764.herokuapp.com/eng/engineer_city_pagination",
        {
          machineType: localStorage.getItem("machine"),
          engineerCity: localStorage.getItem("city"),
          pageSize: rowsPerPage,
          pageNumber: page,
        }
      );
      setLoader(false);
      setEngineerData(res.data.data);
      setCountData(res.data.engcount);
    } else {
      let res = await axios.post(
        "https://spr-cms-babe93641764.herokuapp.com/eng/free_engineer_pagination",
        {
          machineType: localStorage.getItem("machine"),
          engineerCity: localStorage.getItem("city"),
        }
      );
      setLoader(false);
      setEngineerData(res.data.data);
      setCountData(res.data.freeEngCount);
    }
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
  var handleDelete = () => {
    axios
      .post("https://spr-cms-babe93641764.herokuapp.com/eng/delete-engineer", selected)
      .then((response) => {
        if (response.data.statusCode === 200) {
          getData();
          setSelected([]);
          swal("", response.data.message, "success");
        }
      });
  };

  //
  // Searchbar
  let handleSearchData = async (values) => {
    let res = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/eng/search-engineer",
      {
        search: values,
      }
    );
    if (res.data.statusCode === 200) {
      if (values !== "") {
        console.log(res.data.data);
        setEngineerData(res.data.data);
      } else {
        getData();
      }
    }
  };

  //   edit Engineer here
  let [modalShowForPopupForm, setModalShowForPopupForm] = React.useState(false);
  let [id, setId] = React.useState();

  if (!id) {
    var handleSubmit = async (values) => {
      values["createAt"] = moment(new Date()).format("YYYY-MM-DD, HH:mm:ss");
      values["upadateAt"] = moment(new Date()).format("YYYY-MM-DD, HH:mm:ss");
      let response = await axios.post(
        "https://spr-cms-babe93641764.herokuapp.com/eng/engineer",
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
        "https://spr-cms-babe93641764.herokuapp.com/eng/engineer/" + id,
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
  // const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  //   auto form fill up in edit
  let seletedEditData = async (datas) => {
    setModalShowForPopupForm(true);
    setId(datas._id);
    setEditData(datas);
  };

  // machin type
  let [macineTypeData, setMachineTypeData] = useState([]);
  let getmacineTypData = async () => {
    let response = await axios.get(
      "https://spr-cms-babe93641764.herokuapp.com/machinetype/machine-type"
    );
    setMachineTypeData(response?.data?.data);
  };
  React.useEffect(() => {
    getmacineTypData();
  }, []);

  return (
    <>
      <UserSidebar getData={getData} />
      <Box sx={{ width: "100%", pb: "2%", pl: "2%", pr: "2%" }}>
        <>
          {accessType &&
            (() => {
              if (!accessType.includes("engineer form")) {
                return null;
              }
              return (
                <div>
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
                      Add Engineer
                    </Button>
                  </div>
                </div>
              );
            })()}
        </>
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
                All Engineer
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
            <div className="d-flex flex-row justify-content-center align-items-center p-5 m-5">
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
                rowsPerPageOptions={[10, 25, 50]}
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
        <DialogTitle>
          {"Engineer Form"}
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
              name: editData && editData.name ? editData.name : "",
              mobileNumber:
                editData && editData.mobileNumber ? editData.mobileNumber : "",
              passWord: editData && editData.passWord ? editData.passWord : "",
              engineerCity:
                editData && editData.engineerCity
                  ? editData.engineerCity
                  : localStorage.getItem("city") === "All"
                  ? ""
                  : localStorage.getItem("city"),
              machineType:
                editData && editData.machineType ? editData.machineType : [],
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Required  Field"),
              mobileNumber: Yup.number().required("Required Field"),
              passWord: Yup.string().required(" Required Field"),
              engineerCity: Yup.string().required(
                " Required Field"
              ),
              machineType: Yup.array().required("Please Select Machine Type"),
            })}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm(values);
            }}
          >
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <Form>
                {/* <FormikValues /> */}
                <div>
                  <div className="mt-4">
                    <TextField
                      type="text"
                      size="small"
                      fullWidth
                      placeholder="Name"
                      label="Name"
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                    />
                    {touched.name && errors.name ? (
                      <div className="text-danger">{errors.name}</div>
                    ) : null}
                  </div>

                  <div className="w-100 mt-4">
                    <TextField
                      fullWidth
                      type="number"
                      size="small"
                      placeholder="MobileNumber"
                      label="MobileNumber"
                      name="mobileNumber"
                      className="col-sm-10"
                      value={values.mobileNumber}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{ maxLength: 12 }}
                    />
                    {touched.mobileNumber && errors.mobileNumber ? (
                      <div className="text-danger">{errors.mobileNumber}</div>
                    ) : null}
                  </div>
                  <div className="w-100 mt-4">
                    <TextField
                      fullWidth
                      type="passWord"
                      placeholder="Password"
                      size="small"
                      label="Password"
                      name="passWord"
                      className="col-sm-10"
                      value={values.passWord}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.passWord && errors.passWord ? (
                      <div className="text-danger">{errors.passWord}</div>
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
                  <div className="w-100 mt-3">
                    <FormControl fullWidth>
                      <InputLabel size="small">Machine Type</InputLabel>
                      <Select
                        multiple
                        size="small"
                        name="machineType"
                        value={values.machineType}
                        onChange={handleChange}
                        input={<OutlinedInput label="Machine Type" />}
                        renderValue={(selected) => selected.join(", ")}
                        onBlur={handleBlur}
                        MenuProps={MenuProps}
                      >
                        {macineTypeData.map(({ machineType }) => (
                          <MenuItem key={machineType} value={machineType}>
                            <Checkbox
                              checked={
                                values.machineType.indexOf(machineType) > -1
                              }
                            />
                            <ListItemText primary={machineType} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {touched.machineType && errors.machineType ? (
                      <div className="text-danger">{errors.machineType}</div>
                    ) : null}
                  </div>

                  {!id ? (
                    <Button className="mt-3" type="submit" variant="primary">
                      Add Engineer
                    </Button>
                  ) : (
                    <Button className="mt-3" type="submit" variant="warning">
                      Update Engineer
                    </Button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}
