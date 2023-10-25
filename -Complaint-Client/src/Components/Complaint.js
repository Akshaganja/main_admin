// import * as React from "react";
// import Box from "@mui/material/Box";
// import Collapse from "@mui/material/Collapse";
// import { alpha } from "@mui/material/styles";
// import IconButton from "@mui/material/IconButton";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import TablePagination from "@mui/material/TablePagination";
// import Typography from "@mui/material/Typography";
// import Paper from "@mui/material/Paper";
// import Toolbar from "@mui/material/Toolbar";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import UserSidebar from "./UserSidebar";
// import axios from "axios";
// import Checkbox from "@mui/material/Checkbox";
// import DeleteIcon from "@mui/icons-material/Delete";
// import EditIcon from "@mui/icons-material/Edit";
// import Tooltip from "@mui/material/Tooltip";
// import { useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import { useState } from "react";
// import TextField from "@mui/material/TextField";
// import swal from "sweetalert";
// import Dialog from "@mui/material/Dialog";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
// import MenuItem from "@mui/material/MenuItem";
// import moment from "moment";
// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import Cookies from "universal-cookie";
// import Ratings from "@mui/material/Rating";
// import ListItemText from "@mui/material/ListItemText";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import { RotatingLines } from "react-loader-spinner";
// import { Formik, Form, useFormikContext } from "formik";
// import * as Yup from "yup";

// import jwt_decode from "jwt-decode";
// const headCells = [
//   {
//     label: "#",
//   },
//   {
//     label: "Party Name",
//   },
//   {
//     label: "Machine No",
//   },
//   {
//     label: "call By",
//   },
//   {
//     label: "log By",
//   },
//   {
//     label: "Engineer Name",
//   },
//   {
//     label: "Status",
//   },
// ];

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function Row(props) {
//   const { row, handleClick, isItemSelected, labelId, seletedEditData } = props;
//   const [open, setOpen] = React.useState(false);

//   let cookies = new Cookies();
//   const [accessType, setAccessType] = useState(null);

//   React.useEffect(() => {
//     const jwt = jwt_decode(cookies.get("token"));
//     setAccessType(jwt.accessType);
//   }, []);

//   return (
//     <React.Fragment>
//       <TableRow
//         hover
//         onClick={(event) => handleClick(event, row._id)}
//         role="checkbox"
//         aria-checked={isItemSelected}
//         tabIndex={-1}
//         key={row._id}
//         selected={isItemSelected}
//       >
//         <TableCell align="center">
//           <IconButton
//             aria-label="expand row"
//             size="small"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>

//         {accessType &&
//           (() => {
//             if (!accessType.includes("Allow To Delete")) {
//               return null;
//             }
//             return (
//               <TableCell align="center" padding="checkbox">
//                 <Checkbox
//                   color="primary"
//                   checked={isItemSelected}
//                   inputProps={{
//                     "aria-labelledby": labelId,
//                   }}
//                 />
//               </TableCell>
//             );
//           })()}

//         <TableCell align="center">{row.cmp_id}</TableCell>
//         <TableCell align="center">{row.partyName}</TableCell>
//         <TableCell align="center">{row.machineNo}</TableCell>
//         <TableCell align="center">{row.callBy}</TableCell>
//         <TableCell align="center">{row.logBy}</TableCell>
//         <TableCell align="center">{row.engineerName}</TableCell>
//         <TableCell align="center">
//           {row.isCompleted === "Padding" ? "Padding" : null}
//           {row.isCompleted === "Completed" ? "Completed" : null}
//           {row.isCompleted === "Review" ? "Review" : null}
//         </TableCell>

//         {accessType &&
//           (() => {
//             if (!accessType.includes("Allow To Edit")) {
//               return null;
//             }
//             return (
//               <TableCell align="center">
//                 <button
//                   className="btn btn-default"
//                   onClick={() => seletedEditData(row)}
//                 >
//                   <EditIcon />
//                 </button>
//               </TableCell>
//             );
//           })()}
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box sx={{ margin: 2 }}>
//               <Typography
//                 variant="h6"
//                 gutterBottom
//                 component="div"
//                 sx={{ paddingLeft: 15 }}
//               >
//                 Other Data :
//               </Typography>
//               <div className="d-flex flex-row flex-wrap justify-content-around gap-2">
//                 <div>
//                   <Typography variant="p" gutterBottom component="div">
//                     <span className="fw-bold">Machine Type : </span>
//                     {row.machineType}
//                   </Typography>

//                   <Typography variant="p" gutterBottom component="div">
//                     <span className="fw-bold">Admin : </span>
//                     {row.isAdmin ? "YES" : "NO"}
//                   </Typography>
//                   <Typography variant="p" gutterBottom component="div">
//                     <span className="fw-bold">Repeat Complaint No : </span>
//                     {row.repeatComplaintNumber}
//                   </Typography>

//                   <Typography variant="p" gutterBottom component="div">
//                     <span className="fw-bold">Create At : </span>
//                     {moment(row.createDateAt).format("DD/MM/YYYY")},{" "}
//                     {row.createTimeAt}
//                   </Typography>

//                   <Typography variant="p" gutterBottom component="div">
//                     <span className="fw-bold">Upadate At : </span>
//                     {moment(row.upadateDateAt).format("DD/MM/YYYY")},
//                     {row.upadateTimeAt}
//                   </Typography>
//                 </div>
//                 <div>
//                   <Typography variant="p" gutterBottom component="div">
//                     <span className="fw-bold">Start Time : </span>
//                     {row.startTime}
//                   </Typography>
//                   <Typography variant="p" gutterBottom component="div">
//                     <span className="fw-bold">Solution : </span> {row.solution}
//                   </Typography>
//                   {/* endTime */}
//                   <Typography variant="p" gutterBottom component="div">
//                     <span className="fw-bold">End Time : </span> {row.endTime}
//                   </Typography>
//                   <Typography
//                     variant="p"
//                     gutterBottom
//                     component="div"
//                     className="d-flex justify-content-start align-items-center gap-1"
//                   >
//                     <span className="fw-bold"> Rating : </span>
//                     <Ratings value={row.rating} readOnly />
//                   </Typography>
//                 </div>
//                 <div>
//                   <Typography
//                     variant="p"
//                     gutterBottom
//                     component="div"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => {
//                       window.open(
//                         "https://maps.google.com?q=" +
//                           row.startComplaintLocation?.longitude +
//                           "," +
//                           row.startComplaintLocation?.latitude
//                       );
//                     }}
//                   >
//                     <span className="fw-bold">Start Time Address : </span>
//                     {row.startComplaintLocation?.address}
//                   </Typography>
//                   <Typography
//                     variant="p"
//                     gutterBottom
//                     component="div"
//                     style={{ cursor: "pointer" }}
//                     onClick={() => {
//                       window.open(
//                         "https://maps.google.com?q=" +
//                           row.endComplaintLocation?.longitude +
//                           "," +
//                           row.endComplaintLocation?.latitude
//                       );
//                     }}
//                   >
//                     <span className="fw-bold">End Time Address : </span>
//                     {row.endComplaintLocation?.address}
//                   </Typography>
//                 </div>
//                 <div>
//                   <Typography variant="p" gutterBottom component="div">
//                     <span className="fw-bold">Complain:</span>
//                     <div className="row">
//                       {/* {row?.details} */}
//                       {row?.details?.map((comp, id) => {
//                         return (
//                           <div>
//                             {id + 1}. {comp}
//                           </div>
//                         );
//                       })}
//                     </div>
//                     <p className="col">{row.details1}</p>
//                   </Typography>
//                 </div>
//               </div>
//               {row.anaysisCompaint.length > 0 ? (
//                 <div style={{ paddingLeft: "100px", margin: "10px" }}>
//                   <div>
//                     <h5>Support Engineer :</h5>
//                   </div>
//                   <Table aria-label="collapsible table">
//                     <TableHead>
//                       <TableRow>
//                         <TableCell className="fw-bold" align="center">
//                           Id
//                         </TableCell>
//                         <TableCell className="fw-bold" align="center">
//                           Support Eng Name
//                         </TableCell>
//                         <TableCell className="fw-bold" align="center">
//                           StartTime
//                         </TableCell>
//                         <TableCell className="fw-bold" align="center">
//                           EndTime
//                         </TableCell>
//                         <TableCell className="fw-bold" align="center">
//                           Solution
//                         </TableCell>
//                         <TableCell className="fw-bold" align="center">
//                           Support EngName CreateDate
//                         </TableCell>
//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {row?.anaysisCompaint?.map((e, i) => {
//                         return (
//                           <TableRow key={i}>
//                             <TableCell align="center">{e.anaId}</TableCell>
//                             <TableCell align="center">
//                               {e.supportEngName}
//                             </TableCell>
//                             <TableCell align="center">{e.startTime}</TableCell>
//                             <TableCell align="center">{e.endTime}</TableCell>
//                             <TableCell align="center">{e.solution}</TableCell>
//                             <TableCell align="center">
//                               {e.supportEngNameCreateDate}
//                             </TableCell>
//                           </TableRow>
//                         );
//                       })}
//                     </TableBody>
//                   </Table>
//                 </div>
//               ) : null}
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }

// export default function Complaint() {
//   let navigate = useNavigate();
//   // auth post method  and chacked token or not
//   let cookies = new Cookies();

//   const [accessType, setAccessType] = useState(null);
//   React.useEffect(() => {
//     const jwt = jwt_decode(cookies.get("token"));
//     setAccessType(jwt.accessType);
//   }, []);

//   let chackAuth = async () => {
//     if (cookies.get("token")) {
//       if (accessType.includes("Complaint Page")) {
//         let config = {
//           headers: {
//             token: cookies.get("token"),
//           },
//         };
//         // auth post method
//         let res = await axios.post(
//           "https://spr-cms-babe93641764.herokuapp.com/register/auth",
//           { purpose: "validate access" },
//           config
//         );
//         if (res.data.statusCode !== 200) {
//           cookies.remove("token");
//           navigate("/login");
//         }
//       } else {
//         navigate("/error-page");
//       }
//     } else {
//       navigate("/login");
//     }
//   };

//   React.useEffect(() => {
//     chackAuth();
//   }, [cookies.get("token")]);

//   let [complaintData, setComplaintData] = useState([]);

//   let [countData, setCountData] = useState(0);
//   // pagination
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   let [loader, setLoader] = React.useState(true);
//   let getData = async () => {
//     let data = await axios.post(
//       "https://spr-cms-babe93641764.herokuapp.com/add-complaint/findby_machine_or_engineercity_pagination",
//       {
//         machineType: localStorage.getItem("machine"),
//         engineerCity: localStorage.getItem("city"),
//         pageSize: rowsPerPage,
//         pageNumber: page,
//       }
//     );
//     setLoader(false);
//     setCountData(data.data.complaintCount);
//     setComplaintData(data.data.data);
//   };

//   React.useEffect(() => {
//     getData();
//   }, [rowsPerPage, page]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const [selected, setSelected] = React.useState([]);

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = complaintData?.map((n) => n._id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, name) => {
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }

//     setSelected(newSelected);
//   };

//   const isSelected = (name) => selected.indexOf(name) !== -1;

//   // Delete selected
//   var handleDelete = () => {
//     swal("Are You Sure You Want TO Delete ?", {
//       buttons: ["No", "Yes"],
//     }).then(async (buttons) => {
//       if (buttons === true) {
//         axios
//           .post(
//             "https://spr-cms-babe93641764.herokuapp.com/add-complaint/delete_complaint_data",
//             selected
//           )
//           .then((response) => {
//             if (response.data.statusCode === 200) {
//               getData();
//               setSelected([]);
//               swal("", response.data.message, "success");
//             }
//           });
//       }
//     });
//   };

//   //
//   // Searchbar
//   let handleSearchData = async (values) => {
//     let res = await axios.post(
//       "https://spr-cms-babe93641764.herokuapp.com/add-complaint/search_complaint",
//       {
//         search: values,
//       }
//     );
//     if (res.data.statusCode === 200) {
//       if (values !== "") {
//         setComplaintData(res.data.data);
//       } else {
//         getData();
//       }
//     }
//   };

//   const [data, setData] = useState({
//     engineerName: "",
//     partyName: "",
//     isCompleted: "",
//     startingDate: "",
//     endingDate: "",
//   });

//   const updateInputs = (e) => {
//     let name = e.target.name;
//     let value = e.target.value;
//     setData((preVal) => {
//       return {
//         ...preVal,
//         [name]: value,
//       };
//     });
//   };

//   var filterDate = async () => {
//     let response = await axios.post(
//       "https://spr-cms-babe93641764.herokuapp.com/add-complaint/find_eng/",
//       {
//         engineerName: data.engineerName,
//         partyName: data.partyName,
//         isCompleted: data.isCompleted,
//         startingDate: data.startingDate,
//         endingDate: data.endingDate,
//       }
//     );
//     if (response.data.statusCode === 200) {
//       setComplaintData(response.data.findByDateInComplainData);
//     }
//   };
//   React.useEffect(() => {
//     if (data) {
//       filterDate();
//     }
//   }, [data]);

//   //   engineer name
//   let [machineNumberAndPartyName, setMachineNumberAndPartyName] = useState();
//   let getMachineNumberData = async () => {
//     let response = await axios.post(
//       "https://spr-cms-babe93641764.herokuapp.com/machine/machinetype_vice_data",
//       {
//         partyCity: localStorage.getItem("city"),
//         machineType: localStorage.getItem("machine"),
//       }
//     );
//     setMachineNumberAndPartyName(response.data.data);
//   };
//   React.useEffect(() => {
//     getMachineNumberData();
//   }, []);

//   //   edit Engineer here
//   let [modalShowForPopupForm, setModalShowForPopupForm] = React.useState(false);
//   let [id, setId] = React.useState();

//   if (!id) {
//     // var handleSubmit = async (values) => {

//     //   values["partyCity"] = showPartyCity;
//     //   values["engineerCity"] = showEngineerCity;
//     //   values["createDateAt"] = moment(new Date()).format("YYYY-MM-DD");
//     //   values["createTimeAt"] = moment(new Date()).format("HH:mm:ss");
//     //   let chackRepeat = await axios.post(
//     //     "https://spr-cms-babe93641764.herokuapp.com/add-complaint/check_complaint_repeat",
//     //     { partyName: values.partyName, machineNo: values.machineNo }
//     //   );
//     //   values["repeatComplaintNumber"] = chackRepeat.data.data;
//     //   let currentDate = moment(new Date()).format("YYYY-MM-DD");
//     //   const result = machineNumberAndPartyName.filter(
//     //     (row) =>
//     //       row.partyName === values.partyName &&
//     //       row.machineNumber === values.machineNo
//     //   );
//     //   values["machineType"] = result[0]?.machineType;

//     //   // var resultes = machineNumberAndPartyName.map((a) => a.extendAmcToDate);
//     //   // console.log(resultes);
//     //   if (
//     //     currentDate >= result[0]?.amcFromDate &&
//     //     currentDate <= result[0]?.amcToDate
//     //   ) {
//     //     // swal("", "Yes", "success");
//     //     let response = await axios.post(
//     //       "https://spr-cms-babe93641764.herokuapp.com/add-complaint/complaint_data",
//     //       values
//     //     );
//     //     if (response.data.statusCode === 200) {
//     //       setModalShowForPopupForm(false);
//     //       getData();
//     //       swal("", response.data.message, "success");
//     //     }
//     //   } else {
//     //     swal("", "Your AMC has Expired", "error");
//     //   }
//     // };

//     var handleSubmit = async (values) => {
//       values["isCompleted"] = "Padding";
//       values["partyCity"] = showPartyCity;
//       values["engineerCity"] = showEngineerCity;
//       values["isAdmin"] = true;
//       values["createDateAt"] = moment(new Date()).format("YYYY-MM-DD");
//       values["createTimeAt"] = moment(new Date()).format("HH:mm:ss");
//       values["upadateAt"] = moment(new Date()).format("YYYY-MM-DD,HH:mm:ss");
//       values["upadateDateAt"] = moment(new Date()).format("YYYY-MM-DD");
//       values["upadateTimeAt"] = moment(new Date()).format("HH:mm:ss");
//       values.details1 = complainArrayPush;

//       let response = await axios.post(
//         "https://spr-cms-babe93641764.herokuapp.com/add-complaint/complaint_data",
//         values
//       );
//       if (response.data.statusCode === 200) {
//         setModalShowForPopupForm(false);
//         getData();
//         swal("", response.data.message, "success");
//       } else if (response.data.statusCode === 404) {
//         swal("", "Your AMC has Expired", "error");
//       }
//     };
//   } else {
//     handleSubmit = async (values) => {
//       const result = machineNumberAndPartyName.filter(
//         (row) =>
//           row.partyName === values.partyName &&
//           row.machineNumber === values.machineNo
//       );
//       values["machineType"] = result[0]?.machineType;
//       // upadateAt
//       values["partyCity"] = showPartyCity;
//       values["engineerCity"] = showEngineerCity;
//       values["upadateDateAt"] = moment(new Date()).format("YYYY-MM-DD");
//       values["upadateTimeAt"] = moment(new Date()).format("HH:mm:ss");
//       values.details1 = complainArrayPush;

//       let response = await axios.put(
//         "https://spr-cms-babe93641764.herokuapp.com/add-complaint/complaint_data/" + id,
//         values
//       );

//       if (response.data.statusCode === 200) {
//         setModalShowForPopupForm(false);
//         getData();
//         swal("", response.data.message, "success");
//       }
//     };
//   }

//   // add fom logic
//   let [editData, setEditData] = React.useState({});

//   // auto form fill up in edit
//   let seletedEditData = async (datas) => {
//     setModalShowForPopupForm(true);
//     setId(datas._id);
//     setEditData(datas);
//     setComplainArrayPush(datas.details1);
//   };

//   let [ComplaintFormik, setComplaintFormik] = React.useState({});
//   const FormikValues = () => {
//     const formik = useFormikContext();
//     React.useEffect(() => {
//       setComplaintFormik(formik.values);
//     }, [formik.values]);
//     return null;
//   };

//   let [findSelectMachineProblems, setFindSelectMachineProblems] = useState([]);

//   var getFindSelectMachineProblems = async () => {
//     let response = await axios.get(
//       "https://spr-cms-babe93641764.herokuapp.com/machihne-problems/find_complaint_machinetype/" +
//         ComplaintFormik.machineType
//     );
//     setFindSelectMachineProblems(response?.data.data);
//   };

//   React.useEffect(() => {
//     getFindSelectMachineProblems();
//   }, [ComplaintFormik.machineType]);

//   //   party Data
//   let [partyData, setPartyData] = useState();
//   let getPartyData = async () => {
//     let response = await axios.post(
//       "https://spr-cms-babe93641764.herokuapp.com/party/party_name",
//       {
//         partyCity: localStorage.getItem("city"),
//       }
//     );
//     setPartyData(response.data.data);
//   };

//   React.useEffect(() => {
//     getPartyData();
//   }, []);

//   // find the party machine type
//   let [findPartyMAchineType, setFindPartyMachineType] = useState([]);

//   let getFindPartyMAchineType = async () => {
//     if (ComplaintFormik.partyName) {
//       let res = await axios.post(
//         "https://spr-cms-babe93641764.herokuapp.com/machine/party_machine_type_vice_details",
//         {
//           partyName: ComplaintFormik.partyName,
//         }
//       );
//       setFindPartyMachineType(res.data.data);
//     }
//   };
//   React.useEffect(() => {
//     getFindPartyMAchineType();
//   }, [ComplaintFormik.partyName]);

//   //find the machineNo
//   let [machineNumbers, setMachineNumbers] = React.useState([]);
//   var getMachinetypeWiseNumberData = async () => {
//     if (ComplaintFormik.machineType) {
//       let response = await axios.post(
//         "https://spr-cms-babe93641764.herokuapp.com/machine/find_machine_number/",
//         {
//           partyName: ComplaintFormik.partyName,
//           machineType: ComplaintFormik.machineType,
//         }
//       );
//       setMachineNumbers(response.data.data);
//     }
//   };
//   React.useEffect(() => {
//     getMachinetypeWiseNumberData();
//   }, [ComplaintFormik.partyName, ComplaintFormik.machineType]);

//   const [selectedMachineType, setSelectedMachineType] = useState("");
//   //   engineer name
//   let [engineerData, setEngineerData] = React.useState([]);
//   // let getEngineerData = async () => {
//   //   let response = await axios.post(
//   //     "https://spr-cms-babe93641764.herokuapp.com/eng/engineer_name",
//   //     {
//   //       engineerCity: localStorage.getItem("city"),
//   //       machineType: localStorage.getItem("machine"),
//   //     }
//   //   );
//   //   setEngineerData(response.data.data);
//   // };
//   // React.useEffect(() => {
//   //   getEngineerData();
//   // }, []);

//   const [selectedEngineer, setSelectedEngineer] = useState(null);

// // Define handleEngineerChange function
// const handleEngineerChange = (event) => {
//   setSelectedEngineer(event.target.value);
// };

//   const getEngineerData = async () => {
//     if (selectedMachineType) {
//       try {
//         const response = await axios.post(
//           "https://spr-cms-babe93641764.herokuapp.com/eng/engineer_name",
//           {
//             machineType: selectedMachineType,
//           }
//         );
//         setEngineerData(response.data.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   React.useEffect(() => {
//     getEngineerData();
//   }, [selectedMachineType]);

//   // Handle machine type selection
//   const handleMachineTypeChange = (event) => {
//     setSelectedMachineType(event.target.value);
//   };

//   // Find PartyCity Filter
//   let [showPartyCity, setShowPartyCity] = useState();
//   React.useEffect(() => {
//     const resultas = partyData?.filter(
//       (row) => row.partyName === ComplaintFormik.partyName
//     );
//     setShowPartyCity(
//       resultas && resultas.length && resultas[0] && resultas[0]?.partyCity
//         ? resultas[0]?.partyCity
//         : ""
//     );
//   }, [ComplaintFormik.partyName]);

//   // Find EngineerCity Filter
//   let [showEngineerCity, setShowEngineerCity] = useState();

//   React.useEffect(() => {
//     const engResulte = engineerData?.filter(
//       (row) => row.name == ComplaintFormik.engineerName
//     );
//     setShowEngineerCity(
//       engResulte &&
//         engResulte.length &&
//         engResulte[0] &&
//         engResulte[0]?.engineerCity
//         ? engResulte[0]?.engineerCity
//         : ""
//     );
//   }, [ComplaintFormik.engineerName]);

//   // ============================================
//   const [complainArrayPush, setComplainArrayPush] = useState("");

//   const [compIdData, setCompIdDate] = useState([]);

//   let getCompIdDate = async () => {
//     let res = await axios.post(
//       "https://spr-cms-babe93641764.herokuapp.com/analysis/anaysis_complaint_id",
//       {
//         machineType: localStorage.getItem("machine"),
//         engineerCity: localStorage.getItem("city"),
//       }
//     );
//     setCompIdDate(res.data.data);
//   };
//   React.useEffect(() => {
//     getCompIdDate();
//   }, []);

//   let [modelShowForAnaysis, setModelShowForAnaysis] = useState(false);

//   let handleSubmitAnaysis = async (values) => {
//     values["supportEngNameCreateDate"] = moment(new Date()).format(
//       "YYYY-MM-DD ,HH:mm:ss"
//     );

//     let response = await axios.put(
//       "https://spr-cms-babe93641764.herokuapp.com/analysis/anaysis_complaint/" +
//         values.compId.toString(),
//       values
//     );
//     console.log(response, "resule");
//     if (response.data.statusCode === 200) {
//       setModelShowForAnaysis(false);
//       getData();
//       swal("", response.data.message, "success");
//     }
//   };

//   return (
//     <>
//       <UserSidebar
//         getData={getData}
//         getPartyData={getPartyData}
//         // getEngineerData={getEngineerData}
//       />
//       <Box sx={{ width: "100%", pb: "2%", pl: "2%", pr: "2%" }}>
//         {accessType &&
//           (() => {
//             if (!accessType.includes("Add Complaint")) {
//               return null;
//             }
//             return (
//               <div className="d-flex flex-row justify-content-end gap-2 mb-2">
//                 <Button
//                   className="text-capitalize"
//                   size="small"
//                   onClick={() => {
//                     setModalShowForPopupForm(true);
//                     setId(null);
//                     setEditData({});
//                   }}
//                   style={{ backgroundColor: "rgb(11, 11, 59) " }}
//                 >
//                   Add Complaint
//                 </Button>

//                 <Button
//                   className="text-capitalize"
//                   size="small"
//                   onClick={() => {
//                     setModelShowForAnaysis(true);
//                   }}
//                   style={{ backgroundColor: "rgb(11, 11, 59) " }}
//                 >
//                   Add Analysis
//                 </Button>
//               </div>
//             );
//           })()}
//         <div className="filter-containt">
//           {/* Engineer Name Filter*/}

//           <FormControl sx={{ minWidth: 120 }} size="small">
//             <InputLabel>Eng Name</InputLabel>
//             <Select
//               label="Eng Name"
//               name="engineerName"
//               value={data?.engineerName}
//               onChange={updateInputs}
//               MenuProps={{
//                 style: {
//                   maxHeight: 210,
//                 },
//               }}
//             >
//               {engineerData?.map((e, i) => {
//                 return (
//                   <MenuItem key={i} value={e.name}>
//                     {e.name}
//                   </MenuItem>
//                 );
//               })}
//             </Select>
//           </FormControl>
//           {/* Party Name Fillter */}

//           <FormControl sx={{ minWidth: 130 }} size="small">
//             <InputLabel>Party Name</InputLabel>

//             <Select
//               id="demo-simple-select"
//               value={data?.partyName}
//               label="Party Name"
//               name="partyName"
//               onChange={(e) => updateInputs(e)}
//               MenuProps={{
//                 style: {
//                   maxHeight: 210,
//                 },
//               }}
//             >
//               {partyData?.map((e, i) => {
//                 return (
//                   <MenuItem value={e.partyName} key={i}>
//                     {e.partyName}
//                   </MenuItem>
//                 );
//               })}
//             </Select>
//           </FormControl>
//           {/* Is Completed  Complaint*/}

//           <FormControl sx={{ minWidth: 120 }} size="small">
//             <InputLabel id="demo-simple-select-label">Status</InputLabel>

//             <Select
//               labelId="demo-simple-select-label"
//               label="Status"
//               name="isCompleted"
//               onChange={updateInputs}
//             >
//               <MenuItem value={""}>Select an option</MenuItem>
//               <MenuItem value={"Padding"}>Pending</MenuItem>
//               <MenuItem value={"Completed"}>Complete</MenuItem>
//               <MenuItem value={"Review"}>Review</MenuItem>
//             </Select>
//           </FormControl>
//           {/* Starting Date */}

//           <TextField
//             value={data.startingDate}
//             type="date"
//             size="small"
//             label="Starting Date"
//             name="startingDate"
//             onChange={updateInputs}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           {/* <div>to</div> */}
//           {/* Ending Date */}

//           <TextField
//             value={data.endingDate}
//             type="date"
//             size="small"
//             name="endingDate"
//             label="Ending Date"
//             onChange={updateInputs}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//           {/* All */}

//           <Button
//             onClick={() => {
//               getData();
//               setData({
//                 engineerName: "",
//                 partyName: "",
//                 isCompleted: "",
//                 startingDate: "",
//                 endingDate: "",
//               });
//             }}
//           >
//             All
//           </Button>
//         </div>

//         <Paper sx={{ width: "100%" }}>
//           <Toolbar
//             className="border-top border-bottom"
//             sx={{
//               pl: { sm: 2 },
//               pr: { xs: 1, sm: 1 },
//               ...(selected.length > 0 && {
//                 bgcolor: (theme) =>
//                   alpha(
//                     theme.palette.primary.main,
//                     theme.palette.action.activatedOpacity
//                   ),
//               }),
//             }}
//           >
//             {selected.length > 0 ? (
//               <Typography
//                 sx={{ flex: "1 1 100%" }}
//                 color="inherit"
//                 variant="subtitle1"
//                 component="div"
//               >
//                 {selected.length} selected
//               </Typography>
//             ) : (
//               <Typography
//                 sx={{ flex: "1 1 100%" }}
//                 variant="h6"
//                 id="tableTitle"
//                 component="div"
//               >
//                 All Complaint
//               </Typography>
//             )}
//             <form className="form-inline">
//               <input
//                 id="serchbar-size"
//                 className="form-control mr-sm-2"
//                 type="search"
//                 onChange={(e) => handleSearchData(e.target.value)}
//                 placeholder="Search"
//                 aria-label="Search"
//               />
//             </form>
//             {selected.length > 0 ? (
//               <Tooltip title="Delete">
//                 <IconButton onClick={() => handleDelete()}>
//                   <DeleteIcon />
//                 </IconButton>
//               </Tooltip>
//             ) : null}
//           </Toolbar>
//           {loader ? (
//             <div className="d-flex flex-direction-row justify-content-center align-items-center p-5 m-5">
//               <RotatingLines
//                 strokeColor="grey"
//                 strokeWidth="5"
//                 animationDuration="0.75"
//                 width="50"
//                 visible={loader}
//               />
//             </div>
//           ) : (
//             <TableContainer>
//               <Table aria-label="collapsible table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell align="center"></TableCell>

//                     {accessType &&
//                       (() => {
//                         if (!accessType.includes("Allow To Delete")) {
//                           return null;
//                         }
//                         return (
//                           <TableCell align="center" padding="checkbox">
//                             <Checkbox
//                               color="primary"
//                               indeterminate={
//                                 selected.length > 0 &&
//                                 selected.length < complaintData?.length
//                               }
//                               checked={
//                                 complaintData?.length > 0 &&
//                                 selected.length === complaintData?.length
//                               }
//                               onChange={handleSelectAllClick}
//                               inputProps={{
//                                 "aria-label": "select all desserts",
//                               }}
//                             />
//                           </TableCell>
//                         );
//                       })()}

//                     {headCells.map((headCell, id) => {
//                       return (
//                         <TableCell key={id} className="fw-bold" align="center">
//                           {headCell.label}
//                         </TableCell>
//                       );
//                     })}

//                     {accessType &&
//                       (() => {
//                         if (!accessType.includes("Allow To Edit")) {
//                           return null;
//                         }
//                         return (
//                           <TableCell className="fw-bold" align="center">
//                             Action
//                           </TableCell>
//                         );
//                       })()}
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {complaintData?.map((row, index) => {
//                     const isItemSelected = isSelected(row._id);
//                     const labelId = `enhanced-table-checkbox-${index}`;
//                     return (
//                       <Row
//                         key={row.name}
//                         row={row}
//                         isItemSelected={isItemSelected}
//                         labelId={labelId}
//                         handleClick={handleClick}
//                         selected={selected}
//                         index={index}
//                         seletedEditData={seletedEditData}
//                       />
//                     );
//                   })}
//                 </TableBody>
//               </Table>
//               <TablePagination
//                 rowsPerPageOptions={[10, 25, 100]}
//                 component="div"
//                 count={countData}
//                 rowsPerPage={rowsPerPage}
//                 page={page}
//                 onPageChange={handleChangePage}
//                 onRowsPerPageChange={handleChangeRowsPerPage}
//               />
//             </TableContainer>
//           )}
//         </Paper>
//       </Box>
//       <Dialog
//         fullWidth
//         maxWidth="md"
//         open={modalShowForPopupForm}
//         onClose={() => setModalShowForPopupForm(false)}
//         aria-describedby="alert-dialog-slide-description"
//       >
//         <DialogTitle>{"Complaint Form"}</DialogTitle>
//         <DialogContent dividers>
//           <Formik
//             initialValues={{
//               partyName:
//                 editData && editData.partyName ? editData.partyName : "",
//               machineType:
//                 editData && editData.machineType
//                   ? editData.machineType
//                   : localStorage.getItem("machine") === "All"
//                   ? ""
//                   : localStorage.getItem("machine"),
//               machineNo:
//                 editData && editData.machineNo ? editData.machineNo : "",
//               details: editData && editData.details ? editData.details : [],
//               details1: editData && editData.details1 ? editData.details1 : "",
//               callBy: editData && editData.callBy ? editData.callBy : "",
//               logBy: editData && editData.logBy ? editData.logBy : "",
//               engineerName:
//                 editData && editData.engineerName ? editData.engineerName : "",
//             }}
//             validationSchema={Yup.object().shape({
//               partyName: Yup.string().required("Please Required this Field"),
//               machineType: Yup.string().required("Please Required this Field"),
//               machineNo: Yup.string().required("Please Required this Field"),
//               details: Yup.array(),
//               details1: Yup.string(),
//               callBy: Yup.string().required("Please Required this Field"),
//               logBy: Yup.string().required("Please Required this Field"),
//               engineerName: Yup.string().required("Please Required this Field"),
//             })}
//             onSubmit={(values, { resetForm }) => {
//               handleSubmit(values);
//               resetForm(values);
//             }}
//           >
//             {({ values, errors, touched, handleBlur, handleChange }) => (
//               <Form>
//                 <FormikValues />
//                 <div className="form-warap">
//                   <div>
//                     <div className="mt-2 mb-4">
//                       <FormControl fullWidth>
//                         <InputLabel size="small">
//                           Select Party Name *
//                         </InputLabel>
//                         <Select
//                           size="small"
//                           select
//                           label="Select Party Name *"
//                           name="partyName"
//                           value={values.partyName}
//                           onBlur={handleBlur}
//                           onChange={handleChange}
//                         >
//                           <MenuItem>Select PartyName</MenuItem>
//                           {partyData?.map((option, index) => (
//                             <MenuItem key={index} value={option.partyName}>
//                               {option.partyName}
//                             </MenuItem>
//                           ))}
//                         </Select>
//                       </FormControl>
//                       {touched.partyName && errors.partyName ? (
//                         <div className="text-danger field-error">
//                           {errors.partyName}
//                         </div>
//                       ) : null}
//                     </div>

//                     <div className="mt-2 mb-4">
//                       <FormControl fullWidth>
//                         <InputLabel size="small">
//                           Select Machine Type *
//                         </InputLabel>
//                         {/* <Select
//                           size="small"
//                           select
//                           fullWidth
//                           label="Select Machine Type *"
//                           name="machineType"
//                           value={values.machineType}
//                           onBlur={handleBlur}
//                           onChange={handleChange}
//                           MenuProps={{
//                             style: {
//                               maxHeight: 210,
//                             },
//                           }}
//                         > */}
//                         <Select
//                           value={selectedMachineType}
//                           onChange={handleMachineTypeChange}
//                           label="Select Machine Type *"
//                           fullWidth
//                         >
//                           {findPartyMAchineType?.map((option, index) => (
//                             <MenuItem key={index} value={option.machineType}>
//                               {option.machineType}
//                             </MenuItem>
//                           ))}
//                         </Select>
//                         {touched.machineType && errors.machineType ? (
//                           <div className="text-danger field-error">
//                             {errors.machineType}
//                           </div>
//                         ) : null}
//                       </FormControl>
//                     </div>

//                     <div className="mt-2 mb-4">
//                       <FormControl fullWidth>
//                         <InputLabel size="small">
//                           Select Machine No *
//                         </InputLabel>
//                         <Select
//                           size="small"
//                           select
//                           fullWidth
//                           label="Select Machine No *"
//                           name="machineNo"
//                           value={values.machineNo}
//                           onBlur={handleBlur}
//                           onChange={handleChange}
//                           MenuProps={{
//                             style: {
//                               maxHeight: 210,
//                             },
//                           }}
//                         >
//                           {machineNumbers?.map((option, index) => (
//                             <MenuItem key={index} value={option.machineNumber}>
//                               {option.machineNumber}
//                             </MenuItem>
//                           ))}
//                         </Select>
//                         {touched.machineNo && errors.machineNo ? (
//                           <div className="text-danger field-error">
//                             {errors.machineNo}
//                           </div>
//                         ) : null}
//                       </FormControl>
//                     </div>

//                     <div className="mt-2 mb-4">
//                       <FormControl fullWidth>
//                         <InputLabel size="small">Select Problem</InputLabel>
//                         <Select
//                           multiple
//                           size="small"
//                           name="details"
//                           value={values.details}
//                           onChange={handleChange}
//                           onBlur={handleBlur}
//                           input={<OutlinedInput label="Machine Type" />}
//                           renderValue={(selected) => selected?.join(", ")}
//                           MenuProps={MenuProps}
//                         >
//                           <MenuItem>Select Complain</MenuItem>
//                           {findSelectMachineProblems?.machineProblems?.map(
//                             ({ machineProblem }) => (
//                               <MenuItem
//                                 key={machineProblem}
//                                 value={machineProblem}
//                               >
//                                 <Checkbox
//                                   checked={
//                                     values.details.indexOf(machineProblem) > -1
//                                   }
//                                 />
//                                 <ListItemText primary={machineProblem} />
//                               </MenuItem>
//                             )
//                           )}
//                           <MenuItem value="Others">Others</MenuItem>
//                         </Select>
//                       </FormControl>
//                     </div>

//                     {values.details.includes("Others") ? (
//                       <div className="mb-4">
//                         <TextareaAutosize
//                           fullWidth
//                           className="text-area-max_height"
//                           aria-label="minimum height"
//                           size="small"
//                           label="Complaint"
//                           placeholder="Complaint *"
//                           name="details1"
//                           style={{ width: "100%" }}
//                           value={complainArrayPush}
//                           onChange={(e) => setComplainArrayPush(e.target.value)}
//                         />
//                       </div>
//                     ) : null}

//                     <div className="mb-4">
//                       <TextField
//                         type="text"
//                         placeholder="Call By"
//                         size="small"
//                         label="Call By *"
//                         name="callBy"
//                         fullWidth
//                         value={values.callBy}
//                         onBlur={handleBlur}
//                         onChange={handleChange}
//                       />
//                       {touched.callBy && errors.callBy ? (
//                         <div className="text-danger field-error">
//                           {errors.callBy}
//                         </div>
//                       ) : null}
//                     </div>
//                     <div className="mb-4">
//                       <TextField
//                         type="text"
//                         placeholder="Log By"
//                         size="small"
//                         label="Log By *"
//                         name="logBy"
//                         fullWidth
//                         value={values.logBy}
//                         onBlur={handleBlur}
//                         onChange={handleChange}
//                       />
//                       {touched.logBy && errors.logBy ? (
//                         <div className="text-danger field-error">
//                           {errors.logBy}
//                         </div>
//                       ) : null}
//                     </div>
//                   </div>
//                   <div>
//                     <div className="mt-2 mb-4">
//                       <FormControl fullWidth>
//                         <InputLabel size="small">
//                           Select Engineer Name *
//                         </InputLabel>
//                         {/* <Select
//                           size="small"
//                           select
//                           fullWidth
//                           label="Select Engineer Name *"
//                           name="engineerName"
//                           value={values.engineerName}
//                           onBlur={handleBlur}
//                           onChange={handleChange}
//                           MenuProps={{
//                             style: {
//                               maxHeight: 210,
//                             },
//                           }}
//                         >
//                           {engineerData?.map((option, index) => (
//                             <MenuItem key={index} value={option.name}>
//                               {option.name}
//                             </MenuItem>
//                           ))}
//                         </Select> */}

//                         <Select
//                           value={selectedEngineer}
//                           onChange={handleEngineerChange}
//                           label="Select Engineer *"
//                           fullWidth
//                         >
//                           {engineerData.map((engineer) => (
//                             <MenuItem key={engineer.id} value={engineer.id}>
//                               {engineer.name}
//                             </MenuItem>
//                           ))}
//                         </Select>

//                         {touched.engineerName && errors.engineerName ? (
//                           <div className="text-danger field-error">
//                             {errors.engineerName}
//                           </div>
//                         ) : null}
//                       </FormControl>
//                     </div>

//                     {values.engineerName ? (
//                       <div className="w-100 mt-4">
//                         <TextField
//                           fullWidth
//                           size="small"
//                           id="outlined-select-currency"
//                           label="Engineer City"
//                           name="name"
//                           disabled
//                           value={showEngineerCity}
//                         />
//                       </div>
//                     ) : null}
//                   </div>
//                 </div>
//                 <div className="d-flex flex-row justify-content-end">
//                   {!id ? (
//                     <Button type="submit" variant="primary">
//                       Add Complaint
//                     </Button>
//                   ) : (
//                     <Button type="submit" variant="warning">
//                       Update Complaint
//                     </Button>
//                   )}
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </DialogContent>
//       </Dialog>
//       {/* Anaysis */}
//       <Dialog
//         fullWidth
//         maxWidth="sm"
//         open={modelShowForAnaysis}
//         onClose={() => setModelShowForAnaysis(false)}
//       >
//         <DialogTitle>{"Anaysis Form"}</DialogTitle>
//         <DialogContent dividers>
//           <Formik
//             initialValues={{
//               compId: "",
//               supportEngName: "",
//             }}
//             validationSchema={Yup.object().shape({
//               compId: Yup.string().required("Please Required this Field"),
//               supportEngName: Yup.string().required(
//                 "Please Required this Field"
//               ),
//             })}
//             onSubmit={(values, { resetForm }) => {
//               handleSubmitAnaysis(values);
//               resetForm(values);
//             }}
//           >
//             {({ values, errors, touched, handleBlur, handleChange }) => (
//               <Form>
//                 <FormikValues />
//                 <div>
//                   <div className="mt-2 mb-4">
//                     <FormControl fullWidth>
//                       <InputLabel size="small">Select com Id *</InputLabel>
//                       <Select
//                         size="small"
//                         select
//                         label="Select com Id *"
//                         name="compId"
//                         value={values.compId}
//                         onBlur={handleBlur}
//                         onChange={handleChange}
//                         MenuProps={{
//                           style: {
//                             maxHeight: 300,
//                           },
//                         }}
//                       >
//                         <MenuItem>Select com Id</MenuItem>
//                         {compIdData?.map((option, index) => (
//                           <MenuItem key={index} value={option.cmp_id}>
//                             {option.cmp_id}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                     </FormControl>
//                     {touched.compId && errors.compId ? (
//                       <div className="text-danger field-error">
//                         {errors.compId}
//                       </div>
//                     ) : null}
//                   </div>

//                   <div className="mt-2 mb-4">
//                     <FormControl fullWidth>
//                       <InputLabel size="small">
//                         Select Support Eng Name *
//                       </InputLabel>
//                       <Select
//                         size="small"
//                         select
//                         fullWidth
//                         label="Select Support Eng Name *"
//                         name="supportEngName"
//                         value={values.supportEngName}
//                         onBlur={handleBlur}
//                         onChange={handleChange}
//                         MenuProps={{
//                           style: {
//                             maxHeight: 250,
//                           },
//                         }}
//                       >
//                         <MenuItem>Select Support Eng Name</MenuItem>
//                         {engineerData?.map((option, index) => (
//                           <MenuItem key={index} value={option.name}>
//                             {option.name}
//                           </MenuItem>
//                         ))}
//                       </Select>
//                       {touched.supportEngName && errors.supportEngName ? (
//                         <div className="text-danger field-error">
//                           {errors.supportEngName}
//                         </div>
//                       ) : null}
//                     </FormControl>
//                   </div>
//                 </div>
//                 <div className="d-flex flex-row justify-content-end">
//                   {/* {!id ? (
//                     <Button type="submit" variant="primary">
//                       Add
//                     </Button>
//                   ) : (
//                     <Button type="submit" variant="warning">
//                       Update
//                     </Button>
//                   )} */}
//                   <Button type="submit" variant="primary">
//                     Add
//                   </Button>
//                 </div>
//               </Form>
//             )}
//           </Formik>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// machine wise show engineer in dropdawn

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
import TextField from "@mui/material/TextField";
import swal from "sweetalert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Cookies from "universal-cookie";
import Ratings from "@mui/material/Rating";
import ListItemText from "@mui/material/ListItemText";
import OutlinedInput from "@mui/material/OutlinedInput";
import { RotatingLines } from "react-loader-spinner";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Dropdown } from "@nextui-org/react";
import { Card, Grid, Text, Link } from "@nextui-org/react";
import { Modal, Input } from "@nextui-org/react";
import Autocomplete from '@mui/material/Autocomplete';
import FormGroup from '@material-ui/core';
import FormControlLabel from '@material-ui/core';

// Import the parts array from the partsData.js file
// import parts from './partsData';

import jwt_decode from "jwt-decode";
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
    label: "Status",
  },
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
  const [currentTime, setCurrentTime] = useState(moment()); // Import moment if not already imported
  let cookies = new Cookies();
  const [accessType, setAccessType] = useState(null);

  React.useEffect(() => {
    const jwt = jwt_decode(cookies.get("token"));
    setAccessType(jwt.accessType);
  }, []);

  let [popupFormForAddParts, setPopupFormForAddParts] = React.useState(false);
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
  // console.log("macineTypData:", getmacineTypData);

  const [getParts, setGetParts] = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);

  // console.log(selectedParts,"selectedParts");
  const [partQuantities, setPartQuantities] = useState({});
  // console.log(partQuantities,"partQuantities");
  //  console.log(getParts, "getParts");
  const getPartsName = async () => {
    let response = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/parts/machinetype_wise_all_parts",
      {
        machineType: row.machineType,
        // machineType: "Fiber Machine",
      }
    );
    setGetParts(response.data.data);
    console.log("Fetched Machine Type-Wise Parts:", response.data.data);
  };

  React.useEffect(() => {
    getPartsName();
  }, []);

  const handleChange = (event) => {
    const selectedPartNames = event.target.value;
    // console.log(selectedPartNames,"selectedPartNames");
    setSelectedParts(
      getParts.filter(({ partsName }) => selectedPartNames.includes(partsName))
    );
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedParts((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedParts((prevSelected) =>
        prevSelected.filter((part) => part !== value)
      );
    }
  };

  const handleQuantityChange = (partName, quantity) => {
    setPartQuantities((prevQuantities) => ({
      ...prevQuantities,
      [partName]: quantity,
    }));
  };
  const handleIncrement = (partName) => {
    setPartQuantities((prevQuantities) => ({
      ...prevQuantities,
      [partName]: (prevQuantities[partName] || 0) + 1,
    }));
  };

  // Log the updated part quantity in the console
  //  console.log(`Updated ${partName} quantity: ${partQuantities[partName] + 1}`);

  const handleDecrement = (partName) => {
    setPartQuantities((prevQuantities) => ({
      ...prevQuantities,
      [partName]: Math.max((prevQuantities[partName] || 0) - 1, 0),
    }));
  };
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const part of getParts) {
      if (selectedParts.includes(part.partsName)) {
        const partPrice = part.partsPrice;
        const quantity = partQuantities[part.partsName] || 0;
        totalPrice += partPrice * quantity;
      }
    }
    return totalPrice;
  };
  console.log(getParts); // Check if getParts array contains the expected data
  console.log(selectedParts); // Check if selectedParts array contains the expected data
  const selectedValue = React.useMemo(
    () => Array.from(selectedParts).join(", ").replaceAll("_", " "),
    [selectedParts]
  );
  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectedParts((prevSelected) => [...prevSelected, value]);
  };

  const handleOpenDialog = () => {
    setPopupFormForAddParts(true);
  };

  const handleCloseDialog = () => {
    setPopupFormForAddParts(false);
  };

  const handleRemovePart = (partName) => {
    setSelectedParts((prevSelected) =>
      prevSelected.filter((part) => part !== partName)
    );
    setPartQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      delete updatedQuantities[partName];
      return updatedQuantities;
    });
  };

  let [partyMachineDetail, setPartyMachineDetail] = useState();
  // let getPartyMachineData = async () => {
  //   let response = await axios.get(
  //     `https://spr-cms-babe93641764.herokuapp.com/machine/get_machine_details/${row.partyName}/${row.machineType}/${row.machineNo}`
  //   );
  //   setPartyMachineDetail(response?.data?.data);
  // };




  //workin this code 
  //  const getPartyMachineData = async () => {
  // try {
  //   let response = await axios.get(
  // `https://spr-cms-babe93641764.herokuapp.com/machine/get_machine_details/${row.partyName}/${row.machineType}/${row.machineNo}`
  //     );
  //     console.log("API Response:", response.data); // Add this line
  //     setPartyMachineDetail(response?.data?.data);
  //     setIsDataFetched(true);
  //   } catch (error) {
  //     console.error("Error fetching machine details:", error);
  //   }
  // };

  const getPartyMachineData = async () => {
    try {
      let machineResponse = await axios.get(
        `https://spr-cms-babe93641764.herokuapp.com/machine/get_machine_details/${row.partyName}/${row.machineType}/${row.machineNo}`
      );
      console.log("Machine API Response:", machineResponse.data);

      // Fetch machine type-wise parts data
      let partsResponse = await axios.post(
        "https://spr-cms-babe93641764.herokuapp.com/parts/machinetype_wise_all_parts",
        {
          machineType: row.machineType,
        }
      );
      console.log("Parts API Response:", partsResponse.data);

      setPartyMachineDetail(machineResponse?.data?.data);
      setGetParts(partsResponse.data.data);
      setIsDataFetched(true);
    } catch (error) {
      console.error("Error fetching machine details:", error);
    }
  };






  React.useEffect(() => {
    getPartyMachineData();
  }, []);
  console.log("Party Machine Detail:", partyMachineDetail);


  const tableFields = [
    "partyName",
    "partyCity",
    "machineNumber",
    "machineType",
    "installationDate",
    "warrantyFromDate",
    "warrantyToDate",
  ];

  const [selected, setSelected] = React.useState(new Set(["text"]));

  // let handleSubmit = async (values) => {
  //   console.log(values, "values");
  //   try {
  //     let res = await axios.post(
  //       "https://spr-cms-babe93641764.herokuapp.com/parts/show_billing_data",
  //       values
  //     );
  //     if (res.data.statusCode === 200) {
  //       swal("", "Parts added successfully", "success");
  //     } else {
  //       alert("noo");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // let handleSubmit = async (values) => {
  //   console.log(values, "values");
  //   try {
  //     let res = await axios.post(
  //       "https://spr-cms-babe93641764.herokuapp.com/parts/show_billing_data",
  //       values
  //     );
  //     if (res.data.statusCode === 200) {
  //       console.log(res.data);
  //       swal("Parts added successfully", "", "success");
  //     } else {
  //       console.log(res.error);
  //       swal("Error", "Could not add parts", "error");
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };


  // const handleApprove = () => {
  //   // Call the handleSubmit function with the necessary data
  //   // For example, you can pass an object with the data you want to send to the server.
  //   handleSubmit({ data: "some data" });
  // };

  // const handleClickSubmit = async () => {
  //   // closeModal();
  //   // setDropdownVisible(false);
  //   const values = {
  //     cmp_id: "000015",
  //     partyName: "Bhaveshbhai Mangukiya",
  //     machineType: "Galaxy Machine",
  //     partyCity: "Surat",
  //     machineNumber: "ozon20191",
  //     partsDetails: [
  //       {
  //           partsName: "Wire",
  //           partsQty: 1,
  //           partsPrice: 50
  //       }
  //   ],
  //   isAdmin: true
  //   };
  //   await handleSubmit(values);
  //   console.log(values, 'values')
  // };

  // const [visible, setVisible] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  // Sample data for the table (replace this with your actual data)
  // const tableData = [
  //   { partname: "Part A", partqty: 2, partprice: 10, total: 20 },
  //   { partname: "Part B", partqty: 1, partprice: 15, total: 15 },
  //   // Add more data rows here as needed
  // ];
  // const getPartPrice = (partName) => {
  //   // Find the part object in the parts array based on its name
  //   const part = parts.find((item) => item.partsName === partName);
  //   // Return the part price if the part is found, otherwise return 0 or any other default value
  //   return part ? part.partsPrice : 0;
  // };
  // const closeHandler = () => {
  //   setVisible(false);
  //   console.log("closed");

  const handleClickAddComplaint = () => {
    setShowModal(true); // Show the modal when the "Add Complaint" button is clicked
  };
  // const handler = () => setVisible(true);
  // const closeHandler = () => {
  //   setVisible(false);
  //   console.log("closed");

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };



  const handleSubmit = async (values) => {
    setSelectedParts(values.selectedParts);
    console.log("Selected Parts:", values.selectedParts);
    //  Get the selected parts from the form or wherever they are stored
    // const selectedParts = [];
    // console.log(selectedParts,"selectedParts");

    // // Prepare the data to be sent to the server
    const data = {
      cmp_id: row.cmp_id,
      partyName: row.partyName,
      machineType: row.machineType,
      partyCity: row.partyCity,
      machineNumber: row.machineNo,
      partsDetails: selectedParts.map((partName) => {
        const partQty = partQuantities[partName] || 0;
        const part = getParts.find((part) => part.partsName === partName);
        const partPrice = part ? part.partsPrice : 0; // Replace 0 with a default value if the part is not found
        return {
          partsName: partName,
          partsQty: partQty,
          partsPrice: partPrice,

        };
      }),



      // partsDetails: selectedParts.map((partName) => ({
      //   partsName: partName,
      //   partsQty:partQuantities[partName] || 0,
      //   partsPrice: 50,
      // })),
      isAdmin: true,
    };

    // Print the parts details
    console.log("Parts Details:");
    data.partsDetails.forEach((part) => {
      console.log("Parts Name:", part.partsName);
      console.log("Parts Price:", part.partsPrice);
      console.log("Parts Quantity:", part.partsQty);
    });

    console.log(data);
    const getData = () => {
      // Implement the logic to fetch data or perform any required actions
      console.log("Fetching data...");

      // ...
    };
    try {
      const response = await axios.post(
        "https://spr-cms-babe93641764.herokuapp.com/parts/show_billing_data",
        data
      );

      if (response.data.statusCode === 200) {
        //  setShowModal(true); // Show the modal after successful response
        getData();
        swal({
          title: "",
          text: response.data.message,
          // text: "Parts added successfully",
          icon: "success",
        }).then(() => {
          // Reload the page after clicking "OK" on the SweetAlert dialog
          window.location.reload();
        });
        // swal("", "Parts added successfully", "success");

      } else {
        alert("Try again");
      }

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    //  console.log(data);
  };

  const [isCardVisible, setCardVisible] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);

  // Step 2: Create a function to handle the click on the "Add Complaint" button and show the card
  const handleShowCard = () => {
    setCardVisible(true);
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

        {/* <TableCell align="center">{row.cmp_id}</TableCell> */}
        <TableCell align="center">
          <span
            style={{
              color:
                row.startTime &&
                  currentTime.isAfter(
                    moment(row.startTime, "hh:mm:ss A").clone().add(2, "hours")
                  ) &&
                  (!row.endTime || currentTime.isBefore(moment(row.endTime, "hh:mm:ss A")))
                  ? "red"
                  : "inherit",
            }}
          >
            {row.cmp_id}
          </span>
        </TableCell>

        {/* <TableCell align="center">{row.partyName}</TableCell> */}
        <TableCell align="center">
          <span
            style={{
              color:
                row.startTime &&
                  currentTime.isAfter(
                    moment(row.startTime, "hh:mm:ss A").clone().add(2, "hours")
                  ) &&
                  (!row.endTime || currentTime.isBefore(moment(row.endTime, "hh:mm:ss A")))
                  ? "red"
                  : "inherit",
            }}
          >
            {row.partyName}
          </span>
        </TableCell>
        {/* <TableCell align="center">{row.machineNo}</TableCell> */}
        <TableCell align="center">
          <span
            style={{
              color:
                row.startTime &&
                  currentTime.isAfter(
                    moment(row.startTime, "hh:mm:ss A").clone().add(2, "hours")
                  ) &&
                  (!row.endTime || currentTime.isBefore(moment(row.endTime, "hh:mm:ss A")))
                  ? "red"
                  : "inherit",
            }}
          >
            {row.machineNo}
          </span>
        </TableCell>
        {/* <TableCell align="center">{row.callBy}</TableCell> */}
        <TableCell align="center">
          <span
            style={{
              color:
                row.startTime &&
                  currentTime.isAfter(
                    moment(row.startTime, "hh:mm:ss A").clone().add(2, "hours")
                  ) &&
                  (!row.endTime || currentTime.isBefore(moment(row.endTime, "hh:mm:ss A")))
                  ? "red"
                  : "inherit",
            }}
          >
            {row.callBy}
          </span>
        </TableCell>
        {/* <TableCell align="center">{row.logBy}</TableCell> */}
        <TableCell align="center">
          <span
            style={{
              color:
                row.startTime &&
                  currentTime.isAfter(
                    moment(row.startTime, "hh:mm:ss A").clone().add(2, "hours")
                  ) &&
                  (!row.endTime || currentTime.isBefore(moment(row.endTime, "hh:mm:ss A")))
                  ? "red"
                  : "inherit",
            }}
          >
            {row.logBy}
          </span>
        </TableCell>
        {/* <TableCell align="center">{row.engineerName}</TableCell> */}
        <TableCell align="center">
          <span
            style={{
              color:
                row.startTime &&
                  currentTime.isAfter(
                    moment(row.startTime, "hh:mm:ss A").clone().add(2, "hours")
                  ) &&
                  (!row.endTime || currentTime.isBefore(moment(row.endTime, "hh:mm:ss A")))
                  ? "red"
                  : "inherit",
            }}
          >
            {row.engineerName}
          </span>
        </TableCell>
        {/* <TableCell align="center">
          {row.isCompleted === "Padding" ? "Padding" : null}
          {row.isCompleted === "Completed" ? "Completed" : null}
          {row.isCompleted === "Review" ? "Review" : null}
        </TableCell> */}
        <TableCell align="center">
          {row.isCompleted === "Padding" && (
            <span
              style={{
                color:
                  row.startTime &&
                    currentTime.isAfter(
                      moment(row.startTime, "hh:mm:ss A").clone().add(2, "hours")
                    ) &&
                    (!row.endTime || currentTime.isBefore(moment(row.endTime, "hh:mm:ss A")))
                    ? "red"
                    : "inherit",
              }}
            >
              {row.startTime && !row.endTime ? "Running" : "Padding"}
            </span>
          )}
          {row.isCompleted === "Completed" ? "Completed" : null}
          {row.isCompleted === "Review" ? "Review" : null}

        </TableCell>



        {accessType &&
          (() => {
            if (!accessType.includes("Allow To Edit")) {
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
                {row.isCompleted === "Padding" ? (
                  <button
                    onClick={async () => {
                      console.log("Button clicked!");
                      await getPartyMachineData(); // Fetch the API data

                      // Open the popup after the data is fetched

                      setPopupFormForAddParts(true);
                    }}
                  >
                    <AddCircleOutlineIcon />
                  </button>


                ) : null}

                {/* 
                {row.isCompleted === "Padding" ? (
                  
                  <button onClick={() => setPopupFormForAddParts(true)}>
                    <AddCircleOutlineIcon />
                  </button>
                ) : null} */}
              </TableCell>
            );
          })()}

        <TableCell>
          {/* <button onClick={() => setPopupFormForAddParts(true)}>
            <AddCircleOutlineIcon />
          </button> */}

          <Dialog
            fullWidth
            maxWidth="sm"
            open={popupFormForAddParts}
            onClose={handleCloseDialog}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{partyMachineDetail?.partyName}</DialogTitle>
            <DialogContent dividers>
              <Table>
                <TableHead>
                  {/* <TableRow>
                    <TableCell>Property</TableCell>
                    <TableCell>Value</TableCell>
                  </TableRow> */}
                </TableHead>
                <TableBody>
                  {partyMachineDetail &&
                    tableFields.map((field) => (
                      <TableRow key={field}>
                        <TableCell>{field}</TableCell>
                        <TableCell>{partyMachineDetail[field]}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              <Formik
                initialValues={{
                  selectedParts: [],
                }}
                onSubmit={(values) => {
                  setSelectedParts(values.selectedParts);
                  handleCloseDialog();
                }}
              >
                {({ values, errors, touched, handleBlur, handleChange }) => (
                  <Form>
                    <div style={{ width: "400px", position: "relative" }}>
                      <div
                        style={{
                          border: "1px solid #ccc",
                          padding: "8px",
                          borderRadius: "4px",
                          minHeight: "81px", // Increase the minimum height
                          width: "559px", // Increase the width
                          display: "flex",
                          flexWrap: "wrap",
                          background: "#f0f0f0",
                        }}
                      >
                        {selectedParts.map((partName) => (
                          <div
                            key={partName}
                            style={{
                              borderRadius: "4px",
                              padding: "4px 8px",
                              marginRight: "8px",
                              marginBottom: "8px",
                              display: "flex",
                              alignItems: "center",
                              background: "#ffffff",
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                              flex: "1 0 22%",
                            }}
                          >
                            <span style={{ flex: 1 }}>{partName}</span>
                            <div style={{ marginLeft: "8px" }}>
                              <button
                                type="button"
                                onClick={() => handleRemovePart(partName)}
                                style={{
                                  cursor: "pointer",
                                  background: "none",
                                  border: "none",
                                  fontSize: "12px",
                                }}
                              >
                                &times; Remove
                              </button>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginLeft: "8px",
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => handleDecrement(partName)}
                                style={{
                                  cursor: "pointer",
                                  background: "#fff",
                                  border: "1px solid #ccc",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  padding: "3px 8px",
                                }}
                              >
                                -
                              </button>
                              <span
                                style={{ margin: "0 5px", fontSize: "14px" }}
                              >
                                {partQuantities[partName] || 0}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleIncrement(partName)}
                                style={{
                                  cursor: "pointer",
                                  background: "#fff",
                                  border: "1px solid #ccc",
                                  fontSize: "14px",
                                  fontWeight: "bold",
                                  padding: "3px 8px",
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: "8px" }}>
                        <select
                          multiple
                          onChange={handleSelectChange}
                          value={selectedParts}
                          style={{
                            top: "100%",
                            left: 0,
                            width: "100%",
                            maxHeight: "200px",
                            overflowY: "auto",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            zIndex: 999,
                            backgroundColor: "#fff",
                          }}
                        >
                          {getParts.map((part) => (
                            <option key={part.partsName} value={part.partsName}>
                              {part.partsName}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Typography className="mt-2">
                          Total Price: {calculateTotalPrice()}
                        </Typography>

                        <Button
                          onClick={handleClickAddComplaint}

                          // onClick={handleClickSubmit}
                          // onClick={handleClickSubmit}
                          shadow
                          className="mt-2"
                        >
                          Add Parts
                        </Button>

                        <Modal
                          closeButton
                          blur
                          aria-labelledby="modal-title"
                          open={showModal}
                          onClose={closeModal} // Close the modal when the close button is clicked
                        >
                          <Modal.Header>
                            <Text id="modal-title" size={18}>
                              parts detais

                            </Text>
                          </Modal.Header>
                          <Modal.Body>
                            <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">partname</th>
                                  <th scope="col">partQty</th>
                                  <th scope="col">partprice</th>
                                  <th scope="col">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {selectedParts.map((partsName, index) => {
                                  const part = getParts.find(
                                    (part) => part.partsName === partsName
                                  );
                                  const partPrice = part ? part.partsPrice : 0;
                                  const quantity =
                                    partQuantities[partsName] || 0;
                                  const total = partPrice * quantity;

                                  return (
                                    <tr key={partsName}>
                                      <th scope="row">{index + 1}</th>
                                      <td>{partsName}</td>
                                      <td>{quantity}</td>
                                      <td>{partPrice}</td>
                                      <td>{total}</td>
                                    </tr>
                                  );
                                })}
                                {/* Last Row - Total */}
                                <tr>
                                  <th scope="row"></th>
                                  <td>
                                    <strong>Total:</strong>
                                  </td>
                                  <td></td>
                                  <td></td>
                                  <td>
                                    {selectedParts.reduce((acc, partsName) => {
                                      const part = getParts.find(
                                        (part) => part.partsName === partsName
                                      );
                                      const partPrice = part
                                        ? part.partsPrice
                                        : 0;
                                      const quantity =
                                        partQuantities[partsName] || 0;
                                      return acc + partPrice * quantity;
                                    }, 0)}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </Modal.Body>

                          <Modal.Footer>
                            {/* <Button auto flat color="error">
                              cancel
                            </Button> */}
                            <Button auto onClick={() => handleSubmit(selectedValue)}>
                              approve
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2 }}>
              <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ paddingLeft: 15 }}
              >
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

                  {/* <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Create At : </span>
                    {moment(row.createDateAt).format("DD/MM/YYYY")},{" "}
                    {row.createTimeAt}
                  </Typography> */}




                  {/* <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Create At:</span>{" "}
                    {moment(row.createDateAt).format("DD/MM/YYYY")},{" "}
                    {row.createTimeAt}
                  </Typography>
                  {row.createDateAt !== row.upadateDateAt ||
                  row.createTimeAt !== row.upadateTimeAt ? (
                    <Typography variant="p" gutterBottom component="div">
                      <span className="fw-bold">Update At:</span>{" "}
                      {moment(row.upadateDateAt).format("DD/MM/YYYY")},{" "}
                      {row.upadateTimeAt}
                    </Typography>
                  ) : null} */}
                  <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Create At:</span>
                    {moment(row.createDateAt).format("DD/MM/YYYY")}, {row.createTimeAt}
                  </Typography>
                  {row.upadateDateAt && row.upadateDateAt && (
                    <Typography variant="p" gutterBottom component="div">
                      <span className="fw-bold">Update At:</span>
                      {moment(row.upadateDateAt).format("DD/MM/YYYY")}, {row.upadateTimeAt}
                    </Typography>
                  )}


                  {row.startTime &&
                    (() => {
                      const startTime = moment(row.startTime, "hh:mm:ss A");
                      if (startTime.isValid()) {
                        const newStartTime = startTime.clone().add(2, "hours");
                        const isTimePassed = currentTime.isAfter(newStartTime);
                        return (
                          <Typography
                            variant="p"
                            gutterBottom
                            component="div"
                            style={{
                              color:
                                isTimePassed && !row.endTime
                                  ? "red"
                                  : "inherit",
                            }}
                          >
                            {/* {row.startTime} */}
                          </Typography>
                        );
                      } else {
                        console.log("Invalid Start Time:", row.startTime);
                        return null;
                      }
                    })()}









                  {/* {row.createDateAt && row.createTimeAt !== row.upadateDateAt && row.upadateTimeAt ? (

                  <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Upadate At : </span>
                    {moment(row.upadateDateAt).format("DD/MM/YYYY")},
                    {row.upadateTimeAt}
                  </Typography>
                  ):null} */}
                </div>
                <div>

                  <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Start Time : </span>
                    <span
                      style={{
                        color:
                          row.startTime &&
                            currentTime.isAfter(
                              moment(row.startTime, "hh:mm:ss A").clone().add(2, "hours")
                            ) &&
                            (!row.endTime || currentTime.isBefore(moment(row.endTime, "hh:mm:ss A")))
                            ? "red"
                            : "inherit",
                      }}
                    >
                      {row.startTime}
                    </span>
                  </Typography>
                  {/* <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Start Time : </span>
                    {row.startTime}
                  </Typography> */}
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
                        row.startComplaintLocation?.latitude +
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
                        row.endComplaintLocation?.latitude +
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
                    <p className="col">&#11177;{row.details1}</p>
                  </Typography>
                </div>
              </div>
              {row?.anaysisCompaint?.length > 0 ? (
                <div style={{ paddingLeft: "100px", margin: "10px" }}>
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
                          CreateDate
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
    </React.Fragment>
  );
}

export default function Complaint() {
  let navigate = useNavigate();
  // auth post method  and chacked token or not
  let cookies = new Cookies();

  const [accessType, setAccessType] = useState(null);
  React.useEffect(() => {
    const jwt = jwt_decode(cookies.get("token"));
    console.log(jwt, "abc");
    setAccessType(jwt.accessType);
  }, []);

  let chackAuth = async () => {
    if (cookies.get("token")) {
      if (accessType.includes("Complaint Page")) {
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

  let [complaintData, setComplaintData] = useState([]);

  let [countData, setCountData] = useState(0);
  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  let [loader, setLoader] = React.useState(true);
  let getData = async () => {
    let data = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/add-complaint/findby_machine_or_engineercity_pagination",
      {
        machineType: localStorage.getItem("machine"),
        engineerCity: localStorage.getItem("city"),
        pageSize: rowsPerPage,
        pageNumber: page,
      }
    );
    setLoader(false);
    setCountData(data.data.complaintCount);
    setComplaintData(data.data.data);
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
      const newSelected = complaintData?.map((n) => n._id);
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
    swal("Are You Sure You Want TO Delete ?", {
      buttons: ["No", "Yes"],
    }).then(async (buttons) => {
      if (buttons === true) {
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
      }
    });
  };

  // Searchbar
  let handleSearchData = async (values) => {
    let res = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/add-complaint/search_complaint",
      {
        search: values,
      }
    );
    if (res.data.statusCode === 200) {
      if (values !== "") {
        setComplaintData(res.data.data);
      } else {
        getData();
      }
    }
  };

  const [data, setData] = useState({
    engineerName: "",
    partyName: "",
    isCompleted: "",
    startingDate: "",
    endingDate: "",
  });

  const updateInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  var filterDate = async () => {
    let response = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/add-complaint/find_eng/",
      {
        engineerName: data.engineerName,
        partyName: data.partyName,
        isCompleted: data.isCompleted,
        startingDate: data.startingDate,
        endingDate: data.endingDate,
      }
    );
    if (response.data.statusCode === 200) {
      setComplaintData(response.data.findByDateInComplainData);
    }
  };
  React.useEffect(() => {
    if (data) {
      filterDate();
    }
  }, [data]);

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

  if (!id) {
    // var handleSubmit = async (values) => {

    //   values["partyCity"] = showPartyCity;
    //   values["engineerCity"] = showEngineerCity;
    //   values["createDateAt"] = moment(new Date()).format("YYYY-MM-DD");
    //   values["createTimeAt"] = moment(new Date()).format("HH:mm:ss");
    //   let chackRepeat = await axios.post(
    //     "https://spr-cms-babe93641764.herokuapp.com/add-complaint/check_complaint_repeat",
    //     { partyName: values.partyName, machineNo: values.machineNo }
    //   );
    //   values["repeatComplaintNumber"] = chackRepeat.data.data;
    //   let currentDate = moment(new Date()).format("YYYY-MM-DD");
    //   const result = machineNumberAndPartyName.filter(
    //     (row) =>
    //       row.partyName === values.partyName &&
    //       row.machineNumber === values.machineNo
    //   );
    //   values["machineType"] = result[0]?.machineType;

    //   // var resultes = machineNumberAndPartyName.map((a) => a.extendAmcToDate);
    //   // console.log(resultes);
    //   if (
    //     currentDate >= result[0]?.amcFromDate &&
    //     currentDate <= result[0]?.amcToDate
    //   ) {
    //     // swal("", "Yes", "success");
    //     let response = await axios.post(
    //       "https://spr-cms-babe93641764.herokuapp.com/add-complaint/complaint_data",
    //       values
    //     );
    //     if (response.data.statusCode === 200) {
    //       setModalShowForPopupForm(false);
    //       getData();
    //       swal("", response.data.message, "success");
    //     }
    //   } else {
    //     swal("", "Your AMC has Expired", "error");
    //   }
    // };

    var handleSubmit = async (values) => {
      values["isCompleted"] = "Padding";
      values["partyCity"] = showPartyCity;
      values["engineerCity"] = showPartyCity;
      values["isAdmin"] = true;
      values["createDateAt"] = moment(new Date()).format("YYYY-MM-DD");
      values["createTimeAt"] = moment(new Date()).format("HH:mm:ss");
      // values["upadateAt"] = moment(new Date()).format("YYYY-MM-DD,HH:mm:ss");
      // values["upadateDateAt"] = moment(new Date()).format("YYYY-MM-DD");
      // values["upadateTimeAt"] = moment(new Date()).format("HH:mm:ss");
      values.details1 = complainArrayPush;
      values["engineerName"] = selectedEngineer;

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
      const result = machineNumberAndPartyName.filter(
        (row) =>
          row.partyName === values.partyName &&
          row.machineNumber === values.machineNo
      );
      values["machineType"] = result[0]?.machineType;
      // upadateAt
      values["partyCity"] = showPartyCity;
      values["engineerCity"] = showPartyCity;
      values["upadateDateAt"] = moment(new Date()).format("YYYY-MM-DD");
      values["upadateTimeAt"] = moment(new Date()).format("HH:mm:ss");
      values.details1 = complainArrayPush;
      values["engineerName"] = selectedEngineer;

      let response = await axios.put(
        "https://spr-cms-babe93641764.herokuapp.com/add-complaint/complaint_data/" + id,
        values
      );

      if (response.data.statusCode === 200) {
        setModalShowForPopupForm(false);
        getData();
        swal("", response.data.message, "success");
      }
    };
  }

  // add fom logic
  let [editData, setEditData] = React.useState({});

  // auto form fill up in edit
  let seletedEditData = async (datas) => {
    setModalShowForPopupForm(true);
    setId(datas._id);
    setEditData(datas);
    setComplainArrayPush(datas.details1);
    setSelectedEngineer(datas.engineerName);
  };

  let [ComplaintFormik, setComplaintFormik] = React.useState({});
  const FormikValues = () => {
    const formik = useFormikContext();
    React.useEffect(() => {
      setComplaintFormik(formik.values);
    }, [formik.values]);
    return null;
  };

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

  //   party Data
  let [partyData, setPartyData] = useState();
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
  //       ComplaintFormik.partyName
  //     );
  //     setMachineNo(response.data.data);
  //   }
  // };

  // React.useEffect(() => {
  //   getMachineNData();
  // }, [ComplaintFormik.partyName]);

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

  //   engineer name
  var [engineerData, setEngineerData] = React.useState([]);

  // let getEngineerData = async () => {
  //   let response = await axios.post(
  //     "https://spr-cms-babe93641764.herokuapp.com/eng/engineer_name",
  //     {
  //       engineerCity: localStorage.getItem("city"),
  //       machineType: localStorage.getItem("machine"),
  //     }
  //   );
  //   setEngineerData(response.data.data);
  // };
  // React.useEffect(() => {
  //   getEngineerData();
  // }, []);

  // Engineer Name Show in (Eng Name) Dropdawn
  let [engineerNameInDropdawn, setEngineerNameInDropdawn] = useState([]);

  let getEngineerNameInDropdawn = async () => {
    let response = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/eng/engineer_name",
      {
        engineerCity: localStorage.getItem("city"),
        machineType: localStorage.getItem("machine"),
      }
    );
    setEngineerNameInDropdawn(response.data.data);
  };
  React.useEffect(() => {
    getEngineerNameInDropdawn();
  }, []);

  const getEngineerData = async () => {
    if (ComplaintFormik.machineType) {
      try {
        const response = await axios.post(
          "https://spr-cms-babe93641764.herokuapp.com/eng/engineer_name",
          {
            engineerCity: localStorage.getItem("city"),
            machineType: localStorage.getItem("machine"),
            machineType: ComplaintFormik.machineType,
          }
        );
        setEngineerData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  React.useEffect(() => {
    getEngineerData();
  }, [ComplaintFormik.machineType]);

  // Selet Enginner For Assign Complaint
  const [selectedEngineer, setSelectedEngineer] = useState("");
  const handleEngineerChange = (event) => {
    setSelectedEngineer(event.target.value);
  };

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

  // React.useEffect(() => {
  //   const engResulte = engineerNameInDropdawn?.filter(
  //     (row) => row.name == ComplaintFormik.engineerName
  //   );
  //   setShowEngineerCity(
  //     engResulte &&
  //       engResulte.length &&
  //       engResulte[0] &&
  //       engResulte[0]?.engineerCity
  //       ? engResulte[0]?.engineerCity
  //       : ""
  //   );
  // }, [ComplaintFormik.engineerName]);

  React.useEffect(() => {
    const engResult = engineerNameInDropdawn?.filter(
      (row) => row.name === ComplaintFormik.engineerName
    );
    setShowEngineerCity(
      engResult &&
        engResult.length &&
        engResult[0] &&
        engResult[0]?.engineerCity
        ? engResult[0]?.engineerCity
        : ""
    );
  }, [ComplaintFormik.engineerName]);

  // ============================================
  const [complainArrayPush, setComplainArrayPush] = useState("");

  const [compIdData, setCompIdDate] = useState([]);

  let getCompIdDate = async () => {
    let res = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/analysis/anaysis_complaint_id",
      {
        machineType: localStorage.getItem("machine"),
        engineerCity: localStorage.getItem("city"),
      }
    );
    setCompIdDate(res.data.data);
  };
  React.useEffect(() => {
    getCompIdDate();
  }, []);

  let [modelShowForAnaysis, setModelShowForAnaysis] = useState(false);

  let handleSubmitAnaysis = async (values) => {
    values["supportEngNameCreateDate"] = moment(new Date()).format(
      "YYYY-MM-DD ,HH:mm:ss"
    );

    let response = await axios.put(
      "https://spr-cms-babe93641764.herokuapp.com/analysis/anaysis_complaint/" +
      values.compId.toString(),
      values
    );
    console.log(response, "resule");
    if (response.data.statusCode === 200) {
      setModelShowForAnaysis(false);
      getData();
      swal("", response.data.message, "success");
    }
  };


  const filterOptions = (options, { inputValue }) => {
    return options.filter(option =>
      option.partyName.toLowerCase().includes(inputValue.toLowerCase())
    );
  };
  const [selectedParty, setSelectedParty] = useState(null);
  return (
    <div>
      <UserSidebar
        getData={getData}
        getPartyData={getPartyData}
        getEngineerData={getEngineerData}
      />
      <Box sx={{ width: "100%", pb: "2%", pl: "2%", pr: "2%" }}>
        {accessType &&
          (() => {
            if (!accessType.includes("Add Complaint")) {
              return null;
            }
            return (
              <div className="d-flex flex-row justify-content-end gap-2 mb-2">
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
                  Add Complain
                </Button>

                <Button
                  className="text-capitalize"
                  size="small"
                  onClick={() => {
                    setModelShowForAnaysis(true);
                  }}
                  style={{ backgroundColor: "rgb(11, 11, 59) " }}
                >
                  Add Analysis
                </Button>
              </div>
            );
          })()}
        <div className="filter-containt">
          {/* Engineer Name Filter*/}

          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel>Eng Name</InputLabel>
            <Select
              label="Eng Name"
              name="engineerName"
              value={data?.engineerName}
              onChange={updateInputs}
              MenuProps={{
                style: {
                  maxHeight: 210,
                },
              }}
            >
              {engineerNameInDropdawn?.map((e, i) => {
                return (
                  <MenuItem key={i} value={e.name}>
                    {e.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          {/* Party Name Fillter */}

          <FormControl sx={{ minWidth: 130 }} size="small">
            <InputLabel>Party Name</InputLabel>

            <Select
              id="demo-simple-select"
              value={data?.partyName}
              label="Party Name"
              name="partyName"
              onChange={(e) => updateInputs(e)}
              MenuProps={{
                style: {
                  maxHeight: 210,
                },
              }}
            >
              {partyData?.map((e, i) => {
                return (
                  <MenuItem value={e.partyName} key={i}>
                    {e.partyName}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {/* Is Completed  Complaint*/}

          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Status</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              label="Status"
              name="isCompleted"
              onChange={updateInputs}
            >
              <MenuItem value={""}>Select an option</MenuItem>
              <MenuItem value={"Padding"}>Pending</MenuItem>
              <MenuItem value={"Completed"}>Complete</MenuItem>
              <MenuItem value={"Review"}>Review</MenuItem>

            </Select>
          </FormControl>
          {/* Starting Date */}

          <TextField
            value={data.startingDate}
            type="date"
            size="small"
            label="Starting Date"
            name="startingDate"
            onChange={updateInputs}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {/* <div>to</div> */}
          {/* Ending Date */}

          <TextField
            value={data.endingDate}
            type="date"
            size="small"
            name="endingDate"
            label="Ending Date"
            onChange={updateInputs}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {/* All */}

          <Button
            onClick={() => {
              getData();
              setData({
                engineerName: "",
                partyName: "",
                isCompleted: "",
                startingDate: "",
                endingDate: "",
              });
            }}
          >
            All
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
                All Complain
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
                                selected.length < complaintData?.length
                              }
                              checked={
                                complaintData?.length > 0 &&
                                selected.length === complaintData?.length
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
                  {complaintData?.map((row, index) => {
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
        maxWidth="md"
        open={modalShowForPopupForm}
        onClose={() => setModalShowForPopupForm(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Complain Form"}
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
            }}
            validationSchema={Yup.object().shape({
              partyName: Yup.string().required(" Required  Field"),
              machineType: Yup.string().required(" Required  Field"),
              machineNo: Yup.string().required(" Required Field"),
              details: Yup.array(),
              details1: Yup.string(),
              callBy: Yup.string().required(" Required Field"),
              logBy: Yup.string().required(" Required  Field"),
              engineerName: Yup.string(),
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
                    {/* <div className="mt-2 mb-4">
                      <FormControl fullWidth>
                        <InputLabel size="small">
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
                              maxHeight: 250,
                            },
                          }}
                        >
                          <MenuItem>Select PartyName</MenuItem>
                          {partyData?.map((option, index) => (
                            <MenuItem key={index} value={option.partyName}>
                              {option.partyName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {touched.partyName && errors.partyName ? (
                        <div className="text-danger field-error">
                          {errors.partyName}
                        </div>
                      ) : null}
                    </div> */}

                    <div className="form-wrap">
                      <div>
                        <div className="mt-2 mb-4">
                          <FormControl fullWidth>
                            <Autocomplete
                              options={partyData || []}
                              getOptionLabel={(option) => option.partyName || ''}
                              value={selectedParty || null}
                              onChange={(_, newValue) => {
                                setSelectedParty(newValue);
                                handleChange({
                                  target: { name: 'partyName', value: newValue ? newValue.partyName : '' },
                                });
                              }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Select Party Name *"
                                  name="partyName"
                                  size="small"
                                  onBlur={handleBlur}
                                />
                              )}
                              filterOptions={(options, state) => {
                                return options.filter((option) =>
                                  option.partyName.toLowerCase().includes(state.inputValue.toLowerCase())
                                );
                              }}
                              noOptionsText="No matching party names"
                            />
                          </FormControl>
                          {touched.partyName && errors.partyName ? (
                            <div className="text-danger field-error">{errors.partyName}</div>
                          ) : null}
                        </div>
                      </div>
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
                      <div style={{ width: '450px' }}> {/* Adjust the width as needed */}
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
                            renderValue={(selected) => {
                              const selectedValues = selected.filter(
                                (value) => value !== "Others"
                              );
                              return selectedValues.join(", ");
                            }}
                            MenuProps={{ PaperProps: { style: { maxHeight: 200 } } }} // Limit height of dropdown
                          >
                            <MenuItem>Select Complain</MenuItem>

                            {findSelectMachineProblems?.machineProblems?.map(
                              ({ machineProblem }) =>
                                machineProblem !== "Others" && (
                                  <MenuItem key={machineProblem} value={machineProblem}>
                                    <Checkbox
                                      checked={values.details.includes(machineProblem)}
                                    />
                                    <ListItemText primary={machineProblem} />
                                  </MenuItem>
                                )
                            )}

                            <MenuItem value="Others">Others</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>









































                    {/* {values.details.includes("Others") && (
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
                          value={values.details1}
                          onChange={handleChange}
                        />
                      </div>
                    )} */}
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
                          onClick={(e) => e.stopPropagation()} // Add this line to prevent event propagation

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
                        {/* <Select
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
                        > */}
                        <Select
                          size="small"
                          select
                          fullWidth
                          label="Select Engineer *"
                          name="engineerName"
                          value={selectedEngineer}
                          required
                          onChange={handleEngineerChange}
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
                        {/* {touched.engineerName && errors.engineerName ? (
                          <div className="text-danger field-error">
                            {errors.engineerName}
                          </div>
                        ) : null} */}
                      </FormControl>
                    </div>

                    {values.engineerName ? (
                      <div className="w-100 mt-4">
                        <TextField
                          fullWidth
                          size="small"
                          id="outlined-select-currency"
                          label="Engineer City"
                          name="name"
                          disabled
                          value={showEngineerCity}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-end">
                  {!id ? (
                    <Button type="submit" variant="primary">
                      Add Complain
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
      {/* Anaysis */}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={modelShowForAnaysis}
        onClose={() => setModelShowForAnaysis(false)}
      >
        <DialogTitle>{"Anaysis Form"}</DialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={{
              compId: "",
              supportEngName: "",
            }}
            validationSchema={Yup.object().shape({
              compId: Yup.string().required(" Required Field"),
              supportEngName: Yup.string().required(" Required Field"),
            })}
            onSubmit={(values, { resetForm }) => {
              handleSubmitAnaysis(values);
              resetForm(values);
            }}
          >
            {({ values, errors, touched, handleBlur, handleChange }) => (
              <Form>
                <FormikValues />
                <div>
                  <div className="mt-2 mb-4">
                    <FormControl fullWidth>
                      <InputLabel size="small">Select com Id *</InputLabel>
                      <Select
                        size="small"
                        select
                        label="Select com Id *"
                        name="compId"
                        value={values.compId}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        MenuProps={{
                          style: {
                            maxHeight: 300,
                          },
                        }}
                      >
                        <MenuItem>Select com Id</MenuItem>
                        {compIdData?.map((option, index) => (
                          <MenuItem key={index} value={option.cmp_id}>
                            {option.cmp_id}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {touched.compId && errors.compId ? (
                      <div className="text-danger field-error">
                        {errors.compId}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-2 mb-4">
                    <FormControl fullWidth>
                      <InputLabel size="small">
                        Select Support Eng Name *
                      </InputLabel>
                      <Select
                        size="small"
                        select
                        fullWidth
                        label="Select Support Eng Name *"
                        name="supportEngName"
                        value={values.supportEngName}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        MenuProps={{
                          style: {
                            maxHeight: 250,
                          },
                        }}
                      >
                        <MenuItem>Select Support Eng Name</MenuItem>
                        {engineerNameInDropdawn?.map((option, index) => (
                          <MenuItem key={index} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.supportEngName && errors.supportEngName ? (
                        <div className="text-danger field-error">
                          {errors.supportEngName}
                        </div>
                      ) : null}
                    </FormControl>
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-end">
                  {/* {!id ? (
                    <Button type="submit" variant="primary">
                      Add
                    </Button>
                  ) : (
                    <Button type="submit" variant="warning">
                      Update
                    </Button>
                  )} */}
                  <Button type="submit" variant="primary">
                    Add
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
