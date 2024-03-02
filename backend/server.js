const express = require("express");
const cors = require("cors");
const xlsx = require("xlsx");
const app = express();
const port = process.env.PORT || 3000;
const filePath = process.env.FILEPATH;

app.use(cors());

app.get("/sheets", (req, res) => {
  console.log("Request received for /sheets");
  const workbook = xlsx.readFile(filePath);
  const sheets = workbook.SheetNames;
  console.log(sheets);
  res.json({ sheets });
});

app.get("/sheet/:sheetName", (req, res) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = req.params.sheetName;
  const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  res.json({ sheetData });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
