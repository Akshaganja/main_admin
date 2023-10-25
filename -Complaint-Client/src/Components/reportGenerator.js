import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
// Date Fns is used to format the dates we receive
// from our API call
// import { format } from "date-fns";

// define a generatePDF function that accepts a tickets argument
const generatePDF = ({ engineerName, allReportData, rating, WorkingTime,
  TravelingTime,
  totalTime,
  LunchTime,
  WestageTime }) => {

  // console.log("engineerName", engineerName);
  // console.log("Data", allReportData);
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles

  const tableColumn = [
    "Date",
    "Time",
    "Repeat Complains",
    "Com Start Time",
    "Com End Time",
    "Working Time",
    "Traveling Time",
    "Rating",
  ];

  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  allReportData.forEach((row) => {
    const ticketData = [
      moment(row.createDateAt).format("DD/MM/YYYY"),
      row.createTimeAt,
      row.repeatComplaintNumber,
      row.startTime,
      row.endTime,
      moment
        .utc(
          moment(row.endTime, "HH:mm:ss").diff(
            moment(row.startTime, "HH:mm:ss")
          )
        )
        .format("HH:mm:ss"),
      moment
        .utc(
          moment(row.startTime, "HH:mm:ss").diff(
            moment(row.createTimeAt, "HH:mm:ss")
          )
        )
        .format("HH:mm:ss"),
      row.rating,
    ];
    // push each tickcet's info into a row
    tableRows.push(ticketData);
  });

  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 55 });
  //   const date = Date().split(" ");
  // we use a date string to generate our filename.
  //   const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
  // ticket title. and margin-top + margin-left
  doc.setFont("courier", "bolditalic");
  doc.text("Engineer Name : " + engineerName, 14, 15);
  doc.setFont("times", "normal");
  doc.setFont("courier", "bolditalic");

  // doc.text(`Total Time : ${totalTime}`, 90, 25, null, null, "right");
  // doc.text(`Lunch Time : ${LunchTime}`, 200, 25, null, null, "right");
  // doc.text(`Working Time : ${WorkingTime}`, 90, 35, null, null, "right");
  // doc.text(`Traveling Time : ${TravelingTime}`, 200, 35, null, null, "right");
  // doc.text(`Westage Time : ${WestageTime}`, 90, 45, null, null, "right");
  // doc.text(`Rating : ${rating}%`, 200, 45, null, null, "right");
  doc.text(
    `Total Time : ${totalTime !== "Invalid date" ? totalTime : "00:00:00"}`,
    90,
    25,
    null,
    null,
    "right"
  );
  doc.text(
    `Lunch Time : ${LunchTime !== "Invalid date" ? LunchTime : "00:00:00"}`,
    200,
    25,
    null,
    null,
    "right"
  );
  doc.text(
    `Working Time : ${
      WorkingTime !== "Invalid date" ? WorkingTime : "00:00:00"
    }`,
    90,
    35,
    null,
    null,
    "right"
  );
  doc.text(
    `Traveling Time : ${
      TravelingTime !== "Invalid date" ? TravelingTime : "00:00:00"
    }`,
    200,
    35,
    null,
    null,
    "right"
  );
  doc.text(
    `Westage Time : ${WestageTime !== "Invalid date" ? WestageTime : "00:00:00"}`,
    90,
    45,
    null,
    null,
    "right"
  );
  doc.text(
    `Rating : ${rating !== "Invalid date" ? rating : "N/A"}%`,
    200,
    45,
    null,
    null,
    "right"
  );
  // we define the name of our PDF file.
  doc.save(`Engineer Report For ${engineerName}.pdf`);
};

export default generatePDF;
