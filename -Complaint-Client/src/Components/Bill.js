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
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState } from "react";
import Cookies from "universal-cookie";
import swal from "sweetalert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { RotatingLines } from "react-loader-spinner";
import jwt_decode from "jwt-decode";
import DownloadDoneSharpIcon from "@mui/icons-material/DownloadDoneSharp";
import CancelPresentationSharpIcon from "@mui/icons-material/CancelPresentationSharp";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { ClassSharp } from "@mui/icons-material";

const headCells = [
  {
    label: "Bill Number",
  },
  {
    label: "Comp Number",
  },
  {
    label: "Party Name",
  },
  {
    label: "MachineType",
  },
  {
    label: "Payment Status",
  },
];

function Row(props) {
  const { row, handleClick, isItemSelected, labelId, getData } = props;
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

  let paymentsStatusDone = (id) => {
    swal("Are You Sure You Want TO Payments Status Done ?", {
      buttons: ["No", "Yes"],
    }).then(async (buttons) => {
      if (buttons === true) {
        let response = await axios.put(
          "https://spr-cms-babe93641764.herokuapp.com/bill/bill/" + id,
          { isPaymentsStatus: true }
        );
        if (response.data.statusCode === 200) {
          getData();
          swal("", "Payment Received", "success");
        }
      }
    });
  };

  let paymentsStatusNotDone = (id) => {
    swal("Are You Sure You Want Payments Status Not Done ?", {
      buttons: ["No", "Yes"],
    }).then(async (buttons) => {
      if (buttons === true) {
        let response = await axios.put(
          "https://spr-cms-babe93641764.herokuapp.com/bill/bill/" + id,
          { isPaymentsStatus: false }
        );
        if (response.data.statusCode === 200) {
          getData();
          swal("", "Payment Not Received", "success");
        }
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

        <TableCell align="center">{row.billId}</TableCell>
        <TableCell align="center">{row.comId}</TableCell>
        <TableCell align="center">{row.partyName}</TableCell>
        <TableCell align="center">{row.machineType}</TableCell>
        <TableCell align="center">
          {row.isPaymentsStatus ? "YES" : "NO"}
        </TableCell>
        {accessType &&
          (() => {
            if (!accessType.includes("Allow To Edit")) {
              return null;
            }
            return (
              <TableCell align="center">
                <div className="d-flex justify-content-center gap-2 align-items-center">
                  {/* <Button
                    variant="success"
                    onClick={() => paymentsStatusDone(row._id)}
                  >
                    <DownloadDoneSharpIcon />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => paymentsStatusNotDone(row._id)}
                  >
                    <CancelPresentationSharpIcon />
                  </Button> */}

                  {row.isPaymentsStatus === false ? (
                    <Button
                      variant="success"
                      onClick={() => paymentsStatusDone(row._id)}
                    >
                      <DownloadDoneSharpIcon />
                    </Button>
                  ) : null}

                  {row.isPaymentsStatus === false ? (
                    <Button
                      variant="danger"
                      onClick={() => paymentsStatusNotDone(row._id)}
                    >
                      <CancelPresentationSharpIcon />
                    </Button>
                  ) : null}

                  <Button onClick={() => navigate("/bill-view/" + row._id)}>
                    View Bill
                  </Button>
                </div>
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
              <div>
                <div>
                  <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Create At : </span> {row.createAt}
                  </Typography>
                </div>
                <div>
                  <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Update At : </span>{" "}
                    {row.upadateAt}
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

export default function Bill() {
  let navigate = useNavigate();
  let cookies = new Cookies();
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
        "https://spr-cms-babe93641764.herokuapp.com/register/auth",
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

  let [engineerData, setEngineerData] = useState([]);
  let [countData, setCountData] = useState(0);
  let [loader, setLoader] = useState(true);
  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  //   let [loader, setLoader] = React.useState(true);
  let getData = async () => {
    let res = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/bill/get_bill_pagination",
      {
        machineType: localStorage.getItem("machine"),
        // isPaymentsStatus: selectedStatus, // Add this line
        pageSize: rowsPerPage,
        pageNumber: page,
      }
    );
    setLoader(false);
    setEngineerData(res.data.data);
    setCountData(res.data.billCount);
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
      .post("https://spr-cms-babe93641764.herokuapp.com/bill/delete_bill", selected)
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
    let res = await axios.post("https://spr-cms-babe93641764.herokuapp.com/bill/search-bill", {
      search: values,
    });
    if (res.data.statusCode === 200) {
      if (values !== "") {
        console.log(res.data.data);
        setEngineerData(res.data.data);
      } else {
        getData();
      }
    }
  };

  
  const [data, setData] = useState({
    partyName: "",
    isPaymentsStatus: "",
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
      "https://spr-cms-babe93641764.herokuapp.com/bill/find_status/",
      {
        partyName: data.partyName,
        isPaymentsStatus: data.isPaymentsStatus,
      }
    );
    if (response.data.statusCode === 200) {
      setEngineerData(response.data.findByisPaymentsStatus);
      console.log("isPaymentsStatus from request:", response.body.isPaymentsStatus);
    }
  };

  React.useEffect(() => {
    if (data) {
      filterDate();
    }
  }, [data]);

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

  let [partsDetails, setPartsDetails] = React.useState([]);

  let [totalPrice, setTotalPrice] = useState();

  React.useEffect(() => {
    var total = 0;
    for (let i = 0; i < partsDetails.length; i++) {
      let priceandqty = partsDetails[i]?.partsPrice * partsDetails[i]?.partsQty;
      total += priceandqty;
      console.log(total);
    }
    setTotalPrice(total);
  }, [partsDetails]);

  // const [selectedStatus, setSelectedStatus] = useState(""); // Initialize with an empty string

  return (
    <>
      <UserSidebar getData={getData} />
      <Box sx={{ width: "100%", pb: "2%", pl: "2%", pr: "2%" }}>
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
                Bill
              </Typography>
            )}
            
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
  labelId="demo-simple-select-label"
  label="Status"
  name="isPaymentsStatus"
  onChange={updateInputs}

>
  <MenuItem value="">Select an option</MenuItem>
  <MenuItem value={true}>Paid</MenuItem>
  <MenuItem value={false}>Unpaid</MenuItem>
  
  
</Select>


          </FormControl>
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
                        getData={getData}
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

      <Dialog fullWidth open={modelShow} onClose={() => setModelShow(false)}>
        <DialogTitle>
          {"Parts Bill"}
          {/* <IconButton
            aria-label="close"
            onClick={() => setModelShow(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton> */}
        </DialogTitle>

        <DialogContent dividers>
          {/* <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="fw-bold">
                  Date
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Parts Name
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Parts Price
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Parts Quantity
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Total Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {partsDetails?.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell align="center">{row.currentDate}</TableCell>
                  <TableCell align="center">{row.partsName}</TableCell>
                  <TableCell align="center">{row.partsPrice}</TableCell>
                  <TableCell align="center">{row.partsQty}</TableCell>
                  <TableCell align="center">
                    {row.partsQty * row.partsPrice}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center">Total : </TableCell>
                <TableCell align="center">{totalPrice}</TableCell>
              </TableRow>
            </TableBody>
          </Table> */}

          <TableContainer>
            <Table sx={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell className="fw-bold" align="center" colSpan={4}>
                    Details
                  </TableCell>
                  <TableCell className="fw-bold" align="right">
                    Price
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="fw-bold">Date</TableCell>
                  <TableCell className="fw-bold">Parts Name</TableCell>
                  <TableCell className="fw-bold" align="right">
                    Qty.
                  </TableCell>
                  <TableCell className="fw-bold" align="right">
                    Price
                  </TableCell>
                  <TableCell className="fw-bold" align="right">
                    Sum
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {partsDetails.map((row) => (
                  <TableRow key={row.desc}>
                    <TableCell>{row.currentDate}</TableCell>
                    <TableCell>{row.partsName}</TableCell>
                    <TableCell align="right">{row.partsQty}</TableCell>
                    <TableCell align="right">{row.partsPrice}</TableCell>
                    <TableCell align="right">
                      {row.partsQty * row.partsPrice}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="fw-bold" align="right" colSpan={4}>
                    Total
                  </TableCell>
                  <TableCell className="fw-bold" align="right">
                    {totalPrice}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </>
  );
}
