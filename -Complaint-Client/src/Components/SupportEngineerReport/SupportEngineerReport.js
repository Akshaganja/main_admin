import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Cookies from "universal-cookie";
import MenuItem from "@mui/material/MenuItem";
import moment from "moment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import { savePDF } from "@progress/kendo-react-pdf";
import PDFIcon from "../Assets/pdf.png";
import ExcelIcon from "../Assets/excel.png";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Ratings from "@mui/material/Rating";
import TablePagination from "@mui/material/TablePagination";
import generatePDF from "./supportReportGenerator";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { RotatingLines } from "react-loader-spinner";

export default function Report() {


    const [rowsPerPage, setRowsPerPage] = React.useState(50);
    const [page, setPage] = React.useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    //   engineer name
    let [engineerNameData, setEgineerNameData] = useState([]);
    let getData = async () => {
        let res = await axios.post("https://spr-cms-babe93641764.herokuapp.com/eng/engineer_name", {
            engineerCity: localStorage.getItem("city"),
            machineType: localStorage.getItem("machine"),
        });
        setEgineerNameData(res.data.data);
    };
    React.useEffect(() => {
        getData();
    }, []);

    const [data, setData] = useState({
        engineerName: "",
        startingDate: "",
        endingDate: "",
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

    let componentRef = React.createRef();

    let [loader, setLoader] = React.useState(true);
    let [filterData, setFilterData] = React.useState([]);

    // let [totalCount, setTotalCount] = React.useState();

    var filterDate = async () => {
        let response = await axios.post(
            "https://spr-cms-babe93641764.herokuapp.com/reporting/support_eng_report",
            {
                engineerName: data.engineerName,
                startingDate: data.startingDate,
                endingDate: data.endingDate,
                rowsPerPage: rowsPerPage,
                page: page,
            }
        );

        if (response.data.statusCode === 200) {
            if (data.engineerName) {
                for (let comp in response?.data?.report_data) {

                    let supportEngNameCreateTime = moment(
                        response.data.report_data[comp]?.anaysisCompaint?.supportEngNameCreateDate
                    ).format("HH:mm:ss");

                    let createTime = moment(supportEngNameCreateTime, "HH:mm:ss");

                    let startTime = moment(
                        response.data?.report_data[comp]?.anaysisCompaint?.startTime,
                        "HH:mm:ss"
                    );

                    let endTime = moment(
                        response.data?.report_data[comp]?.anaysisCompaint?.endTime,
                        "HH:mm:ss"
                    );

                    // working time
                    if (!response.data?.report_data[comp]?.anaysisCompaint?.startTime) {
                        return (startTime = "00:00:00");
                    }
                    if (!response.data?.report_data[comp]?.anaysisCompaint?.endTime) {
                        return (endTime = "00:00:00");
                    }

                    const duration_ofStartAndEnd = moment.duration(endTime.diff(startTime));
                    const durationFormatted_ofStartAndEnd = moment
                        .utc(duration_ofStartAndEnd.asMilliseconds())
                        .format("HH:mm:ss");
                    //   console.log(durationFormatted_ofStartAndEnd);
                    response.data.report_data[comp]["workingDuration"] = durationFormatted_ofStartAndEnd;

                    //   traveling time
                    if (!response.data.report_data[comp].anaysisCompaint.supportEngNameCreateDate) {
                        return (createTime = "00:00:00");
                    }
                    const duration_ofcreateAndstart = moment.duration(
                        startTime.diff(createTime)
                    );
                    const durationFormatted_ofcreateAndstart = moment
                        .utc(duration_ofcreateAndstart.asMilliseconds())
                        .format("HH:mm:ss");
                    //   console.log(durationFormatted_ofStartAndEnd);
                    response.data.report_data[comp]["travelingDuration"] =
                        durationFormatted_ofcreateAndstart;
                }
                setLoader(false);
                setFilterData(response.data.report_data);
            }
        }
    };

    React.useEffect(() => {
        filterDate();
    }, [data, page, rowsPerPage]);


    let [allReportData, setAllReportData] = React.useState([]);
    let Report_All = async () => {
        let response = await axios.post(
            "https://spr-cms-babe93641764.herokuapp.com/reporting/all_support_eng_reporting/",
            {
                engineerName: data.engineerName,
                startingDate: data.startingDate,
                endingDate: data.endingDate,
            }
        );
        if (response.data.statusCode === 200) {
            for (let comp in response?.data?.report_data) {

                let supportEngNameCreateTime = moment(
                    response.data.report_data[comp]?.anaysisCompaint?.supportEngNameCreateDate
                ).format("HH:mm:ss");

                let createTime = moment(supportEngNameCreateTime, "HH:mm:ss");

                let startTime = moment(
                    response.data?.report_data[comp]?.anaysisCompaint?.startTime,
                    "HH:mm:ss"
                );

                let endTime = moment(
                    response.data?.report_data[comp]?.anaysisCompaint?.endTime,
                    "HH:mm:ss"
                );

                // working time
                if (!response.data?.report_data[comp]?.anaysisCompaint?.startTime) {
                    return (startTime = "00:00:00");
                }
                if (!response.data?.report_data[comp]?.anaysisCompaint?.endTime) {
                    return (endTime = "00:00:00");
                }

                const duration_ofStartAndEnd = moment.duration(endTime.diff(startTime));
                const durationFormatted_ofStartAndEnd = moment
                    .utc(duration_ofStartAndEnd.asMilliseconds())
                    .format("HH:mm:ss");
                //   console.log(durationFormatted_ofStartAndEnd);
                response.data.report_data[comp]["workingDuration"] = durationFormatted_ofStartAndEnd;

                //   traveling time
                if (!response.data.report_data[comp].anaysisCompaint.supportEngNameCreateDate) {
                    return (createTime = "00:00:00");
                }
                const duration_ofcreateAndstart = moment.duration(
                    startTime.diff(createTime)
                );
                const durationFormatted_ofcreateAndstart = moment
                    .utc(duration_ofcreateAndstart.asMilliseconds())
                    .format("HH:mm:ss");
                //   console.log(durationFormatted_ofStartAndEnd);
                response.data.report_data[comp]["travelingDuration"] =
                    durationFormatted_ofcreateAndstart;
            }
            setAllReportData(response.data.report_data);
        }
    };

    React.useEffect(() => {
        Report_All();
    }, [data]);

    let [allAttedanceData, setAllAttedanceData] = React.useState([]);
    let AttedanceData = async () => {
        let response = await axios.post(
            "https://spr-cms-babe93641764.herokuapp.com/reporting/all_engineer_attendance/",
            {
                name: data.engineerName,
                startingDate: data.startingDate,
                endingDate: data.endingDate,
            }
        );
        if (response.data.statusCode === 200) {
            for (let comp in response?.data?.report_data) {

                let supportEngNameCreateTime = moment(
                    response.data.report_data[comp]?.anaysisCompaint?.supportEngNameCreateDate
                ).format("HH:mm:ss");

                let createTime = moment(supportEngNameCreateTime, "HH:mm:ss");

                let startTime = moment(
                    response.data?.report_data[comp]?.anaysisCompaint?.startTime,
                    "HH:mm:ss"
                );

                let endTime = moment(
                    response.data?.report_data[comp]?.anaysisCompaint?.endTime,
                    "HH:mm:ss"
                );

                // working time
                if (!response.data?.report_data[comp]?.anaysisCompaint?.startTime) {
                    return (startTime = "00:00:00");
                }
                if (!response.data?.report_data[comp]?.anaysisCompaint?.endTime) {
                    return (endTime = "00:00:00");
                }

                const duration_ofStartAndEnd = moment.duration(endTime.diff(startTime));
                const durationFormatted_ofStartAndEnd = moment
                    .utc(duration_ofStartAndEnd.asMilliseconds())
                    .format("HH:mm:ss");
                //   console.log(durationFormatted_ofStartAndEnd);
                response.data.report_data[comp]["workingDuration"] = durationFormatted_ofStartAndEnd;

                //   traveling time
                if (!response.data.report_data[comp].anaysisCompaint.supportEngNameCreateDate) {
                    return (createTime = "00:00:00");
                }
                const duration_ofcreateAndstart = moment.duration(
                    startTime.diff(createTime)
                );
                const durationFormatted_ofcreateAndstart = moment
                    .utc(duration_ofcreateAndstart.asMilliseconds())
                    .format("HH:mm:ss");
                //   console.log(durationFormatted_ofStartAndEnd);
                response.data.report_data[comp]["travelingDuration"] =
                    durationFormatted_ofcreateAndstart;
            }
            setAllAttedanceData(response.data.data);
        }
    };

    React.useEffect(() => {
        AttedanceData();
    }, [data]);

    let [totalWorkingTime, setTotalWorkingTime] = useState("00:00:00");
    let [totalTravelingTime, setTotalTravalingTime] = useState("00:00:00");
    let [totalRating, setTotalRating] = useState(0);

    let [totalTime, setTotalTime] = useState("00:00:00");

    // let [lunchTime, setLunchTime] = useState("00:00:00");
    // let [totalWestageTime, setTotalWestageTime] = useState("00:00:00");


    React.useEffect(() => {
        // total Rating

        if (data.engineerName) {
            let totalR = 0;

            // total Working time
            let totalWorking = moment.duration();
            // traveling Duration
            let totalTraveling = moment.duration();
            for (let rating in allReportData) {
                // rating
                totalR += Number(allReportData[rating]?.anaysisCompaint.rating);

                // working Duration
                totalWorking.add(
                    moment.duration(allReportData[rating]?.workingDuration)
                );

                // console.log(allReportData[rating]?.workingDuration, "workingDuration");
                // let timeW = moment(allReportData[rating].workingDuration, "HH:mm:ss");

                // // add the number of milliseconds for the current time value to the total
                // totalWorking += timeW.valueOf();

                // traveling Duration
                totalTraveling.add(
                    moment.duration(allReportData[rating]?.travelingDuration)
                );
            }

            // total rating
            const totalRatingAverage = totalR / allReportData?.length;

            const totalRatingAveragePersontage = (totalRatingAverage * 100) / 5;
            if (totalRatingAveragePersontage)
                setTotalRating(totalRatingAveragePersontage);
            else {
                setTotalRating(0);
            }

            // working Duration
            const averageWorkingTime = moment
                .utc(totalWorking.asMilliseconds() / allReportData.length)
                .format("HH:mm:ss");
            // console.log(averageWorkingTime, "averageTime");
            if (averageWorkingTime) {
                setTotalWorkingTime(averageWorkingTime);
            } else {
                setTotalWorkingTime("00:00:00");
            }

            // // create a new moment object from the total number of milliseconds
            // let sumW = moment(totalWorking);

            // // format the resulting moment object as a string in the desired format
            // console.log(sumW.format("HH:mm:ss"), "totalWorking");

            // traveling Duration
            const averageTravelingTime = moment
                .utc(totalTraveling.asMilliseconds() / allReportData.length)
                .format("HH:mm:ss");
            // console.log(averageTravelingTime, "averageTime");
            if (averageTravelingTime) {
                setTotalTravalingTime(averageTravelingTime);
            } else {
                setTotalTravalingTime("00:00:00");
            }
        }


        // total Time avarage
        // var finaltotaltimeArray = [];

        // for (let report in allReportData) {
        //     // console.log(allReportData[report], "allReportData");

        //     for (let attdance in allAttedanceData) {
        //         // console.log(allAttedanceData[attdance], "allAttedanceData");

        //         let supportEngNameCreateDate = moment(allReportData[report].anaysisCompaint?.supportEngNameCreateDate).format("DD/MM/YYYY");
        //         if (
        //             allReportData[report].anaysisCompaint.supportEngName ===
        //             allAttedanceData[attdance].name &&
        //             supportEngNameCreateDate ===
        //             allAttedanceData[attdance].currentDate
        //         ) {
        //             let totalTime = [];
        //             for (let i = 0; i < allAttedanceData[attdance]?.dailyAttdance?.length; i++) {
        //                 let prevTime = moment(allAttedanceData[attdance].dailyAttdance[i - 1]?.time, "HH:mm:ss");
        //                 let currTime = moment(allAttedanceData[attdance].dailyAttdance[i]?.time, "HH:mm:ss");
        //                 // one Day total time
        //                 let durationOneDayTime = moment.duration(currTime.diff(prevTime));

        //                 totalTime.push(
        //                     Math.abs(durationOneDayTime.hours()) +
        //                     ":" +
        //                     Math.abs(durationOneDayTime.minutes()) +
        //                     ":" +
        //                     Math.abs(durationOneDayTime.seconds())
        //                 );

        //                 var sumOneDayTime = totalTime.reduce(
        //                     (acc, time) => acc.add(moment.duration(time)),
        //                     moment.duration()
        //                 );
        //             }

        //             // total duration 
        //             finaltotaltimeArray.push([
        //                 Math.floor(sumOneDayTime.asHours()),
        //                 sumOneDayTime.minutes(),
        //                 sumOneDayTime.seconds(),
        //             ].join(":"))
        //         }
        //     }
        //     // total duration
        //     console.log(finaltotaltimeArray,"finaltotaltimeArray")
        //     const totalDuration = finaltotaltimeArray.reduce((acc, cur) => {
        //         const time = moment(cur, 'HH:mm:ss');
        //         return acc.add(time.diff(moment().startOf('day')));
        //     }, moment.duration());
        //     const averageTotalTimeDuration = moment.duration(totalDuration.as('milliseconds') / finaltotaltimeArray.length);
        //     const averageTotalTime = moment.utc(averageTotalTimeDuration.as('milliseconds')).format('HH:mm:ss');
        //     if (averageTotalTime) {
        //         setTotalTime(averageTotalTime)
        //     } else {
        //         setTotalTime("00:00:00")
        //     }
        // }

    }, [allAttedanceData, allReportData, data]);

    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = (allReportData, engineerName) => {
        // for each ticket pass all its data into an array
        let rowData = allReportData.map((row) => ({
            Date: moment(row.createDateAt).format("DD/MM/YYYY"),
            Time: row.createTimeAt,
            "Repeat Complains": row.repeatComplaintNumber,
            "Com Start Time": row.startTime,
            "Com End Time": row.endTime,
            "Working Time": row.workingDuration,
            "Traveling Time": row.travelingDuration,
            Rating: row.rating,
        }));
        // push each tickcet's info into a row
        console.log("Row Data", rowData);
        const ws = XLSX.utils.json_to_sheet(rowData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, `Engineer ${engineerName} Report` + fileExtension);
    };

    return (
        <>
            <Box sx={{ width: "100%" }}>
                <div className="d-flex flex-row justify-content-between">
                    <div>
                        <h4>Support Engineer Report</h4>
                    </div>
                    <div className="d-flex flex-row justify-content-end gap-3 mb-3">
                        <img
                            className="pdf-img"
                            height={"50px"}
                            src={PDFIcon}
                            onClick={() =>
                                generatePDF({
                                    engineerName: data.engineerName,
                                    allReportData: allReportData,
                                    rating: totalRating,
                                    WorkingTime: totalWorkingTime,
                                    TravelingTime: totalTravelingTime,
                                    totalTime: totalTime,
                                    // LunchTime: lunchTime,
                                    // WestageTime: totalWestageTime

                                })
                            }
                            // onClick={() => {
                            //   if (componentRef.current) {
                            //     savePDF(componentRef.current, {
                            //       fileName: `Report For ${data.engineerName}`,
                            //     });
                            //   }
                            // }}
                            style={{ cursor: "pointer" }}
                            alt="pdf-images"
                        />

                        <img
                            className="pdf-img"
                            height={"50px"}
                            src={ExcelIcon}
                            onClick={() => exportToCSV(allReportData, data.engineerName)}
                            alt={"excelimage"}
                            style={{ cursor: "pointer" }}
                        />

                        {/* <ReactHTMLTableToExcel
              className="btn excel-btn "
              table="engineer-report-data"
              filename={`Report For ${data.engineerName}`}
              sheet="Sheet"
              buttonText=""
            /> */}
                    </div>
                </div>

                <div className="d-flex flex-row flex-wrap gap-4 mb-4">
                    <FormControl sx={{ minWidth: 120 }} size="small">
                        <InputLabel>Eng Name</InputLabel>
                        <Select
                            label="Eng Name"
                            name="engineerName"
                            value={data?.engineerName}
                            onChange={updateInputs}
                            MenuProps={{
                                style: {
                                    maxHeight: 210,
                                },
                            }}
                        >
                            {engineerNameData?.map((e, i) => {
                                return (
                                    <MenuItem key={i} value={e.name}>
                                        {e.name}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>

                    {/* Starting Date */}
                    <TextField
                        value={data?.startingDate}
                        type="date"
                        size="small"
                        label="Starting Date"
                        name="startingDate"
                        onChange={updateInputs}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {/* <div>to</div> */}
                    {/* Ending Date */}
                    <TextField
                        value={data?.endingDate}
                        type="date"
                        size="small"
                        name="endingDate"
                        label="Ending Date"
                        onChange={updateInputs}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {/* All */}
                    <Button
                        variant="contained"
                        onClick={() => {
                            setData({
                                engineerName: "",
                                startingDate: "",
                                endingDate: "",
                            });
                            setFilterData([]);
                            setTotalRating(0);
                            setTotalWorkingTime("00:00:00");
                            setTotalTravalingTime("00:00:00");
                            // setTotalTime("00:00:00")
                            // setLunchTime("00:00:00")
                            // setTotalWestageTime("00:00:00")
                        }}
                    >
                        Reset
                    </Button>
                </div>
                <div className="d-flex flex-row flex-wrap justify-content-center align-items-center gap-5 mb-4">
                    {/* <div className="bg-light text-dark p-3  timedurationborder totaltime">
                        <div className="fw-bold"> Total Time</div>
                        <div>{totalTime}</div>
                    </div> */}
                    <div className="bg-light text-dark p-3  timedurationborder workingtime">
                        <div className="fw-bold"> Working Time</div>
                        {/* <div>{totalWorkingTime ? totalWorkingTime : "00:00:00"}</div> */}
                        <div>{totalWorkingTime !== "Invalid date" ? totalWorkingTime : "00:00:00"}</div>
                    </div>
                    <div className="bg-light text-dark p-3  timedurationborder travelingtime">
                        <div className="fw-bold"> Traveling Time</div>
                        {/* <div>{totalTravelingTime ? totalTravelingTime : "00:00:00"}</div> */}
                        <div>{totalTravelingTime !== "Invalid date" ? totalTravelingTime : "00:00:00"}</div>
                    </div>
                    {/* <div className="bg-light text-dark p-3  timedurationborder lunchtime">
                        <div className="fw-bold"> Lunch Time</div>
                        <div>{lunchTime}</div>
                    </div> */}
                    {/* <div className="bg-light text-dark p-3  timedurationborder wastagetime">
                        <div className="fw-bold"> Wastage Time</div>
                        <div>{totalWestageTime}</div>
                    </div> */}
                    <div className="bg-light text-dark p-3  timedurationborder ratingtime">
                        <div className="fw-bold"> Rating </div>
                        <div>{totalRating}%</div>
                    </div>
                </div>

                <Paper sx={{ width: "100%" }}>
                    {data.engineerName ? (
                        <Toolbar
                            className="border-top border-bottom"
                            sx={{
                                pl: { sm: 2 },
                                pr: { xs: 1, sm: 1 },
                            }}
                        >
                            <Typography
                                sx={{ flex: "1 1 80%" }}
                                variant="h5"
                                id="tableTitle"
                                component="div"
                            >
                                {data.engineerName}
                            </Typography>
                        </Toolbar>
                    ) : null}

                    {data.engineerName ? (
                        <>
                            {loader ? (
                                <div className="d-flex flex-row justify-content-center align-items-center p-5 m-5">
                                    <RotatingLines
                                        strokeColor="grey"
                                        strokeWidth="5"
                                        animationDuration="0.75"
                                        width="50"
                                        visible={loader}
                                    />
                                </div>
                            ) : (
                                <>
                                    <TableContainer sx={{ width: "100%" }} ref={componentRef}>
                                        <Table
                                            sx={{ width: "100%" }}
                                            id="engineer-report-data"
                                            aria-label="simple table"
                                        >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" className="fw-bold">
                                                        Date
                                                    </TableCell>
                                                    <TableCell align="center" className="fw-bold">
                                                        Time
                                                    </TableCell>
                                                    <TableCell align="center" className="fw-bold">
                                                        Com Start Time
                                                    </TableCell>
                                                    <TableCell align="center" className="fw-bold">
                                                        Com End Time
                                                    </TableCell>
                                                    <TableCell align="center" className="fw-bold">
                                                        Working Time
                                                    </TableCell>
                                                    <TableCell align="center" className="fw-bold">
                                                        Traveling Time
                                                    </TableCell>
                                                    <TableCell align="center" className="fw-bold">
                                                        Rating
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {filterData?.map((row) => (
                                                    <TableRow key={row.name}>
                                                        <TableCell
                                                            align="center"
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            {moment(row.anaysisCompaint?.supportEngNameCreateDate).format("DD/MM/YYYY")}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {moment(row.anaysisCompaint?.supportEngNameCreateDate).format("HH:mm:ss")}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {row.anaysisCompaint?.startTime}
                                                        </TableCell>
                                                        <TableCell align="center">{row.anaysisCompaint?.endTime}</TableCell>
                                                        <TableCell align="center">
                                                            {row.anaysisCompaint?.startTime && row.anaysisCompaint?.endTime
                                                                ? row.workingDuration
                                                                : null}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            {row.anaysisCompaint?.startTime && moment(row.anaysisCompaint?.supportEngNameCreateDate).format("HH:mm:ss")
                                                                ? row.travelingDuration
                                                                : null}
                                                        </TableCell>
                                                        <TableCell align="center">
                                                            <Ratings value={row.anaysisCompaint?.rating} readOnly />
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[50, 100, 200, 500]}
                                        component="div"
                                        count={allReportData?.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </>
                            )}
                        </>
                    ) : null}
                </Paper>
            </Box>
        </>
    );
}
