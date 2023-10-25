import React, { useRef, useState } from "react";
import UserSidebar from "../UserSidebar";
import { useNavigate, useParams } from "react-router-dom";
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
import { Converter ,hiIN} from "any-number-to-words";
import { useReactToPrint } from "react-to-print";

function BillView() {
  let { id } = useParams();
  let [engineerData, setEngineerData] = React.useState({});
  let [party_address, setPartyAddress] = useState("");

  let getData = async () => {
    let res = await axios.get(
      "https://spr-cms-babe93641764.herokuapp.com/bill/bill_find_by_id/" + id
    );
    if (res.data.statusCode === 200) {
      setEngineerData(res.data.data);
      let result = await axios.get(
        "https://spr-cms-babe93641764.herokuapp.com/party/party_address/" + res.data.data.partyName
      );
      if (result.data.statusCode === 200) {
        setPartyAddress(result.data.data);
      }
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  // let getPartyData = async () => {
  //   if (engineerData.partyName) {
  //     let result = await axios.get(
  //       "https://spr-cms-babe93641764.herokuapp.com/party/party_address/" + engineerData.partyName
  //     );
  //     if (result.data.statusCode === 200) {
  //       setPartyAddress(result.data.data.address);
  //     }
  //   }
  // };

  // React.useEffect(() => {
  //   getPartyData();
  // }, []);

  const converter = new Converter(hiIN);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  
  let [totalPrice, setTotalPrice] = React.useState();

  React.useEffect(() => {
    var total = 0;
    for (let i = 0; i < engineerData?.partsDetails?.length; i++) {
      let priceandqty =
        engineerData?.partsDetails[i]?.partsPrice *
        engineerData?.partsDetails[i]?.partsQty;
      total += priceandqty;
      // console.log(total);
    }
    setTotalPrice(total);
  }, [engineerData?.partsDetails]);

  // console.log(totalPrice, "engineerData?.mainTotal");

  return (
    <div>
      <UserSidebar />

      <div>
        <div className="d-flex flex-row  justify-content-end m-5 mt-0 mb-3">
          <IconButton onClick={handlePrint}>
            <LocalPrintshopSharpIcon sx={{ fontSize: 50 }} />
          </IconButton>
        </div>
        <div className="p-5 m-5 mt-0 pt-0">
          <div ref={componentRef}>
            <div className="pt-4">
              <Typography
                className="text-center text-uppercase mb-2 "
                variant="h4"
                component="div"
              >
                SHREE {moment().subtract(1, "years").format("yyyy")}-
                {moment().format("yyyy")}
              </Typography>
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
                surat-395004 service line : 9727224253 , 9825311414 ,
                0261-2535484-4484
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
                      <div>To : {engineerData.partyName} </div>
                      <div>City : {engineerData.partyCity} </div>
                      <div>Address : {party_address.address} </div>
                      <div>Number : {party_address.mobileNumber} </div>
                      <div>
                        Engineer :{" "}
                        <span className=" text-uppercase">
                          {engineerData.name}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h5>Invoice</h5>
                      <ul className="d-flex flex-column gap-2">
                        <li>ID : # {engineerData.billId}</li>
                        <li>
                          Date :
                          {moment(engineerData.createAt).format("DD/MM/YYYY")}
                        </li>
                        <li>
                          Status :{" "}
                          {engineerData.isPaymentsStatus ? (
                            <span class="text-white p-1 rounded bg-success">
                              Paid
                            </span>
                          ) : (
                            <span class="text-white p-1 rounded bg-danger">
                              Unpaid
                            </span>
                          )}
                        </li>
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
                      {engineerData &&
                        engineerData.partsDetails?.map((row, index) => (
                          <TableRow key={index} className="bill-table-row">
                            <TableCell align="left">{index + 1}</TableCell>
                            <TableCell align="left">{row.partsName}</TableCell>
                            <TableCell align="right">{row.partsQty}</TableCell>
                            <TableCell align="right">
                              {row.partsPrice}
                            </TableCell>
                            <TableCell align="right">
                              {row.partsQty * row.partsPrice}
                            </TableCell>
                          </TableRow>
                        ))}
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
                            {converter?.toWords(
                              Number(totalPrice ? totalPrice : 0)
                            )}
                          </span>
                          {/* <span>{NumberToWords?.toWords(totalPrice)}</span> */}
                        </TableCell>
                        <TableCell
                          className="fw-bold"
                          align="right"
                          colSpan={3}
                        >
                          Total
                        </TableCell>
                        <TableCell className="fw-bold" align="right">
                          {totalPrice}
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
                  For SHREE {moment().subtract(1, "years").format("yyyy")}-
                  {moment().format("yyyy")}
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
