import React, { useRef, useState, useEffect } from "react";
import UserSidebar from "../UserSidebar";
import IconButton from "@mui/material/IconButton";
import LocalPrintshopSharpIcon from "@mui/icons-material/LocalPrintshopSharp";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import axios from "axios";
import moment from "moment";
import { Converter, hiIN } from "any-number-to-words";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom"; 


function BillView() {
  const componentRef = useRef();
  const [customerData, setCustomerData] = useState(null);

  const { customerId } = useParams();  

  const fetchCustomerData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/sellparts/get_customer_by_id/${customerId}`);
      if (response.data.statusCode === 200) {
        setCustomerData(response.data.data);
      } else {
        console.error("Customer data not found");
      }
    } catch (error) {
      console.error("Error fetching customer data: ", error);
    }
  };

  useEffect(() => {
    fetchCustomerData();
  }, [customerId]);

  const converter = new Converter(hiIN);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const getTotalPrice = () => {
    let total = customerData ? customerData.partsQuantity * customerData.partsPrice : 0;
    return total;
  }

  return (
    <div>
      <UserSidebar />
      <div>
        <div className="d-flex flex-row justify-content-end m-5 mt-0 mb-3">
          <IconButton onClick={handlePrint}>
            <LocalPrintshopSharpIcon sx={{ fontSize: 50 }} />
          </IconButton>
        </div>
        <div className="p-5 m-5 mt-0 pt-0">
          <div ref={componentRef}>
            <div className="pt-4">
              <Typography
                className="text-center text-uppercase mb-2"
                variant="h4"
                component="div"
              >
                SHREE {moment().subtract(1, "years").format("yyyy")}-{moment().format("yyyy")}
              </Typography>
              {customerData && (
                <div>
                  <Typography className="text-center text-uppercase" variant="p" component="div">
                    Customer Name: {customerData.customerName}
                  </Typography>
                  <Typography className="text-center text-uppercase" variant="p" component="div">
                    Machine Type: {customerData.machineType}
                  </Typography>
                </div>
              )}
              <Typography
                className="text-center text-uppercase"
                variant="p"
                component="div"
              >
                7 Anjiriyawadi gr. floor Room No-3 B/h Torrent Power katargam,
              </Typography>
              <Typography
                className="text-center text-uppercase"
                variant="p"
                component="div"
              >
                surat-395004 service line : 9727224253 , 9825311414, 0261-2535484-4484
              </Typography>
            </div>
            <div className="mt-4">
              <Typography className="text-center" variant="h5" component="div">
                Retail Invoice
              </Typography>
            </div>
            <Paper variant="outlined" className="m-3 mt-0 p-3">
              <div>
                <div>
                  <div className="d-flex flex-row flex-wrap justify-content-between gap-4 align-items-center">
                    <div className="d-flex flex-column gap-2">
                      {customerData && (
                        <div>
                          To: {customerData.customerName}
                        </div>
                      )}
                      {customerData && (
                        <div>
                          Number: {customerData.mobileNumber}
                        </div>
                      )}
                    </div>
                    <div>
                      <h5>Invoice</h5>
                      <ul className="d-flex flex-column gap-2">
                        {customerData && (
                          <li>ID: # {customerData.customerId}
                          </li>
                        )}
                        {customerData && (
                          <li>
                            Date: {customerData.createAt ? moment(customerData.createAt).format("DD/MM/YYYY") : ""}
                          </li>
                        )}
                        {customerData && (
                          <li>
                            Status:{" "}
                            {customerData.isPaymentsStatus ? (
                              <span className="text-white p-1 rounded bg-success">Paid</span>
                            ) : (
                              <span className="text-white p-1 rounded bg-danger">Unpaid</span>
                            )}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <TableContainer>
                  <Table sx={{ width: "100%" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell className="fw-bold">Sr.</TableCell>
                        <TableCell className="fw-bold" align="left">
                          Item Name
                        </TableCell>
                        <TableCell className="fw-bold" align="right">
                          Qty.
                        </TableCell>
                        <TableCell className="fw-bold " align="right">
                          Price
                        </TableCell>
                        <TableCell className="fw-bold" align="right">
                          Amount
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {customerData && (
                        <TableRow className="bill-table-row">
                          <TableCell align="left">1</TableCell>
                          <TableCell align="left">{customerData.partsName}</TableCell>
                          <TableCell align="right">{customerData.partsQuantity}</TableCell>
                          <TableCell align="right">{customerData.partsPrice}</TableCell>
                          <TableCell align="right">{getTotalPrice()}</TableCell>
                        </TableRow>
                      )}
                      <TableRow className="bill-table-row">
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="d-flex flex-column">
                          <span className="fw-bold">Amount In Words : </span>
                          <span className="text-capitalize">
                            {converter?.toWords(getTotalPrice())}
                          </span>
                        </TableCell>
                        <TableCell className="fw-bold" align="right" colSpan={3}>
                          Total
                        </TableCell>
                        <TableCell className="fw-bold" align="right">
                          {getTotalPrice()}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </Paper>
            <div className="d-flex flex-row flex-wrap justify-content-between p-3 align-items-center ">
              <div className="d-flex flex-column gap-3">
                <div></div>
                <div>
                  <hr />
                  Receiver's Signature
                </div>
              </div>
              <div className="d-flex flex-column gap-3">
                <div></div>
                <div>
                  <hr />
                  For SHREE {moment().subtract(1, "years").format("yyyy")}-{moment().format("yyyy")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillView;
