import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import UserSidebar from "./UserSidebar";
import axios from "axios";
import Cookies from "universal-cookie";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import jwt_decode from "jwt-decode";

// let tempData = [];

function PartyViceMachine() {
  let navigate = useNavigate();
  let cookies = new Cookies();

  const [accessType, setAccessType] = React.useState(null);
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
      if (accessType.includes("Party Vice Machine Page")) {
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

  React.useEffect(() => {
    chackAuth();
  }, [cookies.get("token")]);

  let [partyData, setPartyData] = React.useState([]);
  let [loader, setLoader] = React.useState(true);
  let [countData, setCountData] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  let getData = async () => {
    let response = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/machine/party_name_vice_machine_pagination",
      {
        machineType: localStorage.getItem("machine"),
        partyCity: localStorage.getItem("city"),
        pageSize: rowsPerPage,
        pageNumber: page,
      }
    );
    setLoader(false);
    setCountData(response.data.partryViceMachineCount);
    setPartyData(response.data.data);
    // tempData = [...response.data.data];
  };

  React.useEffect(() => {
    getData();
  }, [rowsPerPage, page]);

  // Searchbar
  let handleSearchData = async (values) => {
    let res = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/machine/search-party-vice-machnie",
      { search: values }
    );
    if (res.data.statusCode === 200) {
      if (values !== "") {
        setPartyData(res.data.data);
      } else {
        getData();
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let [modelShow, setModelShow] = React.useState(false);
  let [party_name, setPartName] = React.useState("");
  let [detailsOfparty, setDetailsOfparty] = React.useState([]);

  return (
    <>
      <div>
        <UserSidebar getData={getData} />
        <Box sx={{ width: "100%", pb: "2%", pl: "2%", pr: "2%" }}>
          <Paper>
            <Toolbar
              className="border-top border-bottom"
              sx={{
                pl: { sm: 3 },
                pr: { xs: 1, sm: 1 },
              }}
            >
              <Typography
                sx={{ flex: "1 1 100%" }}
                color="inherit"
                variant="h6"
                id="tableTitle"
              >
                Party Vice Machine
              </Typography>

              <form className="col-lg-2">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  onChange={(e) => handleSearchData(e.target.value)}
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
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
              <TableContainer sx={{ width: "100%" }}>
                <Table sx={{ width: "100%" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {/* <TableCell align="center" className="fw-bold">
                      #
                    </TableCell> */}
                      <TableCell align="center" className="fw-bold">
                        Party Name
                      </TableCell>
                      <TableCell align="center" className="fw-bold">
                        Machine No
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {partyData?.map((row, index) => (
                      <TableRow
                        key={row.name}
                        className="party-details-form-machine"
                        onClick={() => {
                          setModelShow(true);
                          setPartName(row.partyName);
                          setDetailsOfparty(row.machineDetails);
                        }}
                      >
                        {/* <TableCell align="center">{row.}</TableCell> */}
                        <TableCell align="center">{row.partyName}</TableCell>
                        <TableCell align="center">{row.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, 100]}
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
      </div>
      <Dialog fullWidth open={modelShow} onClose={() => setModelShow(false)}>
        <DialogTitle>
          {"Machine Form"} {party_name}
          <IconButton
            aria-label="close"
            onClick={() => setModelShow(false)}
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
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="fw-bold">
                  #
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Machine Type
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Machine No
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {detailsOfparty?.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{row.machineType}</TableCell>
                  <TableCell
                    align="center"
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate("/machine?machineNumber=" + row.machineNumber)
                    }
                  >
                    {row.machineNumber}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default PartyViceMachine;
