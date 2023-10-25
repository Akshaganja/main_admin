import React from "react";
import UserSidebar from "./UserSidebar";
import Box from "@mui/material/Box";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";

function Renames() {
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
      if (accessType.includes("Renames Engineer and Party Name Page")) {
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

  //   engineer name
  let [engineerData, setEngineerData] = React.useState([]);
  let [engineerName, setEngineerName] = React.useState("");
  let [renameEngineerName, setRenameEngineerName] = React.useState("");

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

  let engNameForEngineer = async () => {
    if (!engineerName) {
      return swal("", "Please Select Engineer Name", "error");
    }

    if (!renameEngineerName) {
      return swal("", "Please Enter Rename Engineer", "error");
    }
    let response = await axios.put(
      "https://spr-cms-babe93641764.herokuapp.com/rename/rename_engineer/" +
        engineerName,
      {
        engineerName: renameEngineerName,
      }
    );
    if (response.data.statusCode === 200) {
      swal("", response.data.message, "success");
      setEngineerName("");
      setRenameEngineerName("");
      getEngineerData();
    } else {
      swal("", response.data.message, "error");
    }
  };

  // party name

  let [partyData, setPartyData] = React.useState([]);
  let [partyName, setPartyName] = React.useState("");
  let [renamePartyName, setRenamePartyName] = React.useState("");
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

  let partyNameForParty = async () => {
    if (!partyName) {
      return swal("", "Please Select Party Name", "error");
    }
    if (!renamePartyName) {
      return swal("", "Please Enter Rename PartyName", "error");
    }
    let response = await axios.put(
      "https://spr-cms-babe93641764.herokuapp.com/rename/rename_party/" + partyName,
      {
        partyName: renamePartyName,
      }
    );
    if (response.data.statusCode === 200) {
      swal("", response.data.message, "success");
      setPartyName("");
      setRenamePartyName("");
      getPartyData();
    } else {
      swal("", response.data.message, "error");
    }
  };

  return (
    <div>
      <UserSidebar getEngineerData={getEngineerData} />
      <Box
        sx={{ width: "100%", pb: "2%", pl: "2%", pr: "2%" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div>
          <div className="text-center mb-3">
            <h3>Rename Section</h3>
          </div>
          <form>
            <h5 className="mb-3">Engineer Name</h5>
            <div className="d-flex flex-wrap gap-3">
              <FormControl sx={{ minWidth: 150 }} size="small">
                <InputLabel>Eng Name</InputLabel>
                <Select
                  label="Eng Name"
                  name="engineerName"
                  value={engineerName}
                  onChange={(e) => setEngineerName(e.target.value)}
                  MenuProps={{
                    style: {
                      maxHeight: 250,
                    },
                  }}
                  required
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

              <TextField
                size="small"
                id="outlined-select-currency"
                label="Rename eng name"
                onChange={(e) => setRenameEngineerName(e.target.value)}
                value={renameEngineerName}
                required
              />
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  size="small"
                  onClick={() => engNameForEngineer()}
                  variant="contained"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
          <form>
            <h5 className="mt-4 mb-3">Party Name</h5>
            <div className="d-flex flex-wrap gap-3">
              <FormControl sx={{ minWidth: 150 }} size="small">
                <InputLabel>Party Name</InputLabel>

                <Select
                  id="demo-simple-select"
                  value={partyName}
                  label="Party Name"
                  onChange={(e) => setPartyName(e.target.value)}
                  MenuProps={{
                    style: {
                      maxHeight: 250,
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

              <TextField
                size="small"
                label="Rename Party name"
                onChange={(e) => setRenamePartyName(e.target.value)}
                value={renamePartyName}
              />
              <div className="d-flex justify-content-center align-items-center">
                <Button
                  size="small"
                  onClick={() => partyNameForParty()}
                  variant="contained"
                >
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Box>
    </div>
  );
}

export default Renames;
