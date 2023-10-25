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
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import swal from "sweetalert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import moment from "moment";
import { RotatingLines } from "react-loader-spinner";
import jwt_decode from "jwt-decode";
import CloseIcon from "@mui/icons-material/Close";

const headCells = [
  {
    label: "#",
  },
  {
    label: "Machine Type",
  },
  {
    label: "Parts Name",
  },
  {
    label: "Parts Price",
  },
  {
    label: "Parts Quantity",
  },
  {
    label: "City",
  },
];

var tempData = [];

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

  let [modelShow, setModelShow] = React.useState(false);
  let [engineerNameArray, setEngineerNameArray] = useState([]);
  console.log(engineerNameArray);
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

        <TableCell align="center">{index + 1}</TableCell>
        <TableCell align="center">{row.machineType}</TableCell>
        <TableCell align="center">{row.partsName}</TableCell>
        <TableCell align="center">{row.partsPrice}</TableCell>
        <TableCell align="center">{row.partsQuantity}</TableCell>
        <TableCell align="center">{row.partsCity}</TableCell>

        {accessType &&
          (() => {
            if (!accessType.includes("Allow To Edit")) {
              return null;
            }
            return (
              <TableCell align="center">
                {/* <Button
                  size="small"
                  onClick={() => {
                    setEngineerNameArray(row.engineer);
                    setModelShow(true);
                  }}
                >
                  Parts
                </Button> */}
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

      <Dialog fullWidth open={modelShow} onClose={() => setModelShow(false)}>
        <DialogTitle>
          {"Problems Of"}
          <IconButton
            aria-label="close"
            onClick={() => setModelShow(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            {/* <CloseIcon /> */}
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="fw-bold">
                  Engineer
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Quantity
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {engineerNameArray?.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell align="center">{row.engineerName}</TableCell>
                  <TableCell align="center">{row.partsQuantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>

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
                    <span className="fw-bold">Is Warranty?:</span>{" "}
                    {row.isWarranty}
                  </Typography>
                  {row.isWarranty === "Yes" ? (
                    <>
                      <Typography variant="p" gutterBottom component="div">
                        <span className="fw-bold">Warranty Start Date:</span>{" "}
                        {row.warrantyFromDate}
                      </Typography>
                      <Typography variant="p" gutterBottom component="div">
                        <span className="fw-bold">Warranty End Date:</span>{" "}
                        {row.warrantyToDate}
                      </Typography>
                    </>
                  ) : null}
                  <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Create At:</span> {row.createAt}
                  </Typography>
                  {row.upadateAt ? (
                    <Typography variant="p" gutterBottom component="div">
                      <span className="fw-bold">Upadate At:</span>{" "}
                      {row.upadateAt}
                    </Typography>
                  ) : null}
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
  let todayDate = moment(new Date()).format("YYYY-MM-DD");
  var nextYearWithTodayDate = moment(todayDate)
    .add(1, "Y")
    .format("YYYY-MM-DD");

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
      if (accessType.includes("Parts Page")) {
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

  let [loader, setLoader] = React.useState(true);
  let [partsData, setPartsData] = useState([]);
  let [countData, setCountData] = useState(0);

  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  let getData = async () => {
    let data = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/parts/gets_parts_pagination",
      {
        partsCity: localStorage.getItem("city"),
        pageSize: rowsPerPage,
        pageNumber: page,
      }
    );
    setLoader(false);
    setPartsData(data.data.data);
    setCountData(data.data.partsCount);
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
      const newSelected = partsData.map((n) => n._id);
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
      .post("https://spr-cms-babe93641764.herokuapp.com/parts/delete_parts", selected)
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
      "https://spr-cms-babe93641764.herokuapp.com/parts/search-Parts",
      {
        search: values,
      } 
    );
    if (res.data.statusCode === 200) {
      if (values !== "") {
        setPartsData(res.data.data);
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
  //     setPartsData(serchData);
  //   } else {
  //     setPartsData(partsData);
  //   }
  // };

  //   edit Engineer here
  let [modalShowForPopupForm, setModalShowForPopupForm] = React.useState(false);
  let [id, setId] = React.useState();

  if (!id) {
    var handleSubmit = async (values) => {
      values["createAt"] = moment(new Date()).format("YYYY-MM-DD, HH:mm:ss");
      let response = await axios.post(
        "https://spr-cms-babe93641764.herokuapp.com/parts/add_parts",
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
        "https://spr-cms-babe93641764.herokuapp.com/parts/update_parts/" + id,
        values
      );
      if (response.data.statusCode === 200) {
        setModalShowForPopupForm(false);
        getData();
        swal("", response.data.message, "success");
      }
    };
  }

  let [machineTypeData, setMachineTypeData] = useState();
  let getMachineTypeData = async () => {
    let data = await axios.get(
      "https://spr-cms-babe93641764.herokuapp.com/machinetype/machine-type"
    );
    setMachineTypeData(data.data.data);
  };

  React.useEffect(() => {
    getMachineTypeData();
  }, []);

  let [editData, setEditData] = React.useState({});
  // Party Formik
  // let partsFormik = useFormik({
  //   enableReinitialize: true,
  //   initialValues: {
  // partsName: editData && editData.partsName ? editData.partsName : "",
  // partsQuantity:
  //   editData && editData.partsQuantity ? editData.partsQuantity : "",
  // partsCity:
  //   editData && editData.partsCity
  //     ? editData.partsCity
  //     : localStorage.getItem("city") === "All"
  //     ? ""
  //     : localStorage.getItem("city"),
  //   },
  //   validationSchema: yup.object({
  // partsName: yup.string().required("Required this field"),
  // partsQuantity: yup.number().required("Required this field"),
  // partsCity: yup.string().required("Required this field"),
  //   }),
  //   onSubmit: async (values, { resetForm }) => {
  //     await new Promise((resolve) => setTimeout(resolve, 500));
  //     handleSubmit(values);
  //     resetForm(values);
  //   },
  // });

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
            if (!accessType.includes("Add Parts")) {
              return null;
            }
            return (
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
                  Add Parts
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
                All Parts
              </Typography>
            )}
            <form className="form-inline">
              <input
                id="serchbar-size"
                className="form-control mr-sm-2"
                type="search"
                // value={serchingData}
                // onChange={handleSearchData}
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
                                selected.length < partsData.length
                              }
                              checked={
                                partsData.length > 0 &&
                                selected.length === partsData.length
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
                  {partsData?.map((row, index) => {
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
        <DialogTitle>
          {"Parts Form"}
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
              machineType:
                editData && editData.machineType
                  ? editData.machineType
                  : localStorage.getItem("machine") === "All"
                  ? ""
                  : localStorage.getItem("machine"),
              partsName:
                editData && editData.partsName ? editData.partsName : "",
              partsPrice:
                editData && editData.partsPrice ? editData.partsPrice : "",
              partsQuantity:
                editData && editData.partsQuantity
                  ? editData.partsQuantity
                  : "",
              isWarranty:
                editData && editData.isWarranty ? editData.isWarranty : "",
              warrantyFromDate:
                editData && editData.warrantyFromDate
                  ? editData.warrantyFromDate
                  : todayDate,
              warrantyToDate:
                editData && editData.warrantyToDate
                  ? editData.warrantyToDate
                  : "",
              partsCity:
                editData && editData.partsCity
                  ? editData.partsCity
                  : localStorage.getItem("city") === "All"
                  ? ""
                  : localStorage.getItem("city"),
            }}
            validationSchema={Yup.object().shape({
              machineType: Yup.string().required("Required  field "),
              partsName: Yup.string().required("Required field "),
              partsPrice: Yup.number().required("Required field "),
              isWarranty: Yup.string().required("Required  field "),
              partsQuantity: Yup.number().required("Required  field"),
              partsCity: Yup.string().required("Required  field"),
            })}
            onSubmit={(values, { resetForm }) => {
              console.log(values, "values");
              handleSubmit(values);
              resetForm(values);
            }}
          >
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <Form>
                <div>
                  <div className="mt-">
                    <FormControl fullWidth>
                      <InputLabel size="small">Machine Type</InputLabel>
                      <Select
                        size="small"
                        id="outlined-select-currency"
                        label="Machine Type"
                        name="machineType"
                        value={values.machineType}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        MenuProps={{
                          style: {
                            maxHeight: 210,
                          },
                        }}
                      >
                        {machineTypeData?.map((option) => (
                          <MenuItem
                            key={option?.machineType}
                            value={option?.machineType}
                          >
                            {option.machineType}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.machineType && errors.machineType ? (
                        <div className="text-danger">{errors.machineType}</div>
                      ) : null}
                    </FormControl>
                  </div>

                  <div className="mt-3">
                    <TextField
                      type="text"
                      size="small"
                      fullWidth
                      placeholder="Parts Name"
                      label="Parts Name"
                      name="partsName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.partsName}
                    />
                    {touched.partsName && errors.partsName ? (
                      <div className="text-danger">{errors.partsName}</div>
                    ) : null}
                  </div>

                  <div className="mt-3">
                    <TextField
                      type="text"
                      size="small"
                      fullWidth
                      placeholder="Parts Price"
                      label="Parts Price"
                      name="partsPrice"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.partsPrice}
                      inputProps={{ inputMode: "numeric" }}
                    />
                    {touched.partsPrice && errors.partsPrice ? (
                      <div className="text-danger">{errors.partsPrice}</div>
                    ) : null}

                    {/* Check if partsPrice is 0 */}
                    {values.partsPrice === "0" ||
                    parseFloat(values.partsPrice) <= 0 ? (
                      <div className="text-danger">
                        Part Price must be greater than 0.
                      </div>
                    ) : null}
                  </div>
                  {/* {values.partsPrice === "0" && ( // Use "0" as a string since the input is of type text
                        <div className="text-danger">
                          Part Price must be greater than 0.
                        </div>
                      )}
                    </div> */}

                  <div className="mt-3">
                    <TextField
                      type="text"
                      size="small"
                      fullWidth
                      placeholder="Parts Quantity"
                      label="Parts Quantity"
                      name="partsQuantity"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.partsQuantity}
                    />
                    {touched.partsQuantity && errors.partsQuantity ? (
                      <div className="text-danger">{errors.partsQuantity}</div>
                    ) : null}

                    {/* Check if partsPrice is 0 */}

                    {values.partsQuantity === "0" ||
                    parseFloat(values.partsQuantity) <= 0 ? (
                      <div className="text-danger">
                        Parts Quantity must be greater than 0.
                      </div>
                    ) : null}
                    {/* {values.partsQuantity === "0" && ( 
                      <div className="text-danger">
                        partsQuantity must be greater than 0.
                      </div>
                    )} */}
                  </div>

                  <div className="w-100 mt-3">
                    <TextField
                      fullWidth
                      size="small"
                      select
                      label="is Warranty?"
                      name="isWarranty"
                      value={values.isWarranty}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <MenuItem>Select Warranty</MenuItem>
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                    </TextField>
                    {touched.isWarranty && errors.isWarranty ? (
                      <div className="text-danger">{errors.isWarranty}</div>
                    ) : null}
                  </div>

                  {"Yes" === values.isWarranty ? (
                    <div className="d-flex flex-row gap-3">
                      <div className="w-100 mt-3">
                        <TextField
                          fullWidth
                          type="date"
                          size="small"
                          placeholder="warrantyFromDate"
                          label="warrantyFromDate"
                          name="warrantyFromDate"
                          className="col-sm-10"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={values.warrantyFromDate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {touched.warrantyFromDate && errors.warrantyFromDate ? (
                          <div className="text-danger">
                            {errors.warrantyFromDate}
                          </div>
                        ) : null}
                      </div>
                      <div className="w-100 mt-3">
                        <TextField
                          fullWidth
                          type="date"
                          size="small"
                          placeholder="warrantyToDate"
                          label="warrantyToDate"
                          name="warrantyToDate"
                          className="col-sm-10"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={values.warrantyToDate}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        {touched.warrantyToDate && errors.warrantyToDate ? (
                          <div className="text-danger">
                            {errors.warrantyToDate}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  <div className="w-100 mt-3">
                    <TextField
                      fullWidth
                      size="small"
                      select
                      label="Select City"
                      name="partsCity"
                      value={values.partsCity}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    >
                      <MenuItem>Select City</MenuItem>
                      <MenuItem value="Bhavnagar">Bhavnagar</MenuItem>
                      <MenuItem value="Surat">Surat</MenuItem>
                    </TextField>
                    {touched.partsCity && errors.partsCity ? (
                      <div className="text-danger">{errors.partsCity}</div>
                    ) : null}
                  </div>
                  {!id ? (
                    <Button className="mt-3" type="submit" variant="primary">
                      Add Parts
                    </Button>
                  ) : (
                    <Button className="mt-3" type="submit" variant="warning">
                      Update Parts
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
