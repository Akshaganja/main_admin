import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  HashRouter as BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login/Login";
import SignUp from "./Components/Login/SignUp";
import EngineerTable from "./Components/EngineerTable";
import PartyTable from "./Components/PartyTable";
import MachineTable from "./Components/MachineTable";
import MachineTypeTable from "./Components/MachineTypeTable";
import DashBoard from "./Components/DashBoard";
import Complaint from "./Components/Complaint";
import ReviewComplainsTable from "./Components/ReviewComplainsTable";
import Report from "./Components/Report";
import PartyViceMachine from "./Components/PartyViceMachine";
import Renames from "./Components/Renames";
import PartsTable from "./Components/PartsTable";
import AddMachineTypeProblems from "./Components/AddMachineTypeProblems";
import PaddingCompaintTable from "./Components/PaddingCompaintTable";
import Attendance from "./Components/Attendance";
import ViewBill from "./Components/Bill View/BillView";
import Viewsellbill from "./Components/Bill View/Viewsellbill";

import AccessTable from "./Components/AccessTable";
import Sellbill from "./Components/Sellbill";
// import jwt_decode from "jwt-decode";
// import Cookies from "universal-cookie";
import MyComponent from "./Components/Not Found/MyComponent";
import Bill from "./Components/Bill";
import PartsApproveOrNot from "./Components/PartsApproveOrNot";
import ForgotPassword from "./Components/Login/ForgotPassword";
import AddNewPassword from "./Components/Login/AddNewPassword";

import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import CompleteComplaint from "./Components/CompleteComplaint";

function App() {
  let cookies = new Cookies();
  const [accessType, setAccessType] = React.useState([]);

  React.useEffect(() => {
    if (cookies.get("token")) {
      const jwt = jwt_decode(cookies.get("token"));
      setAccessType(jwt.accessType);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/forgetpassword" element={<ForgotPassword />} />
          <Route
            path={"/add_new_password/register/reset-password/:id/:token"}
            element={<AddNewPassword />}
          />
          {/* <Route
            path="/reset-password/:id/:token"
            element={<ForgotPassword />}
          /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/error-page" element={<MyComponent />} />
          <Route path="*" element={<MyComponent />} />
          <Route path="/" element={<DashBoard />} />
          {/* <Route path="/bill" element={<Bill />} /> */}
          {/* <Route path="/parts-req" element={<PartsApproveOrNot />} /> */}

          {/* {RoleName.role === "Super Admin" ? (
            <Route path="/access" element={<AccessTable />} />
          ) : null} */}

          {/* Engineer */}
          <>
            {accessType &&
              (() => {
                if (!accessType.includes("Engineer Page")) {
                  return (
                    <Route
                      path="/error-page"
                      element={<Navigate to="/error-page" />}
                    />
                  );
                }
                return <Route path="/eng" element={<EngineerTable />} />;
              })()}
          </>

          {/* Party */}
          <>
            {accessType &&
              (() => {
                if (!accessType.includes("Party Page")) {
                  return (
                    <Route
                      path="/error-page"
                      element={<Navigate to="/error-page" />}
                    />
                  );
                }
                return <Route path="/party" element={<PartyTable />} />;
              })()}
          </>

          {/* MachineType */}
          <>
            {accessType &&
              (() => {
                if (!accessType.includes("Machine Tyoe Page")) {
                  return (
                    <Route
                      path="/error-page"
                      element={<Navigate to="/error-page" />}
                    />
                  );
                }
                return (
                  <Route path="/machine-type" element={<MachineTypeTable />} />
                );
              })()}
          </>

          {/* Machine */}
          <>
            {accessType &&
              (() => {
                if (!accessType.includes("Machine Page")) {
                  return (
                    <Route
                      path="/error-page"
                      element={<Navigate to="/error-page" />}
                    />
                  );
                }
                return <Route path="/machine" element={<MachineTable />} />;
              })()}
          </>
          

          {/* Complaint */}
          <>
            {accessType &&
              (() => {
                if (!accessType.includes("Complaint Page")) {
                  return (
                    <Route
                      path="/error-page"
                      element={<Navigate to="/error-page" />}
                    />
                  );
                }
                return <Route path="/complaint" element={<Complaint />} />;
              })()}
          </>

          {/* Review Complaint */}
          <>
            {accessType &&
              (() => {
                if (!accessType.includes("Review Complaint Page")) {
                  return (
                    <Route
                      path="/error-page"
                      element={<Navigate to="/error-page" />}
                    />
                  );
                }
                return (
                  <Route
                    path="/review-complaint"
                    element={<ReviewComplainsTable />}
                  />
                );
              })()}
          </>

          <>
            {accessType &&
              (() => {
                if (!accessType.includes("Review Complaint Page")) {
                  return (
                    <Route
                      path="/error-page"
                      element={<Navigate to="/error-page" />}
                    />
                  );
                }
                return (
                  <Route
                    path="/complete_complaint"
                    element={<CompleteComplaint />}
                  />
                );
              })()}
          </>

          {/* Report */}
          <>
            {accessType &&
              (() => {
                if (!accessType.includes("Report Page")) {
                  return (
                    <Route
                      path="/error-page"
                      element={<Navigate to="/error-page" />}
                    />
                  );
                }
                return <Route path="/report" element={<Report />} />;
              })()}
          </>

          {/* PartyVice Machine */}
          <>
            {accessType &&
              (() => {
                if (!accessType.includes("Party Vice Machine Page")) {
                  return (
                    <Route
                      path="/error-page"
                      element={<Navigate to="/error-page" />}
                    />
                  );
                }
                return (
                  <Route
                    path="/party-vice-machine"
                    element={<PartyViceMachine />}
                  />
                );
              })()}
          </>

          {/* renames */}
          <>
            {accessType &&
              (() => {
                if (
                  !accessType.includes("Renames Engineer and Party Name Page")
                ) {
                  return (
                    <Route
                      path="/error-page"
                      element={<Navigate to="/error-page" />}
                    />
                  );
                }
                return <Route path="/renames" element={<Renames />} />;
              })()}
          </>

          {/* Parts */}
          <>
            {accessType &&
              (() => {
                if (!accessType.includes("Parts Page")) {
                  return (
                    <Route
                      path="/error-page"
                      element={<Navigate to="/error-page" />}
                    />
                  );
                }
                return <Route path="/parts" element={<PartsTable />} />;
              })()}
          </>

          {/* machinetype-problems */}
          <>
            {accessType &&
              (() => {
                if (!accessType.includes("MachineType Problems Page")) {
                  return (
                    <Route
                      path="/error-page"
                      element={<Navigate to="/error-page" />}
                    />
                  );
                }
                return (
                  <Route
                    path="/machinetype-problems"
                    element={<AddMachineTypeProblems />}
                  />
                );
              })()}
          </>

          {/* padding-complaint */}
          <>
            {accessType &&
              (() => {
                if (!accessType.includes("Pending Complaint Page")) {
                  return (
                    <Route
                      path="/error-page"
                      element={<Navigate to="/error-page" />}
                    />
                  );
                }
                return (
                  <Route
                    path="/padding-complaint"
                    element={<PaddingCompaintTable />}
                  />
                );
              })()}
          </>

          {/* Attendance(Engineer) */}
          <>
            {accessType &&
              (() => {
                if (!accessType.includes("Attendance Page")) {
                  return (
                    <Route
                      path="/error-page"
                      element={<Navigate to="/error-page" />}
                    />
                  );
                }
                return <Route path="/attendance" element={<Attendance />} />;
              })()}
          </>

          {/* Parts req/Approval Page Page*/}
          <>
            {accessType &&
              (() => {
                if (!accessType.includes("Parts req/Approval Page")) {
                  return (
                    <Route
                      path="/error-page"
                      element={<Navigate to="/error-page" />}
                    />
                  );
                }
                return (
                  <Route path="/parts-req" element={<PartsApproveOrNot />} />
                );
              })()}
          </>

           


          {/* Bill Page */}
          <>
            {accessType &&
              (() => {
                if (!accessType.includes("Bill Page")) {
                  return (
                    <Route
                      path="/error-page"
                      element={<Navigate to="/error-page" />}
                    />
                  );
                }
                return <Route path="/bill" element={<Bill />} />;
              })()}
          </>

          

          <>
            {accessType &&
              (() => {
                if (!accessType.includes("Bill Page")) {
                  return (
                    <Route
                      path="/error-page"
                      element={<Navigate to="/error-page" />}
                    />
                  );
                }
                return <Route path="/bill-view/:id" element={<ViewBill />} />;
              })()}
          </>

          {/* <Route path="/eng" element={<EngineerTable />} /> */}
          {/* <Route path="/party" element={<PartyTable />} /> */}
          {/* <Route path="/machine-type" element={<MachineTypeTable />} /> */}
          {/* <Route path="/machine" element={<MachineTable />} /> */}
          {/* <Route path="/complaint" element={<Complaint />} /> */}
          {/* <Route path="/review-complaint" element={<ReviewComplainsTable />} /> */}
          {/* <Route path="/report" element={<Report />} /> */}
          {/* <Route path="/party-vice-machine" element={<PartyViceMachine />} /> */}
          {/* <Route path="/renames" element={<Renames />} /> */}
          <Route path="/access" element={<AccessTable />} />
          <Route path="/sellbill" element={<Sellbill/>} />
          <>
            {accessType &&
              (() => {
                if (!accessType.includes("Bill Page")) {
                  return (
                    <Route
                      path="/error-page"
                      element={<Navigate to="/error-page" />}
                    />
                  );
                }
                return <Route path="/sellbill-view/:customerId" element={<Viewsellbill />} />;
              })()}
          </>

          {/* <Route path="/padding-complaint" element={<PaddingCompaintTable />} /> */}
          {/* <Route
            path="/machinetype-problems"
            element={<AddMachineTypeProblems />}
          /> */}
          {/* <Route path="/parts" element={<PartsTable />} /> */}
          {/* <Route path="/attendance" element={<Attendance />} /> */}
          {/* <Route path="/bill-view/:id" element={<ViewBill />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
