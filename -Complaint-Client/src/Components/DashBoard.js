import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import UserSidebar from "./UserSidebar";
import { Grid, Card, CardContent, Typography } from "@mui/material"; // Import Button component
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

import Cookies from "universal-cookie";
import { RotatingLines } from "react-loader-spinner";
import jwt_decode from "jwt-decode";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import * as Yup from "yup";
import swal from "sweetalert";
import { useHistory } from 'react-router-dom';
import moment from "moment";
import { Modal, Input } from "@nextui-org/react";
import { Text, Link } from "@nextui-org/react";
import Sellbill from './Sellbill'; // Import your Bill component




import { Formik, Form, useFormikContext } from "formik";










function Dashboard(props) {

  let navigate = useNavigate();
  let cookies = new Cookies();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isNewFormOpen, setIsNewFormOpen] = useState(false);

  const handleNavigate = () => {

    // Redirect to the Complaint page with the status query parameter set to "Pending"
    navigate('/complaint?status=Pending');

  };
  const handleNavigateparts = () => {

    // Redirect to the Complaint page with the status query parameter set to "Pending"
    navigate('/parts');

  };

  const handleNavigatecomplain = () => {

    // Redirect to the Complaint page with the status query parameter set to "Pending"
    navigate('/complaint');

  };


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
        "http://localhost:5000/register/auth",
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

  let [loader, setLoader] = useState(true);
  let [dashboarData, setDashboardData] = useState();
  let getData = async () => {
    let response = await axios.post("http://localhost:5000/count/count", {
      engineerCity: localStorage.getItem("city"),
      machineType: localStorage.getItem("machine"),
    });
    setLoader(false);
    setDashboardData(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const [accessType, setAccessType] = useState(null);

  React.useEffect(() => {
    if (cookies.get("token")) {
      const jwt = jwt_decode(cookies.get("token"));
      setAccessType(jwt.accessType);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  let [freeEngineerCountOnCard, serFreeEngineerCountOnCard] = useState();
  let getPartyData = async () => {
    let response = await axios.post("http://localhost:5000/count/free_eng", {
      engineerCity: localStorage.getItem("city"),
      machineType: localStorage.getItem("machine"),
    });
    setLoader(false);
    serFreeEngineerCountOnCard(response.data);
  };

  useEffect(() => {
    getPartyData();
  }, []);

  let [amcExpireCount, setAmcExpireCount] = useState();
  let getEngineerData = async () => {
    let response = await axios.post("http://localhost:5000/machine/amc-exp", {
      partyCity: localStorage.getItem("city"),
      machineType: localStorage.getItem("machine"),
    });
    setLoader(false);
    setAmcExpireCount(response.data);
  };

  useEffect(() => {
    getEngineerData();
  }, []);

  let [amcBillPending, setAmcBillPending] = useState();
  let getPendingAmcBill = async () => {
    let response = await axios.post(
      "http://localhost:5000/machine/amc_pending",
      {
        partyCity: localStorage.getItem("city"),
        machineType: localStorage.getItem("machine"),
      }
    );
    setLoader(false);
    setAmcBillPending(response.data);
  };

  useEffect(() => {
    getPendingAmcBill();
  }, []);

  //display data dropdown parts and machine types
  // const [isNewFormOpen, setIsNewFormOpen] = useState(false);
  const [selectedMachineType, setSelectedMachineType] = useState("");
  const [selectedpartsName, setSelectedpartsName] = useState("");
  const [machineTypeData, setMachineTypeData] = useState([]);
  const [getParts, setGetParts] = useState({
    data: [
      // Replace this with your actual parts data
      { partsName: 'Part 1', partsPrice: 10 },
      { partsName: 'Part 2', partsPrice: 20 },
    ],
  });


  // Handle form submission
  // const handleSubmit = async (event, values) => {
  //   event.preventDefault();
  //   console.log('Form submitted', values);

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/parts/add_parts",
  //       values
  //     );
  //     console.log('API response:', response); // Add this line




  //     if (response.data.statusCode === 200) {
  //       setIsNewFormOpen(false);
  //       // Additional action you want to take after successful submission
  //     } else {
  //       // Handle error case
  //     }
  //   } catch (error) {
  //     console.error("Error adding parts:", error);
  //     // Handle error case
  //   }
  // };




  const getMachineTypeData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/machinetype/machine-type"
      );
      setMachineTypeData(response.data.data);
    } catch (error) {
      console.error("Error fetching machine types:", error);
    }
  };


  const getPartsName = async (machineType) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/parts/machinetype_wise_all_parts",
        {
          machineType: machineType,
        }
      );
      setGetParts(response.data);
    } catch (error) {
      console.error("Error fetching parts:", error);
    }
  };
  useEffect(() => {
    getMachineTypeData();
  }, []);

  useEffect(() => {
    if (selectedMachineType) {
      getPartsName(selectedMachineType);
    }
  }, [selectedMachineType]);
  const [showModal, setShowModal] = useState(false);
  const [partQuantities, setPartQuantities] = useState({});
  const [submittedPartsData, setSubmittedPartsData] = useState([]);
  const [isDataUpdated, setIsDataUpdated] = useState(false); // State to track data updates


  const [formData, setFormData] = useState({
    customerName: '',
    mobileNumber: '',
    city: '',
    machineType: '',
    partsName: '',
    Partsprice: '',
    partsQuantity: '',
  });
  // const [selectedpartsName, setSelectedpartsName] = useState('');

  const handleInput = (event) => {
    // const { name, value } = event.target;
    // setFormData({ ...formData, [name]: value });
    const { name, value } = event.target;
    if (name === 'partsName') {
      setSelectedpartsName(value);
    }
    setFormData({ ...formData, [name]: value });
  };


  const handleClickAddComplaint = (values) => {
    setShowModal(true);
    // Show the modal when the "Add Complaint" button is clicked
    const newSubmittedPart = {
      customerName: formData.customerName,
      mobileNumber: formData.mobileNumber,
      city:formData.city,
      machineType: selectedMachineType,
      partsName: selectedpartsName, // Use the selected "Parts Name"
      Partsprice: formData.Partsprice,
      partsQuantity: formData.partsQuantity,
      // Add any other relevant fields here
    };
    console.log(formData);



    // Add the new part to the submittedPartsData array
    setSubmittedPartsData([...submittedPartsData, newSubmittedPart]);
  };
  // const handler = () => setVisible(true);
  // const closeHandler = () => {
  //   setVisible(false);
  //   console.log("closed");
  // const { row, handleClick, isItemSelected, labelId, seletedEditData } = props;

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };
  const handleSubmit = () => {
    // Create a new object based on formData and add partsName
    const dataToSend = {
      customerName: formData.customerName,
      mobileNumber: formData.mobileNumber,
      city:formData.city,

      machineType: selectedMachineType,
      partsName: selectedpartsName, // Use selectedpartsName
      Partsprice: formData.Partsprice,
      partsQuantity: formData.partsQuantity,
    };

    // Make a POST request to your API endpoint with dataToSend
    axios
      .post('http://localhost:5000/sellparts/add_sellparts', dataToSend)
      .then((response) => {
        // Handle the response as needed
        const responseData = response.data;

        console.log('Data saved:', response.data);
        // After successfully saving data, you can reset the form and submitted data
        setFormData({
          customerName: '',
          mobileNumber: '',
          city: '',
          machineType: '',
          partsName: '',
          Partsprice: '',
          partsQuantity: '',
        });
        setSubmittedPartsData([...submittedPartsData, responseData]); // Update with the response data
        setIsDataUpdated(true); // Set data update flag to true
        setShowModal(false); // Close the modal
      })
      .catch((error) => {
        console.error('Error saving data:', error);
        // Handle errors as needed
      });

  };









  //  Get the selected parts from the form or wherever they are stored
  // const selectedParts = [];
  // console.log(selectedParts,"selectedParts");

  // // Prepare the data to be sent to the server
  //   const data = {
  //     cmp_id: row.cmp_id,
  //     partyName: row.partyName,
  //     machineType: row.machineType,
  //     partyCity: row.partyCity,
  //     machineNumber: row.machineNo,
  //     partsDetails: selectedParts.map((partName) => {
  //       const partQty = partQuantities[partName] || 0;
  //       const part = getParts.find((part) => part.partsName === partName);
  //       const partPrice = part ? part.partsPrice : 0; // Replace 0 with a default value if the part is not found
  //       return {
  //         partsName: partName,
  //         partsQty: partQty,
  //         partsPrice: partPrice,
  //       };
  //     }),
  //     // partsDetails: selectedParts.map((partName) => ({
  //     //   partsName: partName,
  //     //   partsQty:partQuantities[partName] || 0,
  //     //   partsPrice: 50,
  //     // })),
  //     isAdmin: true,
  //   }
  // }







  return (
    <>

      <UserSidebar
        getData={getData}
        getPartyData={getPartyData}
        getEngineerData={getEngineerData}
      />
      {loader ? (
        <div className="d-flex flex-direction-row justify-content-center align-items-center vh-100">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="70"
            visible={loader}
          />
        </div>
      ) : (
        <div>
          <Grid
            container
            component="main"
            spacing={2}
            rowSpacing={3}
            className="marginside"
            sx={{ marginBottom: "40px" }}
          >
            {/* Free Engineer */}
            {accessType &&
              (() => {
                if (!accessType.includes("Dashboard - Free Engineer")) {
                  return null;
                }
                return (
                  <Grid item xs={12} lg={3} sm={4} md={4}>
                    <Card
                      className="card_hover"
                      onClick={() => navigate("/eng?value=free-eng")}
                      sx={{
                        backgroundColor: "#e6ee9c",
                        borderRadius: "10px",
                        boxShadow: 3,
                        borderRight: 10,
                        borderColor: "#f0f4c3",
                        cursor: "pointer",
                      }}
                    >
                      <CardContent className="row">
                        <div className="col mt-2">
                          <Typography
                            variant="h6"
                            component="div"
                            style={{ color: "black", fontWeight: "600" }}
                          >
                            Free Eng
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            <b>{freeEngineerCountOnCard?.freeEngineer}</b>
                          </Typography>
                        </div>
                        <Typography
                          variant="h3"
                          className="pull-right col text-center"
                          style={{ color: "black" }}
                        >
                          <div className="mt-2">
                            <i className="fa-solid fa-person"></i>
                          </div>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })()}

            {/* Total Engineer */}
            {accessType &&
              (() => {
                if (!accessType.includes("Dashboard - Engineer")) {
                  return null;
                }
                return (
                  <Grid item xs={12} lg={3} sm={4} md={4}>
                    <Card
                      className="card_hover"
                      onClick={() => navigate("/eng")}
                      sx={{
                        backgroundColor: "#90caf9",
                        borderRadius: "10px",
                        boxShadow: 3,
                        borderRight: 10,
                        borderColor: "#bbdefb",
                        cursor: "pointer",
                      }}
                    >
                      <CardContent className="row">
                        <div className="col mt-2">
                          <Typography
                            variant="h6"
                            component="div"
                            style={{ color: "black", fontWeight: "600" }}
                          >
                            Engineer
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            <b>{dashboarData?.engineer}</b>
                          </Typography>
                        </div>
                        <Typography
                          variant="h3"
                          className="pull-right col text-center"
                          style={{ color: "black" }}
                        >
                          <div className="mt-2">
                            <i className="fa fa-users"></i>
                          </div>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })()}

            {/* Total Party */}
            {accessType &&
              (() => {
                if (!accessType.includes("Dashboard - Party")) {
                  return null;
                }
                return (
                  <Grid item xs={12} lg={3} sm={4} md={4}>
                    <Card
                      className="card_hover"
                      onClick={() => navigate("/party")}
                      sx={{
                        backgroundColor: "#f48fb1",
                        borderRadius: "10px",
                        boxShadow: 3,
                        borderRight: 10,
                        borderColor: "#f8bbd0",
                        cursor: "pointer",
                      }}
                    >
                      <CardContent className="row">
                        <div className="col mt-2">
                          <Typography
                            variant="h6"
                            component="div"
                            style={{ color: "black", fontWeight: "600" }}
                          >
                            Party
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            <b>{dashboarData?.party}</b>
                          </Typography>
                        </div>
                        <Typography
                          variant="h3"
                          className="pull-right col text-center"
                          style={{ color: "black" }}
                        >
                          <div className="mt-2">
                            <i className="fa fa-user-secret"></i>
                            {/* <FaxIcon /> */}
                          </div>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })()}

            {/* Total Machine */}
            {accessType &&
              (() => {
                if (!accessType.includes("Dashboard - Machine")) {
                  return null;
                }
                return (
                  <Grid item xs={12} lg={3} sm={4} md={4}>
                    <Card
                      className="card_hover"
                      onClick={() => navigate("/machine")}
                      sx={{
                        backgroundColor: "#ce93d8",
                        borderRadius: "10px",
                        boxShadow: 3,
                        borderRight: 10,
                        borderColor: "#e1bee7",
                        cursor: "pointer",
                      }}
                    >
                      <CardContent className="row">
                        <div className="col mt-2">
                          <Typography
                            variant="h6"
                            component="div"
                            style={{ color: "black", fontWeight: "600" }}
                          >
                            Machine
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            <b>{dashboarData?.machine}</b>
                          </Typography>
                        </div>
                        <Typography
                          variant="h3"
                          className="pull-right col text-center"
                          style={{ color: "black" }}
                        >
                          <div className="mt-2">
                            <i className="fa fa-fax"></i>
                          </div>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })()}

            {/* Total Complaint */}
            {accessType &&
              (() => {
                if (!accessType.includes("Dashboard - Complaint")) {
                  return null;
                }
                return (
                  <Grid item xs={12} lg={3} sm={4} md={4}>
                    <Card
                      className="card_hover"
                      onClick={() => navigate("/complaint")}
                      sx={{
                        backgroundColor: "#80cbc4",
                        borderRadius: "10px",
                        boxShadow: 3,
                        borderRight: 10,
                        borderColor: "#b2dfdb",
                        cursor: "pointer",
                      }}
                    >
                      <CardContent className="row">
                        <div className="col mt-2">
                          <Typography
                            variant="h6"
                            component="div"
                            style={{ color: "black", fontWeight: "600" }}
                          >
                            All Complain
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            <b>{dashboarData?.complaint}</b>
                          </Typography>
                        </div>
                        <Typography
                          variant="h3"
                          className="pull-right col text-center"
                          style={{ color: "black" }}
                        >
                          <div className="mt-2">
                            <i className="fa-solid fa-inbox"></i>
                          </div>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })()}

            {/* Review */}
            {accessType &&
              (() => {
                if (!accessType.includes("Dashboard - Review Complaint")) {
                  return null;
                }
                return (
                  <Grid item xs={12} lg={3} sm={4} md={4}>
                    <Card
                      className="card_hover"
                      onClick={() => navigate("/review-complaint")}
                      sx={{
                        backgroundColor: "#e6ee9c",
                        borderRadius: "10px",
                        boxShadow: 3,
                        borderRight: 10,
                        borderColor: "#f0f4c3",
                        cursor: "pointer",
                      }}
                    >
                      <CardContent className="row">
                        <div className="col mt-2">
                          <Typography
                            variant="h6"
                            component="div"
                            style={{ color: "black", fontWeight: "600" }}
                          >
                            Review
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            <b>{dashboarData?.reviewComplaint}</b>
                          </Typography>
                        </div>
                        <Typography
                          variant="h3"
                          className="pull-right col text-center"
                          style={{ color: "black" }}
                        >
                          <div className="mt-2">
                            <i className="fa-solid fa-eye"></i>
                          </div>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })()}

            {/* Complete */}
            {accessType &&
              (() => {
                if (!accessType.includes("Dashboard - Complete Complaint")) {
                  return null;
                }
                return (
                  <Grid item xs={12} lg={3} sm={4} md={4}>
                    <Card
                      className="card_hover"
                      onClick={() => navigate("/complete_complaint")}
                      sx={{
                        backgroundColor: "#90caf9",
                        borderRadius: "10px",
                        boxShadow: 3,
                        borderRight: 10,
                        borderColor: "#bbdefb",
                        cursor: "pointer",
                      }}
                    >
                      <CardContent className="row">
                        <div className="col mt-2">
                          <Typography
                            variant="h6"
                            component="div"
                            style={{ color: "black", fontWeight: "600" }}
                          >
                            Complete
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            <b>{dashboarData?.completeComplete}</b>
                          </Typography>
                        </div>
                        <Typography
                          variant="h3"
                          className="pull-right col text-center"
                          style={{ color: "black" }}
                        >
                          <div className="mt-2">
                            <i className="fa fa-users"></i>
                          </div>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })()}

            {/* AMC Date Expire Count */}
            {accessType &&
              (() => {
                if (!accessType.includes("Dashboard - Amc Date")) {
                  return null;
                }
                return (
                  <Grid item xs={12} lg={3} sm={4} md={4}>
                    <Card
                      className="card_hover"
                      // onClick={() => navigate("/machine?value=amc-exp")}
                      onClick={() => navigate("/machine?name=amc-exp")}
                      sx={{
                        backgroundColor: "#f48fb1",
                        borderRadius: "10px",
                        boxShadow: 3,
                        borderRight: 10,
                        borderColor: "#f8bbd0",
                        cursor: "pointer",
                      }}
                    >
                      <CardContent className="row">
                        <div className="col mt-2">
                          <Typography
                            variant="h6"
                            component="div"
                            style={{ color: "black", fontWeight: "600" }}
                          >
                            AMC Expire
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            <b>{amcExpireCount?.amcExpireCount}</b>
                          </Typography>
                        </div>
                        <Typography
                          variant="h3"
                          className="pull-right col text-center"
                          style={{ color: "black" }}
                        >
                          <div className="mt-2">
                            <i className="fa-regular fa-circle-xmark"></i>
                          </div>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })()}

            {/* Amc Bill Pending */}
            <Grid item xs={12} lg={3} sm={4} md={4}>
              <Card
                className="card_hover"
                onClick={() => navigate("/machine?value=amc-pending-data")}
                sx={{
                  backgroundColor: "#f48fb1",
                  borderRadius: "10px",
                  boxShadow: 3,
                  borderRight: 10,
                  borderColor: "#f8bbd0",
                  cursor: "pointer",
                }}
              >
                <CardContent className="row">
                  <div className="col mt-2">
                    <Typography
                      variant="h6"
                      component="div"
                      style={{ color: "black", fontWeight: "600" }}
                    >
                      AMC Pending
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      <b>{amcBillPending?.pendingCount}</b>
                    </Typography>
                  </div>
                  <Typography
                    variant="h3"
                    className="pull-right col text-center"
                    style={{ color: "black" }}
                  >
                    <div className="mt-2">
                      <i className="fa-regular fa-circle-xmark"></i>
                    </div>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Pending Complaint */}
            {accessType &&
              (() => {
                if (!accessType.includes("Dashboard - Pending Complaint")) {
                  return null;
                }
                return (
                  <Grid item xs={12} lg={3} sm={3} md={3}>
                    <Card
                      className="card_hover"
                      onClick={() => navigate("/padding-complaint")}
                      sx={{
                        backgroundColor: "#ce93d8",
                        borderRadius: "10px",
                        boxShadow: 3,
                        borderRight: 10,
                        borderColor: "#e1bee7",
                        cursor: "pointer",
                      }}
                    >
                      <CardContent className="row">
                        <div className="col mt-2">
                          <Typography
                            variant="h6"
                            component="div"
                            style={{ color: "black", fontWeight: "600" }}
                          >
                            Pending
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            <b>{dashboarData?.paddingComplaint}</b>
                          </Typography>
                        </div>
                        <Typography
                          variant="h3"
                          className="pull-right col text-center"
                          style={{ color: "black" }}
                        >
                          <div className="mt-2">
                            <i class="fa-sharp fa-solid fa-pause"></i>
                          </div>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })()}

            {/* Parts */}
            {accessType &&
              (() => {
                if (!accessType.includes("Dashboard - Parts")) {
                  return null;
                }
                return (
                  <Grid item xs={12} lg={3} sm={4} md={4}>
                    <Card
                      className="card_hover"
                      onClick={() => navigate("/parts")}
                      sx={{
                        backgroundColor: "#80cbc4",
                        borderRadius: "10px",
                        boxShadow: 3,
                        borderRight: 10,
                        borderColor: "#b2dfdb",
                        cursor: "pointer",
                      }}
                    >
                      <CardContent className="row">
                        <div className="col mt-2">
                          <Typography
                            variant="h6"
                            component="div"
                            style={{ color: "black", fontWeight: "600" }}
                          >
                            Parts
                          </Typography>
                          <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            <b>{dashboarData?.partsCount}</b>
                          </Typography>
                        </div>
                        <Typography
                          variant="h3"
                          className="pull-right col text-center"
                          style={{ color: "black" }}
                        >
                          <div className="mt-2">
                            <i className="fa-solid fa-inbox"></i>
                          </div>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })()}
          </Grid>



          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsNewFormOpen(true)}
            style={{
              position: 'absolute',
              top: '10%',
              right: '10rem',
              backgroundColor: "rgb(11, 11, 59) "

            }}
          >
            Sell Parts
          </button>





          <Dialog
            fullWidth
            open={isNewFormOpen}
            onClose={() => {
              setIsNewFormOpen(false);
              // setPasswordCPasswordHide(false);
            }}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              {"sell parts form"}
              {/* <Button
              variant="contained"
              color="primary"
              // onClick={() => setIsFormOpen(true)}

              style={{
                position: "absolute",
                top: "5%",
                right: "1rem",
              }}
             
              
              // onClick={handleAddPartsButtonClick}
            >
              New Parts
            </Button> */}
              <IconButton
                aria-label="close"
                onClick={() => setIsNewFormOpen(false)}
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
                  customerName: "",
                  mobileNumber: "",
                  city:"",
                  machineType: "",
                  partsName: "",
                  Partsprice: "",
                  partsQuantity: "",
                }}
                validationSchema={Yup.object().shape({
                  // Define validation rules for your fields here
                  customerName: Yup.string().required("Required"),
                  mobileNumber: Yup.string().required("Required"),
                  city: Yup.string().required("Required"),

                  machineType: Yup.string().required("Required"),
                  partsName: Yup.string().required("Required"),
                  Partsprice: Yup.string().required("Required"),
                  partsQuantity: Yup.string().required("Required"),
                })}
                onSubmit={(values) => {
                  handleClickAddComplaint(values); // Call the handleClickAddComplaint function here
                }}
              >
                {({ values, handleChange, handleBlur }) => (
                  <Form >
                    <div>
                      <div className="mt-4">
                        <TextField
                          type="text"
                          size="small"
                          fullWidth
                          placeholder="customerName"
                          label="customerName"
                          name="customerName"
                          // value={values.CustomerName}
                          // onChange={handleChange}
                          onBlur={handleBlur}
                          value={formData.customerName}
                          onChange={handleInput}
                        />
                        {/* Display form validation errors */}
                        {/* {touched.CustomerName && errors.CustomerName ? (
                      <div className="text-danger">{errors.CustomerName}</div>
                    ) : null} */}



                      </div>
                      <div className="mt-4">
                        <TextField
                          type="text"
                          size="small"
                          fullWidth
                          placeholder="mobileNumber"
                          label="mobileNumber"
                          name="mobileNumber"
                          onBlur={handleBlur}
                          value={formData.mobileNumber}
                          onChange={handleInput}


                        />

                      </div>
                      <div className="mt-4">
                        <FormControl fullWidth>
                          <InputLabel size="small">City</InputLabel>
                          <Select
                            size="small"
                            label="City"
                            name="city"
                            onBlur={handleBlur}
                            value={formData.city}
                            onChange={handleInput}
                          >
                            <MenuItem value="">Select City</MenuItem> 
                            <MenuItem value="Bhavnagar">Bhavnagar</MenuItem>
                            <MenuItem value="Surat">Surat</MenuItem>
                          </Select>
                        </FormControl>
                      </div>




                      <div className="mt-4">
                        <FormControl fullWidth>
                          <InputLabel size="small">Machine Type</InputLabel>
                          <Select
                            size="small"
                            id="machine-type-select"
                            label="Machine Type"
                            name="machineType"
                            value={selectedMachineType}
                            onChange={(event) => {
                              setSelectedMachineType(event.target.value);
                              setSelectedpartsName(''); // Reset selected parts when changing machine type
                            }}


                            MenuProps={{
                              style: {
                                maxHeight: 210,
                              },
                            }}
                          >
                            {machineTypeData?.map((option) => (
                              <MenuItem key={option.machineType} value={option.machineType}>
                                {option.machineType}
                              </MenuItem>
                            ))}
                          </Select>
                          {/* {touched.machineType && errors.machineType ? (
                        <div className="text-danger">{errors.machineType}</div>
                      ) : null} */}
                        </FormControl>

                      </div>



                      <div className="mt-4">
                        <FormControl fullWidth>

                          <InputLabel size="small">Parts Name</InputLabel>
                          <Select
                            size="small"
                            id="parts-name-select"
                            label="parts Name"
                            name="partsName"
                            value={selectedpartsName}

                            onChange={(event) => setSelectedpartsName(event.target.value)}
                            MenuProps={{
                              style: {
                                maxHeight: 210,
                              },
                            }}

                          // onChange={handleSelectChange}
                          // value={selectedParts}
                          >
                            {/* {getParts?.map((option) => (
                          <MenuItem
                            key={option?.getParts}
                            value={option?.getParts}
                          >
                            {option.getParts}
                          </MenuItem>
                        ))} */}
                            {/* {selectedMachineType && getParts.data ? (
                          getParts.data
                            .filter((part) => part.machineType === selectedMachineType)
                            .map((part) => (
                              <MenuItem key={part.partsName} value={part.partsName}>
                                {part.partsName}
                              </MenuItem>
                            ))
                        ) : (
                          <MenuItem disabled>
                            {selectedMachineType
                              ? "No parts available"
                              : "Select a machine type first"} */}
                            {selectedMachineType !== "" && getParts.data && getParts.data.length > 0 ? (
                              getParts.data
                                .filter(
                                  (part) =>
                                    part.machineType === selectedMachineType ||
                                    part.machineType === "All"
                                )
                                .map((part) => (
                                  <MenuItem key={part.partsName} value={part.partsName}>
                                    {part.partsName}
                                  </MenuItem>
                                ))
                            ) : (
                              <MenuItem disabled>
                                {selectedMachineType
                                  ? "No parts available"
                                  : "Select a machine type first"}
                              </MenuItem>
                            )}
                          </Select>

                        </FormControl>

                      </div>
                      <div className="mt-4">
                        <TextField
                          type="text"
                          size="small"
                          fullWidth
                          placeholder="Partsprice"
                          label="Partsprice"
                          name="Partsprice"
                          // value={values.Partsprice}
                          onBlur={handleBlur}
                          // onChange={handleChange}
                          value={formData.Partsprice}
                          onChange={handleInput}

                        />

                      </div>
                      <div className="mt-4">
                        <TextField
                          type="text"
                          size="small"
                          fullWidth
                          placeholder="partsQuantity"
                          label="partsQuantity"
                          name="partsQuantity"
                          // value={values.partsQuantity}
                          onBlur={handleBlur}
                          // onChange={handleChange}
                          value={formData.partsQuantity}
                          onChange={handleInput}


                        />

                      </div>
                      <div className="mt-4">
                        <Button
                          className="mt-3"
                          type="submit" // This will trigger the Formik's handleSubmit function
                          variant="contained"
                          color="primary"
                          onClick={handleClickAddComplaint}

                        // onClick={() => console.log('Button clicked')}

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
                              <strong>parts Details</strong>

                            </Text>
                          </Modal.Header>
                          <Modal.Body>

                            <table className="table table-striped">
                              <thead>
                                <tr>
                                  <th scope="col">#</th>
                                  <th scope="col">partname</th>
                                  <th scope="col">partprice</th>
                                  <th scope="col">partQty</th>
                                  <th scope="col">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                {submittedPartsData.map((part, index) => (
                                  <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{part.partsName}</td>
                                    <td>{part.Partsprice}</td>
                                    <td>{part.partsQuantity}</td>
                                    <td>{(parseFloat(part.Partsprice) * parseFloat(part.partsQuantity)).toFixed(2)}</td> {/* Total Price */}

                                  </tr>
                                ))}
                                {/* Last Row - Total */}
                                <tr>
                                  <th scope="row"></th>
                                  <td>
                                    <strong>Total:</strong>
                                  </td>
                                  <td>
                                    {/* Calculate and display the overall total of all submitted parts */}
                                    {submittedPartsData.reduce(
                                      (total, part) =>
                                        total + parseFloat(part.Partsprice) * parseFloat(part.partsQuantity),
                                      0
                                    ).toFixed(2)}
                                  </td>
                                  <td></td>
                                  <td></td>
                                  <td>

                                    {/* {selectedParts.reduce((acc, partsName) => {
                                      const part = getParts.find(
                                        (part) => part.partsName === partsName
                                      );
                                      const partPrice = part
                                        ? part.partsPrice
                                        : 0;
                                      const quantity =
                                        partQuantities[partsName] || 0;
                                      return acc + partPrice * quantity;
                                    }, 0)} */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>


                          </Modal.Body>

                          <Modal.Footer>
                            {/* <Button auto flat color="error">
                              cancel
                            </Button> */}
                            <div>
                              <Button
                                className="mt-3"
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit} // Call the handleSubmit function when the button is clicked


                              >
                                Approve
                              </Button>
                              {isDataUpdated && (
                                <Sellbill submittedPartsData={submittedPartsData} />
                              )}
                            </div>


                          </Modal.Footer>
                        </Modal>

                      </div>
                    </div>

                  </Form>
                )}

              </Formik>

            </DialogContent>
          </Dialog>

          {/* <Button variant="contained"
            color="primary"
            onClick={handleNavigate}
            style={{
              position: 'absolute',
              top: '10%',
              right: '20rem',
            }}>
            Existing
          </Button> */}
          <Button variant="contained"
            color="primary"
            onClick={handleNavigateparts}
            style={{
              position: 'absolute',
              top: '10%',
              right: '1rem',
              backgroundColor: "rgb(11, 11, 59) "

            }}>
            Add Parts
          </Button>
          <Button variant="contained"
            // color="primary"
            onClick={handleNavigatecomplain}
            style={{
              position: 'absolute',
              top: '10%',
              right: '18rem',
              backgroundColor: "rgb(11, 11, 59) "

            }}>
            Add Complain
          </Button>
          {/* <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsFormOpen(true)}
            style={{
              position: 'absolute',
              top: '10%',
              right: '1rem',
            }}
          >
            Add Parts
          </button> */}


        </div >

      )
      }
    </>
  );
}


export default Dashboard;
