import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import logo from "../Components/logo/logoo.png";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "axios";
// import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Select, MenuItem } from "@material-ui/core";
import Cookies from "universal-cookie";

import Collapse from "@material-ui/core/Collapse";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import jwt_decode from "jwt-decode";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ReportIcon from "@mui/icons-material/Report";
import MicrowaveIcon from "@mui/icons-material/Microwave";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EngineeringIcon from "@mui/icons-material/Engineering";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import DomainSharpIcon from "@mui/icons-material/DomainSharp";
import ConstructionSharpIcon from "@mui/icons-material/ConstructionSharp";
import AllInboxSharpIcon from "@mui/icons-material/AllInboxSharp";
import AppRegistrationSharpIcon from "@mui/icons-material/AppRegistrationSharp";
const drawerWidth = 230;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(2.5),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft({
  getData,
  getPartyData,
  getEngineerData,
  getFreeEnginnerOnCardData,
}) {
  let navigate = useNavigate();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let cookies = new Cookies();

  let logOut = () => {
    cookies.remove("token");
    navigate("/login");
  };

  const [accessType, setAccessType] = useState(null);
  const [Role, setRole] = useState("");

  React.useEffect(() => {
    if (cookies.get("token")) {
      const jwt = jwt_decode(cookies.get("token"));
      setAccessType(jwt.accessType);
      setRole(jwt.role);
    } else {
      navigate("/login");
    }
  }, [cookies, navigate]);

  const handleChange = (e) => {
    localStorage.setItem("city", e.target.value);
    getData();
    getPartyData();
    getEngineerData();
    getFreeEnginnerOnCardData();
  };

  const handleMachineChange = (e) => {
    localStorage.setItem("machine", e.target.value);
    getData();
    getPartyData();
    getEngineerData();
    getFreeEnginnerOnCardData();
  };

  let [machineTypeData, setMachineTypeData] = useState();
  let getMachineTypeData = async () => {
    let data = await axios.get(
      "http://localhost:5000/machinetype/machine-type"
    );
    setMachineTypeData(data.data.data);
  };

  React.useEffect(() => {
    getMachineTypeData();
  }, []);

  const [Complaint, setComplaint] = React.useState(false);
  const handleComplaintClick = () => {
    setComplaint((prev) => !prev);
  };

  const [Machine, setMachine] = React.useState(false);
  const handleMachineClick = () => {
    setMachine((prev) => !prev);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" className="app-bar" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Avatar alt="Diamond" src={logo} />
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            SPARROW
          </Typography>

          <div className="d-flex align-items-center gap-4">
            <div className="Welcome">Welcome {Role}</div>
            <Select
              className="select-city-or-machine"
              disableUnderline
              value={localStorage.getItem("machine")}
              onChange={handleMachineChange}
              MenuProps={{
                style: {
                  maxHeight: 300,
                },
              }}
            >
              {/* <MenuItem value="All">All</MenuItem> */}
              {machineTypeData?.map((option) => (
                <MenuItem key={option?.machineType} value={option?.machineType}>
                  {option.machineType}
                </MenuItem>
              ))}
              <MenuItem value="All">All</MenuItem>
            </Select>
          </div>
          <div >
            <Select
              className="select-city-or-machine"
              disableUnderline
              // onClick={handleCookie}
              value={localStorage.getItem("city")}
              onChange={handleChange}
              MenuProps={{
                style: {
                  maxHeight: 210,
                },
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Bhavnagar">Bhavnagar</MenuItem>
              <MenuItem value="Surat">Surat</MenuItem>
            </Select>
          </div>

          <Button
            color="inherit"
            onClick={() => {
              logOut();
            }}
          >
            <LogoutIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader className="d-flex flex-row justify-content-between align-items-center">
          <Avatar alt="Sparrow" src={logo} />
          <div>{Role}</div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <List className="bg_img">
          {/* Dashboard */}
          <Divider />
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                navigate("/");
                handleDrawerClose()
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </ListItem>
          <Divider />

          {accessType &&
            (() => {
              if (!accessType.includes("Access")) {
                return null;
              }
              return (
                <>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate("/access");
                        handleDrawerClose();
                      }}
                    >
                      <ListItemIcon>
                        <ManageAccountsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Access Table" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              );
            })()}

          {/* Complaint */}

          {accessType &&
            (() => {
              if (
                !accessType.includes(
                  "Review Complaint Page" ||
                  "Complaint Page" ||
                  "Pending Complaint Page"
                )
              ) {
                return null;
              }
              return (
                <>
                  <ListItem button onClick={handleComplaintClick}>
                    <ListItemIcon>
                      <HistoryEduIcon />
                    </ListItemIcon>
                    <ListItemText primary="Complain" />
                    {Complaint ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ListItem>
                </>
              );
            })()}

          <Collapse in={Complaint} timeout="auto" unmountOnExit>
            <List>
              {accessType &&
                (() => {
                  if (!accessType.includes("Complaint Page")) {
                    return null;
                  }
                  return (
                    <>
                      <Divider />
                      <ListItem disablePadding style={{ fontSize: "10px" }}>
                        <ListItemButton
                          sx={{ pl: 6 }}
                          onClick={() => {
                            navigate("/complaint");
                            handleDrawerClose();

                          }}
                        >
                          <ListItemText
                            primaryTypographyProps={{ fontSize: "15px" }}
                            primary="All Complain"
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </>
                  );
                })()}

              {accessType &&
                (() => {
                  if (!accessType.includes("Pending Complaint Page")) {
                    return null;
                  }
                  return (
                    <>
                      <Divider />
                      <ListItem disablePadding>
                        <ListItemButton
                          sx={{ pl: 6 }}
                          onClick={() => {
                            navigate("/padding-complaint");
                            handleDrawerClose();

                          }}
                        >
                          <ListItemText
                            primaryTypographyProps={{ fontSize: "15px" }}
                            primary="Padding Complain"
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </>
                  );
                })()}

              {accessType &&
                (() => {
                  if (!accessType.includes("Review Complaint Page")) {
                    return null;
                  }
                  return (
                    <>
                      <Divider />
                      <ListItem disablePadding>
                        <ListItemButton
                          sx={{ pl: 6 }}
                          onClick={() => {
                            navigate("/review-complaint");
                            handleDrawerClose();
                          }
                          }
                        >
                          <ListItemText
                            primaryTypographyProps={{ fontSize: "15px" }}
                            primary="Review Complain"
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </>
                  );
                })()}

              {accessType &&
                (() => {
                  if (!accessType.includes("Review Complaint Page")) {
                    return null;
                  }
                  return (
                    <>
                      <Divider />
                      <ListItem disablePadding>
                        <ListItemButton
                          sx={{ pl: 6 }}
                          onClick={() => {
                            navigate("/complete_complaint");
                            handleDrawerClose();

                          }}
                        >
                          <ListItemText
                            primaryTypographyProps={{ fontSize: "15px" }}
                            primary="Complete Complain"
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </>
                  );
                })()}
            </List>
          </Collapse>

          {/* {accessType &&
            (() => {
              if (!accessType.includes("Complaint Page")) {
                return null;
              }
              return (
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => navigate("/complaint")}>
                      <ListItemIcon>
                        <ExitToAppIcon />
                      </ListItemIcon>
                      <ListItemText primary="All Complaint" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              );
            })()} */}

          {/* {accessType &&
            (() => {
              if (!accessType.includes("Pending Complaint Page")) {
                return null;
              }
              return (
                <>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => navigate("/padding-complaint")}
                    >
                      <ListItemIcon>
                        <ExitToAppIcon />
                      </ListItemIcon>
                      <ListItemText primary="Padding Complaint" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              );
            })()}

          {accessType &&
            (() => {
              if (!accessType.includes("Review Complaint Page")) {
                return null;
              }
              return (
                <>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => navigate("/review-complaint")}
                    >
                      <ListItemIcon>
                        <ExitToAppIcon />
                      </ListItemIcon>
                      <ListItemText primary="Complainnt Review" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              );
            })()} */}

          {accessType &&
            (() => {
              if (
                !accessType.includes(
                  "Machine Page" || "Party Vice Machine Page"
                )
              ) {
                return null;
              }
              return (
                <>
                  <Divider />
                  <ListItem button onClick={handleMachineClick}>
                    <ListItemIcon>
                      <MicrowaveIcon />
                    </ListItemIcon>
                    <ListItemText primary="Machine" />
                    {Machine ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ListItem>
                </>
              );
            })()}

          <Collapse in={Machine} timeout="auto" unmountOnExit>
            <List>
              {accessType &&
                (() => {
                  if (!accessType.includes("Machine Page")) {
                    return null;
                  }
                  return (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton
                          sx={{ pl: 6 }}
                          onClick={() => {
                            navigate("/machine");
                            handleDrawerClose();

                          }}
                        >
                          <ListItemText
                            primaryTypographyProps={{ fontSize: "15px" }}
                            primary="All Machine"
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </>
                  );
                })()}

              {accessType &&
                (() => {
                  if (!accessType.includes("Party Vice Machine Page")) {
                    return null;
                  }
                  return (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton
                          sx={{ pl: 6 }}
                          onClick={() => {
                            navigate("/party-vice-machine");
                            handleDrawerClose();
                          }
                          }
                        >
                          <ListItemText
                            primaryTypographyProps={{ fontSize: "15px" }}
                            primary="Machine Detail"
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider />
                    </>
                  );
                })()}
            </List>
          </Collapse>

          {accessType &&
            (() => {
              if (!accessType.includes("Report Page")) {
                return null;
              }
              return (
                <>
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => {
                      navigate("/report");
                      handleDrawerClose();
                    }
                    }>
                      <ListItemIcon>
                        <ReportIcon />
                      </ListItemIcon>
                      <ListItemText primary="Report" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              );
            })()}

          {accessType &&
            (() => {
              if (!accessType.includes("Machine Tyoe Page")) {
                return null;
              }
              return (
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => {
                      navigate("/machine-type");
                      handleDrawerClose();

                    }
                    }>
                      <ListItemIcon>
                        <PrecisionManufacturingIcon />
                      </ListItemIcon>
                      <ListItemText primary="Machine Type" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              );
            })()}

          {accessType &&
            (() => {
              if (!accessType.includes("Party Page")) {
                return null;
              }
              return (
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => {
                      navigate("/party");
                      handleDrawerClose();
                    }
                    }>
                      <ListItemIcon>
                        <PeopleAltIcon />
                      </ListItemIcon>
                      <ListItemText primary="Party" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              );
            })()}

          {accessType &&
            (() => {
              if (!accessType.includes("Engineer Page")) {
                return null;
              }
              return (
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => {
                      navigate("/eng");
                      handleDrawerClose();
                    }}>
                      <ListItemIcon>
                        <EngineeringIcon />
                      </ListItemIcon>
                      <ListItemText primary="Engineer" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              );
            })()}

          {accessType &&
            (() => {
              if (
                !accessType.includes("Renames Engineer and Party Name Page")
              ) {
                return null;
              }
              return (
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => {
                      navigate("/renames");
                      handleDrawerClose();
                    }}>
                      <ListItemIcon>
                        <DriveFileRenameOutlineRoundedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Rename" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              );
            })()}

          {accessType &&
            (() => {
              if (!accessType.includes("Parts Page")) {
                return null;
              }
              return (
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => {
                      navigate("/parts");
                      handleDrawerClose();
                    }}>
                      <ListItemIcon>
                        <DomainSharpIcon />
                      </ListItemIcon>
                      <ListItemText primary="Parts" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              );
            })()}

          {accessType &&
            (() => {
              if (!accessType.includes("MachineType Problems Page")) {
                return null;
              }
              return (
                <>
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate("/machinetype-problems");
                        handleDrawerClose();
                      }}
                    >
                      <ListItemIcon>
                        <ConstructionSharpIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add Machine Problems" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              );
            })()}

          {accessType &&
            (() => {
              if (!accessType.includes("Bill Page")) {
                return null;
              }
              return (
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => {
                      navigate("/bill");
                      handleDrawerClose();
                    }}>
                      <ListItemIcon>
                        <AllInboxSharpIcon />
                      </ListItemIcon>
                      <ListItemText primary="Bill" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              );
            })()}

          {accessType &&
            (() => {
              if (!accessType.includes("Bill Page")) {
                return null;
              }
              return (
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => {
                      navigate("/sellbill");
                      handleDrawerClose();
                    }}>
                      <ListItemIcon>
                        <AllInboxSharpIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sellbill" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              );
            })()}





          {accessType &&
            (() => {
              if (!accessType.includes("Parts req/Approval Page")) {
                return null;
              }
              return (
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => {
                      navigate("/parts-req");
                      handleDrawerClose();
                    }}>
                      <ListItemIcon>
                        <ExitToAppIcon />
                      </ListItemIcon>
                      <ListItemText primary="Parts Request" />
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              );
            })()}

          {accessType &&
            (() => {
              if (!accessType.includes("Attendance Page")) {
                return null;
              }
              return (
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => {
                      navigate("/attendance");
                      handleDrawerClose();
                    }}>
                      <ListItemIcon>
                        <AppRegistrationSharpIcon />
                      </ListItemIcon>
                      <ListItemText primary="Attendance" />
                    </ListItemButton>
                  </ListItem>
                </>
              );
            })()}

          {/* <ListItem button onClick={handleClick}>
        <ListItemIcon> <PersonIcon /></ListItemIcon>
        <ListItemText primary="Sidebar" />
        {multiSidebar ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={multiSidebar} timeout="auto" unmountOnExit>
      <List>





        
          {/* <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Attendance" />
            {multiSidebar ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={multiSidebar} timeout="auto" unmountOnExit>
            <List>
              <ListItem
                disablePadding
                onClick={() => navigate("/engineer-attendance")}
              >
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText
                    style={{ fontSize: "12px" }}
                    primary="All Attendance"
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText
                    style={{ fontSize: "12px" }}
                    primary="Date Vice Attendance"
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse> */}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
