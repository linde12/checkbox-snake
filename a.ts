import express from "express";
// create express scaffolding
const app = express();
// create a route
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
