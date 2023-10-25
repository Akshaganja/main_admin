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
import TextField from "@mui/material/TextField";
import swal from "sweetalert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { RotatingLines } from "react-loader-spinner";
import { Formik, Form, useFormikContext, useFormik } from "formik";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";
import CloseIcon from "@mui/icons-material/Close";

const headCells = [
  {
    label: "#",
  },
  {
    label: "Party Name",
  },
  {
    label: "M/c No.",
  },
  {
    label: "Type",
  },
  {
    label: "Installation",
  },
  {
    label: "Amc From",
  },
  {
    label: "Amc To",
  },
  {
    label: "Warranty From",
  },
  {
    label: "Warrnty To",
  },
  // {
  //   label: "Action",
  // },
];



function Row(props) {
  const {
    row,
    handleClick,
    isItemSelected,
    labelId,
    seletedEditData,
    getData,
    setModelShowForAmcDate,
    setId,
    setEditData,
    setAmcDateId,
  } = props;

  // const today = new Date().toISOString().slice(0, 10);
  // const amcToDate = row.amcToDate;
  // const shouldHighlightRow = isWithinFiveDays(amcToDate);

  // function isWithinFiveDays(date) {
  //   const currentDate = new Date().getTime();
  //   const targetDate = new Date(date).getTime();
  //   const fiveDaysInMillis = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds
  
  //   return targetDate - currentDate <= fiveDaysInMillis && targetDate > currentDate;
  // }
  
  const isWithinPreviousFiveDays = (date) => {
    const currentDate = new Date().getTime();
    const targetDate = new Date(date).getTime();
    const previousFiveDaysInMillis = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds
    
    return currentDate - targetDate > 0 && currentDate - targetDate <= previousFiveDaysInMillis;
  };

  const isWithinNextFiveDays = (date) => {
    const currentDate = new Date().getTime();
    const targetDate = new Date(date).getTime();
    const nextFiveDaysInMillis = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds
    
    return targetDate - currentDate > 0 && targetDate - currentDate <= nextFiveDaysInMillis;
  };
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

  // delete Amc Extended Date
  let handleDelete = async ({ id, array, index }) => {
    let extendAmcDateArray = [...array];
    // obj.remove();
    extendAmcDateArray.splice(index, 1);

    let response = await axios.put(
      "https://spr-cms-babe93641764.herokuapp.com/machine/machine/" + id,
      { extendAmcDateArray: extendAmcDateArray }
    );
    if (response.data.statusCode === 200) {
      setModelShowForAmcDate(false);
      getData();
      setId("");
      extendAmcDateArray = [];
      swal("", "Delete success fully", "success");
    }
  };

  const isCurrentDate = (date) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    return date === currentDate;
  };
  

// Function to check if a date matches the current date
// const isCurrentDate = (date) => {
//   const currentDate = new Date().toISOString().slice(0, 10);
//   return date === currentDate;
// };
// console.log(isCurrentDate("2023-08-26")); // Replace with your date value
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

  

<TableCell  align="center"
        style={{
          color: isWithinNextFiveDays(row.amcToDate)
            ? "red" // If the date is within the next five days
            : isWithinPreviousFiveDays(row.amcToDate)
            ? " #E8A317" // If the date is within the previous five days
            : "inherit",
        }}>{row.machineId}</TableCell>

        {/* <TableCell align="center">{row.machineId}</TableCell> */}

        <TableCell align="center"
        style={{
          color: isWithinNextFiveDays(row.amcToDate)
            ? "red" // If the date is within the next five days
            : isWithinPreviousFiveDays(row.amcToDate)
            ? " #E8A317" // If the date is within the previous five days
            : "inherit",
        }}>{row.partyName}</TableCell>

        {/* <TableCell align="center">{row.partyName}</TableCell> */}

        <TableCell align="center"
        style={{
          color: isWithinNextFiveDays(row.amcToDate)
            ? "red" // If the date is within the next five days
            : isWithinPreviousFiveDays(row.amcToDate)
            ? " #E8A317" // If the date is within the previous five days
            : "inherit",
        }}>{row.machineNumber}</TableCell>

        {/* <TableCell align="center">{row.machineNumber}</TableCell> */}


        <TableCell align="center"
        style={{
          color: isWithinNextFiveDays(row.amcToDate)
            ? "red" // If the date is within the next five days
            : isWithinPreviousFiveDays(row.amcToDate)
            ? " #E8A317" // If the date is within the previous five days
            : "inherit",
        }}>{row.machineType}</TableCell>

        
        {/* <TableCell align="center">{row.machineType}</TableCell> */}


        <TableCell align="center"
        style={{
          color: isWithinNextFiveDays(row.amcToDate)
            ? "red" // If the date is within the next five days
            : isWithinPreviousFiveDays(row.amcToDate)
            ? " #E8A317" // If the date is within the previous five days
            : "inherit",
        }} >{row.installationDate}</TableCell>


        {/* <TableCell align="center" >{row.installationDate}</TableCell> */}






{/*         
<TableCell align="center" style={{
    color:
      isWithinFiveDays(row.amcToDate) || isCurrentDate(row.amcToDate)
        ? "red"
        : "inherit",
  }}>{row.machineId}</TableCell>
        <TableCell align="center" style={{
    color:
      isWithinFiveDays(row.amcToDate) || isCurrentDate(row.amcToDate)
        ? "red"
        : "inherit",
  }}>{row.partyName}</TableCell>
        <TableCell align="center" style={{
    color:
      isWithinFiveDays(row.amcToDate) || isCurrentDate(row.amcToDate)
        ? "red"
        : "inherit",
  }}>{row.machineNumber}</TableCell>
        <TableCell align="center" style={{
    color:
      isWithinFiveDays(row.amcToDate) || isCurrentDate(row.amcToDate)
        ? "red"
        : "inherit",
  }}>{row.machineType}</TableCell>
        <TableCell align="center" style={{
    color:
      isWithinFiveDays(row.amcToDate) || isCurrentDate(row.amcToDate)
        ? "red"
        : "inherit",
  }} >{row.installationDate}</TableCell>
              
        <TableCell align="center" style={{
    color:
      isWithinFiveDays(row.amcToDate) || isCurrentDate(row.amcToDate)
        ? "red"
        : "inherit",
  }}>
  {row.amcFromDate}
</TableCell>
 */}




<TableCell align="center"
        style={{
          color: isWithinNextFiveDays(row.amcToDate)
            ? "red" // If the date is within the next five days
            : isWithinPreviousFiveDays(row.amcToDate)
            ? " #E8A317" // If the date is within the previous five days
            : "inherit",
        }}>{row.amcFromDate}</TableCell>

        {/* <TableCell align="center">{row.amcFromDate}</TableCell> */}
 
        {/* <TableCell align="center">{row.amcToDate}</TableCell> */}
        {/* <TableCell align="center" style={{ color: isCurrentDate(row.amcToDate) ? "red" : "inherit" }}>
        {row.amcToDate}
      </TableCell> */}
       




       {/* <TableCell
  align="center"
  style={{
    color:
      isWithinFiveDays(row.amcToDate) || isCurrentDate(row.amcToDate)
        ? "red"
        : "inherit",
  }}
>
  {row.amcToDate}
</TableCell>

 */}

<TableCell
        align="center"
        style={{
          color: isWithinNextFiveDays(row.amcToDate)
            ? "red" // If the date is within the next five days
            : isWithinPreviousFiveDays(row.amcToDate)
            ? " #E8A317" // If the date is within the previous five days
            : "inherit",
        }}
      >
        {row.amcToDate}
      </TableCell>




      <TableCell  align="center"
        style={{
          color: isWithinNextFiveDays(row.amcToDate)
            ? "red" // If the date is within the next five days
            : isWithinPreviousFiveDays(row.amcToDate)
            ? " #E8A317" // If the date is within the previous five days
            : "inherit",
        }}>{row.warrantyFromDate}</TableCell>
        
        <TableCell  align="center"
        style={{
          color: isWithinNextFiveDays(row.amcToDate)
            ? "red" // If the date is within the next five days
            : isWithinPreviousFiveDays(row.amcToDate)
            ? " #E8A317" // If the date is within the previous five days
            : "inherit",
        }}>{row.warrantyToDate}</TableCell>


        {/* <TableCell align="center">{row.warrantyFromDate}</TableCell>
        <TableCell align="center">{row.warrantyToDate}</TableCell> */}






{/* 
<TableCell align="center" style={{
    color:
      isWithinFiveDays(row.amcToDate) || isCurrentDate(row.amcToDate)
        ? "red"
        : "inherit",
  }}>{row.warrantyFromDate}</TableCell>
        <TableCell align="center"  style={{
    color:
      isWithinFiveDays(row.amcToDate) || isCurrentDate(row.amcToDate)
        ? "red"
        : "inherit",
  }}>{row.warrantyToDate}</TableCell> */}







        {accessType &&
          (() => {
            if (!accessType.includes("Edit Machine And Extend AMC")) {
              return null;
            }
            return (
              <TableCell align="center">
                <button
                  className="btn btn-default"
                  onClick={() => seletedEditData(row)}
                >
                  <EditIcon />
                </button>
                <Button
                  onClick={() => {
                    setModelShowForAmcDate(true);
                    setEditData(row);
                    setId(row._id);
                    setAmcDateId("");
                  }}
                >
                  AMC
                </Button>
              </TableCell>
            );
          })()}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ paddingLeft: 15, margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Extend AMC :
              </Typography>
              {/* <Typography variant="p" gutterBottom component="div">
                Party City :{row.partyCity}
              </Typography> */}
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell className="fw-bold" align="center">
                      No
                    </TableCell>
                    <TableCell className="fw-bold" align="center">
                      currentDate
                    </TableCell>
   
                    <TableCell className="fw-bold" align="center">
                      Extend Amc form Date
                    </TableCell>
                    <TableCell className="fw-bold" align="center">
                      Extend Amc to Date
                    </TableCell>

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
                  {row.extendAmcDateArray?.map((j, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell align="center">{j.amcdateId}</TableCell>
                        <TableCell align="center">{j.currentDate}</TableCell>
                        <TableCell align="center">
                          {j.extendAmcFromDate}
                        </TableCell>
                        <TableCell align="center">
                          {j.extendAmcToDate}
                        </TableCell>

                        {accessType &&
                          (() => {
                            if (!accessType.includes("Allow To Delete")) {
                              return null;
                            }
                            return (
                              <TableCell align="center">
                                <button
                                  className="btn btn-default"
                                  onClick={() =>
                                    handleDelete({
                                      id: row._id,
                                      array: row.extendAmcDateArray,
                                      index: i,
                                    })
                                  }
                                >
                                  <DeleteIcon />
                                </button>
                              </TableCell>
                            );
                          })()}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
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
      if (accessType.includes("Machine Page")) {
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
  let [loader, setLoader] = React.useState(true);
  let [countData, setCountData] = useState(0);

  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [queryParameters] = useSearchParams();

  const [amcExpireCheckData] = useSearchParams();

  let getData = async () => {
    if (!amcExpireCheckData.get("value")) {
      let res = await axios.post(
        "https://spr-cms-babe93641764.herokuapp.com/machine/machinetype_vice_data_pagination",
        {
          machineType: localStorage.getItem("machine"),
          partyCity: localStorage.getItem("city"),
          pageSize: rowsPerPage,
          pageNumber: page,
          machineNumber: queryParameters.get("machineNumber"),
        }
      );
      setLoader(false);
      setEngineerData(res.data.data);
      setCountData(res.data.machineCount);
    } else {
      let res = await axios.post("https://spr-cms-babe93641764.herokuapp.com/machine/amc-exp", {
        machineType: localStorage.getItem("machine"),
        partyCity: localStorage.getItem("city"),
      });
      setLoader(false);
      setEngineerData(res.data.data);
      setCountData(res.data.amcExpireCount);
    }
  };

  React.useEffect(() => {
    getData();
  }, [rowsPerPage, page]);

  let [partyData, setPartyData] = useState();

  let getPartyData = async () => {
    let data = await axios.post("https://spr-cms-babe93641764.herokuapp.com/party/party_name", {
      partyCity: localStorage.getItem("city"),
    });
    setPartyData(data.data.data);
  };

  React.useEffect(() => {
    getPartyData();
  }, []);

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
      .post(
        "https://spr-cms-babe93641764.herokuapp.com/machine/delete-machine",
        selected
      )
      .then((response) => {
        if (response.data.statusCode === 200) {
          getData();
          setSelected([]);
          swal("", response.data.message, "success");
        }
      });
  };

  // Searchbar
  let handleSearchData = async (values) => {
    let res = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/machine/search-machine",
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
  React.useEffect(() => {
    handleSearchData();
  }, []);

  //   edit Engineer here
  let [modalShowForPopupForm, setModalShowForPopupForm] = React.useState(false);
  let [id, setId] = React.useState();

  if (!id) {
    var handleSubmit = async (values) => {
      values["partyCity"] = showPartyCity;
      values["updatedAt"] = moment(new Date()).format("YYYY-MM-DD, HH:mm:ss");
      let response = await axios.post(
        "https://spr-cms-babe93641764.herokuapp.com/machine/machine",
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
      values["partyCity"] = showPartyCity;
      values["updatedAt"] = moment(new Date()).format("YYYY-MM-DD, HH:mm:ss");
      let response = await axios.put(
        "https://spr-cms-babe93641764.herokuapp.com/machine/machine/" + id,
        values
      );
      if (response.data.statusCode === 200) {
        setModalShowForPopupForm(false);
        getData();
        swal("", response.data.message, "success");
      }
    };
  }

  let todayDate = moment(new Date()).format("YYYY-MM-DD");
  var nextYearWithTodayDate = moment(todayDate)
    .add(1, "Y")
    .format("YYYY-MM-DD");

  //    // "add fom logic"
  let [editData, setEditData] = React.useState({});

  //   auto form fill up in edit
  let seletedEditData = async (datas) => {
    setModalShowForPopupForm(true);
    setId(datas._id);
    setEditData(datas);
  };

  let [machineFormik, setMachineFormik] = React.useState({});
  const FormikValues = () => {
    const formik = useFormikContext();
    React.useEffect(() => {
      setMachineFormik(formik.values);
    }, [formik.values]);
    return null;
  };

  let [showPartyCity, setShowPartyCity] = useState();

  React.useEffect(() => {
    const resultas = partyData?.filter(
      (row) => row.partyName === machineFormik.partyName
    );
    setShowPartyCity(
      resultas && resultas.length && resultas[0] && resultas[0]?.partyCity
        ? resultas[0]?.partyCity
        : ""
    );
  }, [machineFormik.partyName]);

  // amc Date extended

  let [modelShowForAmcDate, setModelShowForAmcDate] = React.useState(false);

  let [amcDateId, setAmcDateId] = useState();
  // console.log(amcDateId);

  let handleAMcDateSubmit = async (values) => {
    let findbyId = await axios.get(
      "https://spr-cms-babe93641764.herokuapp.com/machine/find_by_Id/" + id
    );
    let newArray = findbyId.data.data.extendAmcDateArray;

    var extendAmcDateArray = [...newArray];
    if (amcDateId) {
      //  extendAmcDateArray = [...newArray];
      values["amcdateId"] = amcDateId;
      extendAmcDateArray.splice(editData, 1, values);
      // extendAmcDateArray.push(values);
    } else {
      //  extendAmcDateArray = [...newArray];
      values["amcdateId"] = newArray.length + 1;
      console.log(newArray);
      extendAmcDateArray.push(values);
    }

    // extendAmcDateArray.reverse();
    extendAmcDateArray.sort(function (a, b) {
      return new Date(b.currentDate) - new Date(a.currentDate);
    });
    let response = await axios.put(
      "https://spr-cms-babe93641764.herokuapp.com/machine/machine/" + id,
      { extendAmcDateArray: extendAmcDateArray }
    );
    if (response.data.statusCode === 200) {
      setModelShowForAmcDate(false);
      getData();
      setId("");
      setEditData("");
      extendAmcDateArray = [];
      // swal("", response.data.message, "success");
      swal("","Amc date updated successfully", "success");
    }
  };

  let extendDateFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      currentDate:
        editData && editData.currentDate ? editData.currentDate : todayDate,
      extendAmcFromDate:
        editData && editData.extendAmcFromDate
          ? editData.extendAmcFromDate
          : todayDate,
      extendAmcToDate:
        editData && editData.extendAmcToDate
          ? editData.extendAmcToDate
          : nextYearWithTodayDate,

      amcBillStatus:
        editData && editData.amcBillStatus ? editData.amcBillStatus : "",

      amcBillReason:
        editData && editData.amcBillReason ? editData.amcBillReason : "",
    },
    validationSchema: Yup.object({
      currentDate: Yup.string().required("Please Select Current Date"),
      extendAmcFromDate: Yup.string().required(
        "Please Select amc From Date "
      ),
      extendAmcToDate: Yup.string().required("Please Select amc To Date "),
    }),
    onSubmit: (values, { resetForm }) => {
      handleAMcDateSubmit(values);
      resetForm(values);
    },
  });
  
  


  return (
    <>
      <UserSidebar getData={getData} getPartyData={getPartyData} />
      <Box sx={{ width: "100%", pb: "2%", pl: "2%", pr: "2%" }}>
        {accessType &&
          (() => {
            if (!accessType.includes("Add Machine Type")) {
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
                  Add Machine
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
                All Machine
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
              <Table>
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
                                engineerData.length > 0 &&
                                selected.length === engineerData.length
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
                        if (
                          !accessType.includes("Edit Machine And Extend AMC")
                        ) {
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
                        key={row.name}
                        row={row}
                        isItemSelected={isItemSelected}
                        labelId={labelId}
                        handleClick={handleClick}
                        selected={selected}
                        index={index}
                        seletedEditData={seletedEditData}
                        setModelShowForAmcDate={setModelShowForAmcDate}
                        setId={setId}
                        getData={getData}
                        setEditData={setEditData}
                        setAmcDateId={setAmcDateId}
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
      {/* add and update party Dialog */}
      <Dialog
        fullWidth
        open={modalShowForPopupForm}
        onClose={() => setModalShowForPopupForm(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Machine Form"}
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
              machineNumber:
                editData && editData.machineNumber
                  ? editData.machineNumber
                  : "",
              machineType:
                editData && editData.machineType
                  ? editData.machineType
                  : localStorage.getItem("machine") === "All"
                  ? ""
                  : localStorage.getItem("machine"),
              installationDate:
                editData && editData.installationDate
                  ? editData.installationDate
                  : todayDate,
              amcFromDate:
                editData && editData.amcFromDate
                  ? editData.amcFromDate
                  : todayDate,
              amcToDate:
                editData && editData.amcToDate
                  ? editData.amcToDate
                  : nextYearWithTodayDate,
              warrantyFromDate:
                editData && editData.warrantyFromDate
                  ? editData.warrantyFromDate
                  : "",
              warrantyToDate:
                editData && editData.warrantyToDate
                  ? editData.warrantyToDate
                  : "",
            }}
            validationSchema={Yup.object().shape({
              partyName: Yup.string().required("Please Select partyName"),
              machineNumber: Yup.string().required(
                "Please Enter machineNumber"
              ),
              machineType: Yup.string().required("Please Select machineType"),
              installationDate: Yup.string().required(
                "Please Select installationDate"
              ),
              amcFromDate: Yup.string().required("Please Select amcFromDate"),
              amcToDate: Yup.string().required("Please Select amcToDate"),

              warrantyFromDate: Yup.string().required(
                "Please Required this field"
              ),
              warrantyToDate: Yup.string().required("Please Select amcToDate"),
            })}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm(values);
            }}
          >
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <Form>
                <FormikValues />

                <div>
                  <div className="mt-4">
                    <FormControl fullWidth>
                      <InputLabel size="small">Party Name</InputLabel>
                      <Select
                        size="small"
                        label="Party Name"
                        name="partyName"
                        value={values.partyName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        MenuProps={{
                          style: {
                            maxHeight: 210,
                          },
                        }}
                      >
                        {partyData?.map((option) => (
                          <MenuItem
                            key={option?.partyName}
                            value={option?.partyName}
                          >
                            {option.partyName}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.partyName && errors.partyName ? (
                        <div className="text-danger">{errors.partyName}</div>
                      ) : null}
                    </FormControl>
                  </div>

                  {machineFormik.partyName ? (
                    <div className="mt-4">
                      <TextField
                        fullWidth
                        size="small"
                        id="outlined-select-currency"
                        label="Party City"
                        name="partyCity"
                        disabled
                        value={showPartyCity}
                      />
                    </div>
                  ) : null}

                  <div className="mt-4">
                    <TextField
                      fullWidth
                      type="string"
                      size="small"
                      placeholder="machine Number"
                      label="Machine Number"
                      name="machineNumber"
                      value={values.machineNumber}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.machineNumber && errors.machineNumber ? (
                      <div className="text-danger">{errors.machineNumber}</div>
                    ) : null}
                  </div>

                  <div className="mt-4">
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

                  <div className="w-100 mt-4">
                    <TextField
                      fullWidth
                      type="date"
                      size="small"
                      placeholder="Installation Date"
                      label="Installation Date"
                      name="installationDate"
                      className="col-sm-10"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={values.installationDate}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                    {touched.installationDate && errors.installationDate ? (
                      <div className="text-danger">
                        {errors.installationDate}
                      </div>
                    ) : null}
                  </div>
                  <div className="d-flex flex-row gap-3">
                    <div className="w-100 mt-4">
                      <TextField
                        fullWidth
                        type="date"
                        size="small"
                        placeholder="AmcFromDate"
                        label="AmcFromDate"
                        name="amcFromDate"
                        className="col-sm-10"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={values.amcFromDate}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.amcFromDate && errors.amcFromDate ? (
                        <div className="text-danger">{errors.amcFromDate}</div>
                      ) : null}
                    </div>
                    <div className="w-100 mt-4">
                      <TextField
                        fullWidth
                        type="date"
                        size="small"
                        placeholder="AmcToDate"
                        label="AmcToDate"
                        name="amcToDate"
                        className="col-sm-10"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        value={values.amcToDate}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.amcToDate && errors.amcToDate ? (
                        <div className="text-danger">{errors.amcToDate}</div>
                      ) : null}
                    </div>
                 
                    {/* <div className="w-100 mt-4">
  <TextField
    fullWidth
    type="date"
    size="small"
    placeholder="AmcToDate"
    label="AmcToDate"
    name="amcToDate"
    className={`col-sm-10 ${isCurrentDate(values.amcToDate) ? 'highlighted-input' : ''}`}
    InputLabelProps={{
      shrink: true,
    }}
    value={values.amcToDate}
    onBlur={handleBlur}
    onChange={handleChange}
  />
  {touched.amcToDate && errors.amcToDate ? (
    <div className="text-danger">{errors.amcToDate}</div>
  ) : null}
</div> */}

 

{/* working  */}
{/* 
                    // <div className="w-100 mt-4">
                    //   <TextField
                    //     fullWidth
                    //     type="date"
                    //     size="small"
                    //     placeholder="AmcToDate"
                    //     label="AmcToDate"
                    //     name="amcToDate"
                    //     className="col-sm-10"
                    //     InputLabelProps={{
                    //       shrink: true,
                    //     }}
                    //     value={values.amcToDate}
                    //     onBlur={handleBlur}
                    //     onChange={handleChange}
                    //   />
                    //   {touched.amcToDate && errors.amcToDate ? (
                    //     <div className="text-danger">{errors.amcToDate}</div>
                    //   ) : null}
                    // </div> */}


                  </div>
                  <div className="d-flex flex-row gap-3">
                    <div className="w-100 mt-4">
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
                    <div className="w-100 mt-4">
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
                  {!id ? (
                    <Button className="mt-3" type="submit" variant="primary">
                      Add Machine
                    </Button>
                  ) : (
                    <Button className="mt-3" type="submit" variant="warning">
                      Update Machine
                    </Button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      {/* extend Amc Date */}
      <Dialog 
        open={modelShowForAmcDate}
        onClose={() => setModelShowForAmcDate(false)}
        aria-describedby="alert-dialog-slide-description"
        // maxWidth="md" 
        fullWidth
      >
        <DialogTitle >
          {"Extend Amc Date form"} 
        </DialogTitle>
        <DialogContent>
          <form onSubmit={extendDateFormik.handleSubmit}>
            <div className="mt-4">
              <TextField
                fullWidth
                type="date"
                size="small"
                placeholder="Current Date"
                label="Current Date"
                name="currentDate"
                InputLabelProps={{
                  shrink: true,
                }}
                value={extendDateFormik.values.currentDate}
                onBlur={extendDateFormik.handleBlur}
                onChange={extendDateFormik.handleChange}
              />
              {extendDateFormik.touched.currentDate &&
              extendDateFormik.errors.currentDate ? (
                <div className="text-danger">
                  {extendDateFormik.errors.currentDate}
                </div>
              ) : null}
            </div>

            <div className="mt-4">
              <TextField
                fullWidth
                type="date"
                size="small"
                placeholder="AmcFromDate"
                label="AmcFromDate"
                name="extendAmcFromDate"
                InputLabelProps={{
                  shrink: true,
                }}
                value={extendDateFormik.values.extendAmcFromDate}
                onBlur={extendDateFormik.handleBlur}
                onChange={extendDateFormik.handleChange}
              />
              {extendDateFormik.touched.extendAmcFromDate &&
              extendDateFormik.errors.extendAmcFromDate ? (
                <div className="text-danger">
                  {extendDateFormik.errors.extendAmcFromDate}
                </div>
              ) : null}
            </div>
            <div className="mt-4">
              <TextField
                fullWidth
                type="date"
                size="small"
                placeholder="AmcToDate"
                label="AmcToDate"
                name="extendAmcToDate"
                InputLabelProps={{
                  shrink: true,
                }}
                value={extendDateFormik.values.extendAmcToDate}
                onBlur={extendDateFormik.handleBlur}
                onChange={extendDateFormik.handleChange}
              />
              {extendDateFormik.touched.extendAmcToDate &&
              extendDateFormik.errors.extendAmcToDate ? (
                <div className="text-danger">
                  {extendDateFormik.errors.extendAmcToDate}
                </div>
              ) : null}
            </div>

            <div className="w-100 mt-3">
              <TextField
                fullWidth
                size="small"
                select
                label="Amc Bill Status"
                name="amcBillStatus"
                value={extendDateFormik.values.amcBillStatus}
                onBlur={extendDateFormik.handleBlur}
                onChange={extendDateFormik.handleChange}
              >
                <MenuItem>Amc Bill Status</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Received">Received</MenuItem>
              </TextField>
              {extendDateFormik.touched.amcBillStatus &&
              extendDateFormik.errors.amcBillStatus ? (
                <div className="text-danger">
                  {extendDateFormik.errors.amcBillStatus}
                </div>
              ) : null}
            </div>

            {"Received" === extendDateFormik.values.amcBillStatus ? (
              <div className="mt-3">
                <TextField
                  type="text"
                  size="small"
                  fullWidth
                  placeholder="Amc Bill Reason"
                  label="Amc Bill Reason"
                  name="amcBillReason"
                  value={extendDateFormik.values.amcBillReason}
                  onBlur={extendDateFormik.handleBlur}
                  onChange={extendDateFormik.handleChange}
                />
                {extendDateFormik.touched.amcBillReason &&
                extendDateFormik.errors.amcBillReason ? (
                  <div className="text-danger">
                    {extendDateFormik.errors.amcBillReason}
                  </div>
                ) : null}
              </div>
            ) : null}

            {!amcDateId ? (
              <Button className="mt-3" type="submit" variant="primary">
                Submit
              </Button>
            ) : (
              <Button className="mt-3" type="submit" variant="warning">
                Update
              </Button>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
