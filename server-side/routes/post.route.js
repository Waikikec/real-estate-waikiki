import express from "express";

const postRoute = express.Router();

postRoute.get("/test", (req, res) => {
  res.send("router works");
});

postRoute.post("/test", (req, res) => {
  res.send("router works");
});

postRoute.put("/test", (req, res) => {
  res.send("router works");
});

postRoute.delete("/test", (req, res) => {
  res.send("router works");
});

export default postRoute;
