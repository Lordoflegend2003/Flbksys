const express = require("express");
const router = express.Router();
const Authcont = require("../Controllers/Auth");

router.post("/signup", async (req, res) => {
  try {
    console.log(`router ${req.body}`);
    const newdata = await Authcont.newrequest(req.body);
    res.json(newdata);
  } catch (err) {
    res.status(500).json("Something went wrong in Signup");
  }
});

router.get("/signin", async (req, res) => {
  try {
    const responseData = await Authcont.getrequest(req.body);
    res.json(responseData).sendStatus(200);
  } catch (err) {
    res.status(500).json("Something went wrong in Signing in user");
  }
});

module.exports = router;
