import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import UserSidebar from "./UserSidebar";

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "calc(100vh - 64px)",
};

const leftAlign = {
  textAlign: "left",
};

function Bill() {
  const [billData, setBillData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteMessage, setDeleteMessage] = useState(""); // State for delete message
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/sellparts/get_sellparts")
      .then((response) => {
        if (Array.isArray(response.data.data) && response.data.data.length > 0) {
          setBillData(response.data.data);
        } else {
          console.error("No data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const deleteRecord = (id) => {
    axios
      .delete(`http://localhost:5000/sellparts/delete_sellpart/${id}`)
      .then(() => {
        setBillData((prevData) =>
          prevData.filter((row) => row._id !== id)
        );
        setDeleteMessage("Delete record successfully"); // Set the delete message
        setTimeout(() => {
          setDeleteMessage(""); // Clear the delete message after a few seconds
        }, 3000); // You can adjust the duration as needed
      })
      .catch((error) => {
        console.error("Error deleting record:", error);
      });
  };

  return (
    <div style={centerStyle}>
      <UserSidebar />

      <TableContainer component={Paper} style={{ maxWidth: "90%" }}>
        <Table aria-label="bill-table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={9}>
                <Typography variant="h5" style={leftAlign} color="primary" >
                  Sell Bill
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <b>#</b>
              </TableCell>
              <TableCell>
                <b>Customer Name</b>
              </TableCell>
              <TableCell>
                <b>City</b>
              </TableCell>
              <TableCell>
                <b>Machine Type</b>
              </TableCell>
              <TableCell>
                <b>Payment Status</b>
              </TableCell>
              <TableCell>
                <b>Parts Name</b>
              </TableCell>
              <TableCell>
                <b>Parts Price</b>
              </TableCell>
              <TableCell>
                <b>Parts Quantity</b>
              </TableCell>
              <TableCell>
                <b>Action</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <Typography variant="h6" color="primary">
                    Loading...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : billData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8}>
                  <Typography variant="h6" color="error">
                    No data found.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              billData.map((row, index) => (
                <TableRow key={row._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.customerName}</TableCell>
                  <TableCell>{row.city}</TableCell>
                  <TableCell>{row.machineType}</TableCell>
                  <TableCell>{row.isPaymentsStatus ? "YES" : "NO"}</TableCell>
                  <TableCell>{row.partsName}</TableCell>
                  <TableCell>{row.partsPrice}</TableCell>
                  <TableCell>{row.partsQuantity}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => navigate("/sellbill-view/" + row._id)}
                      variant="contained"
                    >
                      View Bill
                    </Button>
                    <IconButton onClick={() => deleteRecord(row._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {deleteMessage && (
        <Typography variant="body1" color="primary">
          {deleteMessage}
        </Typography>
      )}
    </div>
  );
}

export default Bill;
