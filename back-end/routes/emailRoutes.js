const express = require("express");
const router = express.Router();
const { sendTestEmail } = require("../controllers/emailController");

router.post("/send-email", sendTestEmail);

module.exports = router;