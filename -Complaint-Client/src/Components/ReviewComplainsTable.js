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
import TextField from "@mui/material/TextField";
import swal from "@sweetalert/with-react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import DoneIcon from "@mui/icons-material/Done";
import ReplayIcon from "@mui/icons-material/Replay";
import { RotatingLines } from "react-loader-spinner";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Rating } from "react-simple-star-rating";
import Ratings from "@mui/material/Rating";
import DialogActions from "@mui/material/DialogActions";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";

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
const headCells = [
  {
    label: "#",
  },
  {
    label: "Party Name",
  },
  {
    label: "Machine No",
  },
  {
    label: "call By",
  },
  {
    label: "log By",
  },
  {
    label: "Engineer Name",
  },
  {
    label: "Action",
  },
];

function Row(props) {
  const {
    row,
    handleClick,
    isItemSelected,
    labelId,
    seletedEditData,
    getData,
    setModalShowForPopupForm,
    setEditData,
    setId,
  } = props;

  const [open, setOpen] = React.useState(false);

  let [fiveStarRatingModelShow, setFiveStarRatingModel] = useState(false);
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

  //   const [rating, setRating] = useState(0);
  // console.log(rating,"Rating")
  //   const handleRating = (rate) => {
  //     setRating(rate);

  //     // other logic
  //   };
  //   // Optinal callback functions
  //   const onPointerEnter = () => console.log("Enter");
  //   const onPointerLeave = () => console.log("Leave");
  //   const onPointerMove = (value, index) => console.log(value, index);

  let [idRating, setIdRating] = useState();
  let handleDone = async (id, startTime, endTime, solution) => {
    swal("You Sure Complaint Is Done ?", {
      buttons: ["No", "Yes"],
    }).then(async (buttons) => {
      if (buttons === true) {
        if (startTime && endTime && solution) {
          let response = await axios.put(
            "https://spr-cms-babe93641764.herokuapp.com/add-complaint/complaint_data/" +
              id,
            { isCompleted: "Completed" }
          );
          if (response.data.statusCode === 200) {
            setIdRating(id);
            setFiveStarRatingModel(true);
          }
        } else {
          swal("", "Add First Start Time And End Time,Solution ", "error");
        }
      }
    });
  };

  // rating
  const [rating, setRating] = useState(0);

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
    // other logic
  };

  // useEffect(() => {
  //   handleRating();
  // }, [rating]);

  let handleFiveStarRating = async () => {
    if (rating > 0) {
      console.log("rating", rating);
      let response = await axios.put(
        "https://spr-cms-babe93641764.herokuapp.com/add-complaint/complaint_data/" +
          idRating,
        { rating: rating }
      );
      if (response.data.statusCode === 200) {
        getData();
        setRating(0);
        setFiveStarRatingModel(false);
        swal("", "Complaint Completed", "success");
      }
    }
  };

  let handleNotCompleted = async (datas) => {
    swal("Are You Sure Repeat This Complaint?", {
      buttons: ["No", "Yes"],
    }).then(async (buttons) => {
      if (buttons === true) {
        setModalShowForPopupForm(true);
        setEditData(datas);
        setId("");
      }
    });
  };

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

        <TableCell align="center">{row.cmp_id}</TableCell>
        <TableCell align="center">{row.partyName}</TableCell>
        <TableCell align="center">{row.machineNo}</TableCell>
        <TableCell align="center">{row.callBy}</TableCell>
        <TableCell align="center">{row.logBy}</TableCell>
        <TableCell align="center">{row.engineerName}</TableCell>
        <TableCell align="center">
          <div className="d-flex flex-row justify-content-center gap-2">
            {/* <Button
              variant="success"
              onClick={() =>
                handleDone(row._id, row.startTime, row.endTime, row.solution)
              }
            >
              <DoneIcon />
            </Button> */}
            <Button variant="danger" onClick={() => handleNotCompleted(row)}>
              <ReplayIcon />
            </Button>

            {accessType &&
              (() => {
                if (!accessType.includes("Allow To Edit")) {
                  return null;
                }
                return (
                  <button
                    class="btn btn-default"
                    onClick={() => seletedEditData(row)}
                  >
                    {/* <EditIcon /> */}
                  </button>
                );
              })()}

            {/* <button
              class="btn btn-default"
              onClick={() => seletedEditData(row)}
            >
              <EditIcon />
            </button> */}
          </div>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ paddingLeft: 15, margin: 2 }}>
              <Typography variant="h6" gutterBottom component="div">
                Other Data :
              </Typography>
              <div className="d-flex flex-row flex-wrap justify-content-around gap-2">
                <div>
                  <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Machine Type : </span>
                    {row.machineType}
                  </Typography>

                  <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Admin : </span>
                    {row.isAdmin ? "YES" : "NO"}
                  </Typography>
                  <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Repeat Complaint No : </span>
                    {row.repeatComplaintNumber}
                  </Typography>

                  <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Create At : </span>
                    {moment(row.createDateAt).format("DD/MM/YYYY")},{" "}
                    {row.createTimeAt}
                  </Typography>

                  <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Upadate At : </span>
                    {moment(row.upadateDateAt).format("DD/MM/YYYY")},
                    {row.upadateTimeAt}
                  </Typography>
                </div>
                <div>
                  <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Start Time : </span>
                    {row.startTime}
                  </Typography>
                  <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Solution : </span> {row.solution}
                  </Typography>
                  {/* endTime */}
                  <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">End Time : </span> {row.endTime}
                  </Typography>
                  <Typography
                    variant="p"
                    gutterBottom
                    component="div"
                    className="d-flex justify-content-start align-items-center gap-1"
                  >
                    <span className="fw-bold"> Rating : </span>
                    <Ratings value={row.rating} readOnly />
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant="p"
                    gutterBottom
                    component="div"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.open(
                        "https://maps.google.com?q=" +
                          row.startComplaintLocation?.latitude+
                          "," +
                          row.startComplaintLocation?.longitude 
                      );
                    }}
                  >
                    <span className="fw-bold">Start Time Address : </span>
                    {row.startComplaintLocation?.address}
                  </Typography>
                  <Typography
                    variant="p"
                    gutterBottom
                    component="div"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      window.open(
                        "https://maps.google.com?q=" +
                          row.endComplaintLocation?.latitude+
                          "," +
                          row.endComplaintLocation?.longitude 
                      );
                    }}
                  >
                    <span className="fw-bold">End Time Address : </span>
                    {row.endComplaintLocation?.address}
                  </Typography>
                </div>
                <div>
                  <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Complain:</span>
                    <div className="row">
                      {/* {row?.details} */}
                      {row?.details?.map((comp, id) => {
                        return (
                          <div>
                            {id + 1}. {comp}
                          </div>
                        );
                      })}
                    </div>
                    <p className="col">{row?.details1}</p>
                  </Typography>
                </div>
              </div>
              {row.anaysisCompaint?.length > 0 ? (
                <div>
                  <div>
                    <h5>Support Engineer :</h5>
                  </div>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow>
                        <TableCell className="fw-bold" align="center">
                          Id
                        </TableCell>
                        <TableCell className="fw-bold" align="center">
                          Support Eng Name
                        </TableCell>
                        <TableCell className="fw-bold" align="center">
                          StartTime
                        </TableCell>
                        <TableCell className="fw-bold" align="center">
                          EndTime
                        </TableCell>
                        <TableCell className="fw-bold" align="center">
                          Solution
                        </TableCell>
                        <TableCell className="fw-bold" align="center">
                          Support EngName CreateDate
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {row?.anaysisCompaint?.map((e, i) => {
                        return (
                          <TableRow key={i}>
                            <TableCell align="center">{e.anaId}</TableCell>
                            <TableCell align="center">
                              {e.supportEngName}
                            </TableCell>
                            <TableCell align="center">{e.startTime}</TableCell>
                            <TableCell align="center">{e.endTime}</TableCell>
                            <TableCell align="center">{e.solution}</TableCell>
                            <TableCell align="center">
                              {e.supportEngNameCreateDate}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : null}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {fiveStarRatingModelShow ? (
        <Dialog
          maxWidth="md"
          open={fiveStarRatingModelShow}
          // onClose={() => setFiveStarRatingModel(false)}
        >
          <DialogTitle id="responsive-dialog-title">{"Rating"}</DialogTitle>
          <DialogContent dividers>
            <div className="p-4">
              <Rating
                onClick={handleRating}
                fillColorArray={[
                  "#f14f45",
                  "#f16c45",
                  "#f18845",
                  "#f1b345",
                  "#f1d045",
                ]}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleFiveStarRating()}>Submit</Button>
          </DialogActions>
        </Dialog>
      ) : null}
    </React.Fragment>
  );
}

export default function Complaint() {
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
      if (accessType.includes("Review Complaint Page")) {
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

  let [reviewComplain, setReviewComplain] = useState([]);
  let [loader, setLoader] = useState(true);
  let [countData, setCountData] = useState(0);

  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  let getData = async () => {
    let data = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/review-complaint/findby_machinetype_or_engineercity",
      {
        machineType: localStorage.getItem("machine"),
        engineerCity: localStorage.getItem("city"),
        pageSize: rowsPerPage,
        pageNumber: page,
      }
    );
    setLoader(false);
    setCountData(data.data.reviewComplaintCount);
    setReviewComplain(data.data.data);
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
      const newSelected = reviewComplain.map((n) => n._id);
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
        "https://spr-cms-babe93641764.herokuapp.com/add-complaint/delete_complaint_data",
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
      "https://spr-cms-babe93641764.herokuapp.com/review-complaint/search_complaint_reivew",
      {
        search: values,
      }
    );
    if (res.data.statusCode === 200) {
      if (values !== "") {
        setReviewComplain(res.data.data);
      } else {
        getData();
      }
    }
  };

  //   engineer name
  let [machineNumberAndPartyName, setMachineNumberAndPartyName] = useState();
  let getMachineNumberData = async () => {
    let response = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/machine/machinetype_vice_data",
      {
        partyCity: localStorage.getItem("city"),
        machineType: localStorage.getItem("machine"),
      }
    );
    setMachineNumberAndPartyName(response.data.data);
  };
  React.useEffect(() => {
    getMachineNumberData();
  }, []);

  //   edit Engineer here
  let [modalShowForPopupForm, setModalShowForPopupForm] = React.useState(false);
  let [id, setId] = React.useState();
  const [complainArrayPush, setComplainArrayPush] = useState("");

  if (!id) {
    var handleSubmit = async (values) => {
      values["isCompleted"] = "Padding";
      values["partyCity"] = showPartyCity;
      values["engineerCity"] = showEngineerCity;
      values["createDateAt"] = moment(new Date()).format("YYYY-MM-DD");
      values["createTimeAt"] = moment(new Date()).format("HH:mm:ss");
      values["upadateAt"] = moment(new Date()).format("YYYY-MM-DD,HH:mm:ss");
      values["upadateDateAt"] = moment(new Date()).format("YYYY-MM-DD");
      values["upadateTimeAt"] = moment(new Date()).format("HH:mm:ss");
      values.details1 = complainArrayPush;
      const result = machineNumberAndPartyName.filter(
        (row) =>
          row.partyName === values.partyName &&
          row.machineNumber === values.machineNo
      );
      values["machineType"] = result[0]?.machineType;

      let response = await axios.post(
        "https://spr-cms-babe93641764.herokuapp.com/add-complaint/complaint_data",
        values
      );

      if (response.data.statusCode === 200) {
        setModalShowForPopupForm(false);
        getData();
        swal("", response.data.message, "success");
      } else if (response.data.statusCode === 404) {
        swal("", "Your AMC has Expired", "error");
      }
    };
  } else {
    handleSubmit = async (values) => {
      console.log(values, "valuse update");
      const result = machineNumberAndPartyName.filter(
        (row) =>
          row.partyName === values.partyName &&
          row.machineNumber === values.machineNo
      );
      values["machineType"] = result[0]?.machineType;
      // upadateAt
      values["partyCity"] = showPartyCity;
      values["engineerCity"] = showEngineerCity;
      values["upadateDateAt"] = moment(new Date()).format("YYYY-MM-DD");
      values["upadateTimeAt"] = moment(new Date()).format("HH:mm:ss");
      values.details1 = complainArrayPush;
      // if (values.details.includes("Others")) {
      //   values.details.push(complainArrayPush);
      // }

      let response = await axios.put(
        "https://spr-cms-babe93641764.herokuapp.com/add-complaint/complaint_data/" + id,
        values
      );
      console.log(response, "resule");
      if (response.data.statusCode === 200) {
        setModalShowForPopupForm(false);
        getData();
        swal("", response.data.message, "success");
      }
    };
  }

  //    // "add fom logic"
  let [editData, setEditData] = React.useState({});

  //   auto form fill up in edit
  let seletedEditData = async (datas) => {
    setModalShowForPopupForm(true);
    setId(datas._id);
    setEditData(datas);
  };
  let [ComplaintFormik, setComplaintFormik] = React.useState({});
  const FormikValues = () => {
    const formik = useFormikContext();
    React.useEffect(() => {
      setComplaintFormik(formik.values);
    }, [formik.values]);
    return null;
  };

  //   party Data
  let [partyData, setPartyData] = useState([]);
  let getPartyData = async () => {
    let response = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/party/party_name",
      {
        partyCity: localStorage.getItem("city"),
      }
    );
    setPartyData(response.data.data);
  };
  React.useEffect(() => {
    getPartyData();
  }, []);
  // find the party machine type
  let [findPartyMAchineType, setFindPartyMachineType] = useState([]);

  let getFindPartyMAchineType = async () => {
    if (ComplaintFormik.partyName) {
      let res = await axios.post(
        "https://spr-cms-babe93641764.herokuapp.com/machine/party_machine_type_vice_details",
        {
          partyName: ComplaintFormik.partyName,
        }
      );
      setFindPartyMachineType(res.data.data);
    }
  };
  React.useEffect(() => {
    getFindPartyMAchineType();
  }, [ComplaintFormik.partyName]);

  //find the machineNo
  // let [machineNo, setMachineNo] = React.useState([]);
  // var getMachineNData = async () => {
  //   if (ComplaintFormik.partyName) {
  //     let response = await axios.get(
  //       "https://spr-cms-babe93641764.herokuapp.com/machine/find_machine_no/" +
  //         ComplaintFormik.partyName
  //     );
  //     setMachineNo(response.data.data);
  //   }
  // };
  // React.useEffect(() => {
  //   getMachineNData();
  // }, [ComplaintFormik.partyName]);

  let [findSelectMachineProblems, setFindSelectMachineProblems] = useState([]);

  var getFindSelectMachineProblems = async () => {
    let response = await axios.get(
      "https://spr-cms-babe93641764.herokuapp.com/machihne-problems/find_complaint_machinetype/" +
        ComplaintFormik.machineType
    );
    setFindSelectMachineProblems(response?.data.data);
  };
  React.useEffect(() => {
    getFindSelectMachineProblems();
  }, [ComplaintFormik.machineType]);

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
  }, []);

  // const [data, setData] = useState({
  //   engineerName: "",
  //   partyName: "",
  //   isCompleted: "",
  //   startingDate: "",
  //   endingDate: "",
  // });
  // const updateInputs = (e) => {
  //   let name = e.target.name;
  //   let value = e.target.value;
  //   setData((preVal) => {
  //     return {
  //       ...preVal,
  //       [name]: value,
  //     };
  //   });
  //   // filterDate();
  // };

  // var filterDate = async () => {
  //   let response = await axios.post(
  //     "https://spr-cms-babe93641764.herokuapp.com/add-complaint/find_eng/",
  //     {
  //       engineerName: data.engineerName,
  //       partyName: data.partyName,
  //       isCompleted: data.isCompleted,
  //       startingDate: data.startingDate,
  //       endingDate: data.endingDate,
  //     }
  //   );
  //   if (response.data.statusCode === 200) {
  //     setComplaintData(response.data.findByDateInComplainData);
  //   }
  // };
  // React.useEffect(() => {
  //   filterDate();
  // }, [data]);

  // Find PartyCity Filter
  let [showPartyCity, setShowPartyCity] = useState();
  React.useEffect(() => {
    const resultas = partyData?.filter(
      (row) => row.partyName === ComplaintFormik.partyName
    );
    setShowPartyCity(
      resultas && resultas.length && resultas[0] && resultas[0]?.partyCity
        ? resultas[0]?.partyCity
        : ""
    );
  }, [ComplaintFormik.partyName]);

  // Find EngineerCity Filter
  let [showEngineerCity, setShowEngineerCity] = useState();

  React.useEffect(() => {
    const engResulte = engineerData?.filter(
      (row) => row.name == ComplaintFormik.engineerName
    );
    setShowEngineerCity(
      engResulte &&
        engResulte.length &&
        engResulte[0] &&
        engResulte[0]?.engineerCity
        ? engResulte[0]?.engineerCity
        : ""
    );
  }, [ComplaintFormik.engineerName]);

  //find the machineNo
  let [machineNumbers, setMachineNumbers] = React.useState([]);
  var getMachinetypeWiseNumberData = async () => {
    if (ComplaintFormik.machineType) {
      let response = await axios.post(
        "https://spr-cms-babe93641764.herokuapp.com/machine/find_machine_number/",
        {
          partyName: ComplaintFormik.partyName,
          machineType: ComplaintFormik.machineType,
        }
      );
      setMachineNumbers(response.data.data);
    }
  };
  React.useEffect(() => {
    getMachinetypeWiseNumberData();
  }, [ComplaintFormik.partyName, ComplaintFormik.machineType]);

  return (
    <>
      <UserSidebar getData={getData} />
      <Box sx={{ width: "100%", pb: "2%", pl: "2%", pr: "2%" }}>
        {/* <div className="d-flex flex-row justify-content-end mb-2">
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
            Add Complaint
          </Button>
        </div> */}
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
                Review Complaint
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
                                selected.length < reviewComplain.length
                              }
                              checked={
                                reviewComplain.length > 0 &&
                                selected.length === reviewComplain.length
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reviewComplain?.map((row, index) => {
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
                        getData={getData}
                        setModalShowForPopupForm={setModalShowForPopupForm}
                        setEditData={setEditData}
                        setId={setId}
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
        maxWidth="md"
        open={modalShowForPopupForm}
        onClose={() => setModalShowForPopupForm(false)}
      >
        <DialogTitle>{"Complaint Form"}</DialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              partyName:
                editData && editData.partyName ? editData.partyName : "",
              machineType:
                editData && editData.machineType
                  ? editData.machineType
                  : localStorage.getItem("machine") === "All"
                  ? ""
                  : localStorage.getItem("machine"),
              machineNo:
                editData && editData.machineNo ? editData.machineNo : "",
              details: editData && editData.details ? editData.details : [],
              details1: editData && editData.details1 ? editData.details1 : "",
              callBy: editData && editData.callBy ? editData.callBy : "",
              logBy: editData && editData.logBy ? editData.logBy : "",
              engineerName:
                editData && editData.engineerName ? editData.engineerName : "",
              supportEngineerName1:
                editData && editData.supportEngineerName1
                  ? editData.supportEngineerName1
                  : "",
              supportEngineerName2:
                editData && editData.supportEngineerName2
                  ? editData.supportEngineerName2
                  : "",
              supportEngineerName3:
                editData && editData.supportEngineerName3
                  ? editData.supportEngineerName3
                  : "",
            }}
            validationSchema={Yup.object().shape({
              partyName: Yup.string().required("Please Required this Field"),
              machineType: Yup.string().required("Please Required this Field"),
              machineNo: Yup.string().required("Please Required this Field"),
              details: Yup.array(),
              details1: Yup.string(),
              callBy: Yup.string().required("Please Required this Field"),
              logBy: Yup.string().required("Please Required this Field"),
              engineerName: Yup.string().required("Please Required this Field"),
              supportEngineerName1: Yup.string(),
              supportEngineerName2: Yup.string(),
              supportEngineerName3: Yup.string(),
            })}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm(values);
            }}
          >
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <Form>
                <FormikValues />
                <div className="form-warap">
                  <div>
                    <div className="mt-2 mb-4">
                      <FormControl fullWidth>
                        <InputLabel
                          size="small"
                          error={touched.partyName && errors.partyName}
                        >
                          Select Party Name *
                        </InputLabel>
                        <Select
                          size="small"
                          select
                          label="Select Party Name *"
                          name="partyName"
                          value={values.partyName}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={{
                            style: {
                              maxHeight: 210,
                            },
                          }}
                          error={touched.partyName && errors.partyName}
                        >
                          <MenuItem>Select PartyName</MenuItem>
                          {partyData?.map((option, index) => (
                            <MenuItem key={index} value={option.partyName}>
                              {option.partyName}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.partyName && errors.partyName ? (
                          <div className="text-danger field-error">
                            {errors.partyName}
                          </div>
                        ) : null}
                      </FormControl>
                    </div>

                    <div className="mt-2 mb-4">
                      <FormControl fullWidth>
                        <InputLabel size="small">
                          Select Machine Type *
                        </InputLabel>
                        <Select
                          size="small"
                          select
                          fullWidth
                          label="Select Machine Type *"
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
                          {findPartyMAchineType?.map((option, index) => (
                            <MenuItem key={index} value={option.machineType}>
                              {option.machineType}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.machineType && errors.machineType ? (
                          <div className="text-danger field-error">
                            {errors.machineType}
                          </div>
                        ) : null}
                      </FormControl>
                    </div>

                    <div className="mt-2 mb-4">
                      <FormControl fullWidth>
                        <InputLabel size="small">
                          Select Machine No *
                        </InputLabel>
                        <Select
                          size="small"
                          select
                          fullWidth
                          label="Select Machine No *"
                          name="machineNo"
                          value={values.machineNo}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={{
                            style: {
                              maxHeight: 210,
                            },
                          }}
                        >
                          {machineNumbers?.map((option, index) => (
                            <MenuItem key={index} value={option.machineNumber}>
                              {option.machineNumber}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.machineNo && errors.machineNo ? (
                          <div className="text-danger field-error">
                            {errors.machineNo}
                          </div>
                        ) : null}
                      </FormControl>
                    </div>

                    <div className="mt-2 mb-4">
                      <FormControl fullWidth>
                        <InputLabel size="small">Select Problem</InputLabel>
                        <Select
                          multiple
                          size="small"
                          name="details"
                          value={values.details}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          input={<OutlinedInput label="Machine Type" />}
                          renderValue={(selected) => selected?.join(", ")}
                          MenuProps={MenuProps}
                        >
                          <MenuItem>Select Complain</MenuItem>
                          {findSelectMachineProblems?.machineProblems?.map(
                            ({ machineProblem }) => (
                              <MenuItem
                                key={machineProblem}
                                value={machineProblem}
                              >
                                <Checkbox
                                  checked={
                                    values.details.indexOf(machineProblem) > -1
                                  }
                                />
                                <ListItemText primary={machineProblem} />
                              </MenuItem>
                            )
                          )}
                          <MenuItem value="Others">Others</MenuItem>
                        </Select>
                      </FormControl>
                    </div>

                    {values.details.includes("Others") ? (
                      <div className="mb-4">
                        <TextareaAutosize
                          fullWidth
                          className="text-area-max_height"
                          aria-label="minimum height"
                          size="small"
                          label="Complaint"
                          placeholder="Complaint *"
                          name="details1"
                          style={{ width: "100%" }}
                          value={complainArrayPush}
                          onChange={(e) => setComplainArrayPush(e.target.value)}
                        />
                      </div>
                    ) : null}

                    <div className="mb-4">
                      <TextField
                        type="text"
                        placeholder="Call By"
                        size="small"
                        label="Call By *"
                        name="callBy"
                        fullWidth
                        variant="outlined"
                        value={values.callBy}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.callBy && errors.callBy ? (
                        <div className="text-danger field-error">
                          {errors.callBy}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-4">
                      <TextField
                        type="text"
                        placeholder="Log By"
                        size="small"
                        label="Log By *"
                        name="logBy"
                        fullWidth
                        variant="outlined"
                        value={values.logBy}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      {touched.logBy && errors.logBy ? (
                        <div className="text-danger field-error">
                          {errors.logBy}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div>
                    <div className="mt-2 mb-4">
                      <FormControl fullWidth>
                        <InputLabel size="small">
                          Select Engineer Name *
                        </InputLabel>
                        <Select
                          size="small"
                          select
                          fullWidth
                          label="Select Engineer Name *"
                          name="engineerName"
                          value={values.engineerName}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={{
                            style: {
                              maxHeight: 210,
                            },
                          }}
                        >
                          {engineerData?.map((option, index) => (
                            <MenuItem key={index} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.engineerName && errors.engineerName ? (
                          <div className="text-danger field-error">
                            {errors.engineerName}
                          </div>
                        ) : null}
                      </FormControl>
                    </div>

                    {values.engineerName ? (
                      <div className="w-100 mt-4">
                        <TextField
                          fullWidth
                          size="small"
                          label="Engineer City"
                          name="name"
                          value={showEngineerCity}
                          disabled
                        />
                      </div>
                    ) : null}

                    {/* <div className="mt-2 mb-4">
                      <FormControl fullWidth>
                        <InputLabel size="small">
                          Support Engineer Name 1
                        </InputLabel>
                        <Select
                          size="small"
                          select
                          fullWidth
                          label="Support Engineer Name 1"
                          name="supportEngineerName1"
                          value={values.supportEngineerName1}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={{
                            style: {
                              maxHeight: 210,
                            },
                          }}
                        >
                          <MenuItem value="">
                            Select Support Engineer Name 1
                          </MenuItem>
                          {engineerData?.map((option, index) => (
                            <MenuItem key={index} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.supportEngineerName1 &&
                        errors.supportEngineerName1 ? (
                          <div className="text-danger field-error">
                            {errors.supportEngineerName1}
                          </div>
                        ) : null}
                      </FormControl>
                    </div> */}

                    {/* <div className="mt-2 mb-4">
                      <FormControl fullWidth>
                        <InputLabel size="small">
                          Support Engineer Name 2
                        </InputLabel>

                        <Select
                          size="small"
                          select
                          fullWidth
                          label="Support Engineer Name 2"
                          name="supportEngineerName2"
                          value={values.supportEngineerName2}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={{
                            style: {
                              maxHeight: 210,
                            },
                          }}
                        >
                          <MenuItem value="">
                            Select Support Engineer Name 2
                          </MenuItem>

                          {engineerData?.map((option, index) => (
                            <MenuItem key={index} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.supportEngineerName2 &&
                        errors.supportEngineerName2 ? (
                          <div className="text-danger field-error">
                            {errors.supportEngineerName2}
                          </div>
                        ) : null}
                      </FormControl>
                    </div> */}

                    {/* <div className="mt-2 mb-4">
                      <FormControl fullWidth>
                        <InputLabel size="small">
                          Support Engineer Name 3
                        </InputLabel>
                        <Select
                          size="small"
                          select
                          fullWidth
                          label="Support Engineer Name 3"
                          name="supportEngineerName3"
                          value={values.supportEngineerName3}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          MenuProps={{
                            style: {
                              maxHeight: 210,
                            },
                          }}
                        >
                          <MenuItem value="">
                            Select Support Engineer Name 3
                          </MenuItem>
                          {engineerData?.map((option, index) => (
                            <MenuItem key={index} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.supportEngineerName3 &&
                        errors.supportEngineerName3 ? (
                          <div className="text-danger field-error">
                            {errors.supportEngineerName3}
                          </div>
                        ) : null}
                      </FormControl>
                    </div> */}
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-end">
                  {!id ? (
                    <Button type="submit" variant="primary">
                      Add Complaint
                    </Button>
                  ) : (
                    <Button type="submit" variant="warning">
                      Update Complaint
                    </Button>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>

      {/* <div id="five-star-rating">
        <Rating
          onClick={handleRating}
          showTooltip
          tooltipArray={["Terrible", "Bad", "Average", "Great", "Prefect"]}
          fillColorArray={[
            "#f14f45",
            "#f16c45",
            "#f18845",
            "#f1b345",
            "#f1d045",
          ]}
          transition
        />
      </div> */}
    </>
  );
}
