import * as React from "react";
import Box from "@mui/material/Box";
import PropTypes from 'prop-types';
import UserSidebar from "./UserSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "universal-cookie";
// import { savePDF } from "@progress/kendo-react-pdf";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Typography from "@mui/material/Typography";
import EngineerReport from "./EngineerReport/EngineerReport"
import SupportEngineerReport from "./SupportEngineerReport/SupportEngineerReport"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import jwt_decode from "jwt-decode";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function Report() {
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
      if (accessType.includes("Report Page")) {
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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
      <UserSidebar />
      <Box sx={{ width: "100%", pb: "2%", pl: "2%", pr: "2%" }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Engineer Report" id={`simple-tab-${0}`} aria-controls={`simple-tabpanel-${0}`} />
            <Tab label="Support Engineer Report" id={`simple-tab-${1}`} aria-controls={`simple-tabpanel-${1}`} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <EngineerReport/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SupportEngineerReport/>
        </TabPanel>
      </Box>
    </>
  );
}
