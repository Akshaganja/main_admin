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
import TextField from "@mui/material/TextField";
import swal from "sweetalert";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { RotatingLines } from "react-loader-spinner";
import jwt_decode from "jwt-decode";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

const headCells = [
  {
    label: "Comp Number",
  },
  {
    label: "Party Name",
  },
  {
    label: "Machine Type",
  },
  {
    label: "Machine Number",
  },
];

function Row(props) {
  const { row, handleClick, isItemSelected, labelId } = props;
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

  let [deniedReason, setDeniedReason] = useState();
  const [error, setError] = useState(false);


  // Approve
  let handleSubmitDone = async (id) => {
    let response = await axios.put(
      "https://spr-cms-babe93641764.herokuapp.com/parts/requset_for_admin_approval/" +
        id,
      { isAdminApproval: true }
    );
    if (response.data.statusCode === 200) {
      setModelShow(false);
      window.location.reload();
       swal("", "Approval success fully", "success");
    }
  };

  // Denide Approve and Add Reason
  const handleSubmitCancel = async (id) => {
    if (deniedReason.trim() === "") {
      setError(true);
      return;
    }

    try {
      let response = await axios.put(
        "https://spr-cms-babe93641764.herokuapp.com/parts/requset_for_admin_approval/" +
          id,
        { isAdminApproval: false, approvaldenied: deniedReason }
      );

      if (response.data.statusCode === 200) {
        setModelShow(false);
        window.location.reload();
        swal("", "Approval Cancel Successfully", "success");
      }
    } catch (error) {
      console.log("Error occurred:", error);
    }
  };

  // let handleSubmitCancel = async (id) => {
  //   let response = await axios.put(
  //     "https://spr-cms-babe93641764.herokuapp.com/parts/requset_for_admin_approval/" +
  //       id,
  //     { isAdminApproval: false, approvaldenied: deniedReason }
  //   );
  //   if (response.data.statusCode === 200) {
  //     setModelShow(false);
  //     window.location.reload();
  //      swal("", "Approval Cancel Successfully", "success");
  //   }
  // };

  const [isTextFieldVisible, setIsTextFieldVisible] = useState(false);

  const handleClearIconClick = () => {
    setIsTextFieldVisible((prevState) => !prevState);
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

        <TableCell align="center">{row.comId}</TableCell>
        <TableCell align="center">{row.partyName}</TableCell>
        <TableCell align="center">{row.machineType}</TableCell>
        <TableCell align="center">{row.machineNumber}</TableCell>

        {accessType &&
          (() => {
            if (!accessType.includes("Allow To Edit")) {
              return null;
            }
            return (
              <TableCell align="center">
                <Button
                  onClick={() => {
                    setModelShow(true);
                  }}
                >
                  Parts Req
                </Button>
                {/* <button
                  class="btn btn-default"
                  onClick={() => seletedEditData(row)}
                >
                  <EditIcon />
                </button> */}
              </TableCell>
            );
          })()}
      </TableRow>

      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={modelShow}
        onClose={() => setModelShow(false)}
      >
        <DialogTitle>
          {"Parts Request"}
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
                  PartsName
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Parts Price
                </TableCell>
                <TableCell align="center" className="fw-bold">
                  Parts Quantity
                </TableCell>

                <TableCell align="center" className="fw-bold">
                  Total
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {row.partsDetails?.map((row, index) => (
                <TableRow key={row.name}>
                  <TableCell align="center">{row.partsName}</TableCell>
                  <TableCell align="center">{row.partsPrice}</TableCell>
                  <TableCell align="center">{row.partsQty}</TableCell>
                  <TableCell align="center">
                    {row.partsQty * row.partsPrice}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <div className="d-flex justify-content-end mt-5 gap-3">
              {row.isAdminApproval === false || row.isAdminApproval === true ? (
                row.isAdminApproval === false ? (
                  "Not Approval ❌"
                ) : (
                  "Approval ✅"
                )
              ) : (
                <>
                  <Button onClick={() => handleSubmitDone(row._id)}>
                    <DoneIcon />
                  </Button>
                  <Button onClick={handleClearIconClick}>
                    <ClearIcon />
                  </Button>
                </>
              )}

              {/* {row.isAdminApproval === true || row.isAdminApproval === false ? (
                row.isAdminApproval === true ? (
                  "Approval"
                ) : null
              ) : (
                <>
                  <Button onClick={() => handleSubmitDone(row._id)}>
                    <DoneIcon />
                  </Button>
                  <Button onClick={handleClearIconClick}>
                    <ClearIcon />
                  </Button>
                </>
              )} */}
            </div>

            {isTextFieldVisible && (
              <div className="d-flex justify-content-end mt-3 gap-2">
                <div>
                <TextField
        type="text"
        size="small"
        name="deniedReason"
        fullWidth
        placeholder="Add Reason"
        label="Add Reason"
        onChange={(e) => {
          setDeniedReason(e.target.value);
          setError(false); // Reset the error status when the user starts typing
        }}
        value={deniedReason}
        error={error}
        helperText={error ? "Denied Reason is required." : ""}
      />
                  {/* <TextField
                    type="text"
                    size="small"
                    name="deniedReason"
                    fullWidth
                    placeholder="Add Reason"
                    label="Add Reason"
                    onChange={(e) => setDeniedReason(e.target.value)}
                    value={deniedReason}
                    
                  /> */}
                </div>
                <div>
                  <Button onClick={() => handleSubmitCancel(row._id, {})}>
                    Done
                  </Button>
                </div>
              </div>
            )}
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
                  {/* <Typography variant="p" gutterBottom component="div">
                    <span className="fw-bold">Is Warrnaty?:</span>{" "}
                    {row.isWarranty}
                  </Typography> */}
                  {row.isAdminApproval === false ? (
                    <Typography variant="p" gutterBottom component="div">
                      <span className="fw-bold">Not Approval Reason:</span>{" "}
                      {row.approvaldenied}
                    </Typography>
                  ) : null}
                </div>
                <div></div>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function PartsApproveOrNot() {
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

  let [partsApproveOrNotData, setPartsApproveOrNot] = useState([]);
  let [countData, setCountData] = useState(0);
  let [loader, setLoader] = useState(true);
  // pagination
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  let getData = async () => {
    let res = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/partsreq/get_parts_request",
      {
        machineType: localStorage.getItem("machine"),
        pageSize: rowsPerPage,
        pageNumber: page,
      }
    );
    setLoader(false);
    setPartsApproveOrNot(res.data.data);
    setCountData(res.data.count);
    // tempData = [...res.data.data];
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
      const newSelected = partsApproveOrNotData.map((n) => n._id);
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
        "https://spr-cms-babe93641764.herokuapp.com/partsreq/delete-partsapproveornot",
        selected
      )
      .then((response) => {
        if (response.data.statusCode === 200) {
          getData();
          setSelected([]);
          //  swal("", response.data.message, "success");
          swal("", "Parts request deleted  successfully", "success");
        }
      });
  };

  // Searchbar
  let handleSearchData = async (values) => {
    let res = await axios.post(
      "https://spr-cms-babe93641764.herokuapp.com/partsreq/search-partsapproveornot",
      {
        search: values,
      }
    );
    if (res.data.statusCode === 200) {
      if (values !== "") {
        setPartsApproveOrNot(res.data.data);
      } else {
        getData();
      }
    }
  };

  React.useEffect(() => {
    handleSearchData();
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

  return (
    <>
      <UserSidebar getData={getData} />
      <Box sx={{ width: "100%", pb: "2%", pl: "2%", pr: "2%" }}>
        <>
          {accessType &&
            (() => {
              if (!accessType.includes("engineer form")) {
                return null;
              }
              return <div></div>;
            })()}
        </>

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
                Parts Approval
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
                                selected.length < partsApproveOrNotData.length
                              }
                              checked={
                                partsApproveOrNotData?.length > 0 &&
                                selected.length ===
                                  partsApproveOrNotData?.length
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
                  {partsApproveOrNotData?.map((row, index) => {
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
    </>
  );
}
