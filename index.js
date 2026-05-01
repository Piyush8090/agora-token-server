require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { RtcTokenBuilder, RtcRole } = require("agora-token");

const app = express();
app.use(cors());

const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;

app.get("/rtc/:channel/:uid", (req, res) => {
  const channelName = req.params.channel;
  const uid = req.params.uid;

  if (!channelName) {
    return res.status(400).json({ error: "Channel required" });
  }

  const role = RtcRole.PUBLISHER;

  const expireTime = 3600;
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpireTime
  );

  res.json({ token });
});

app.listen(3000, () => {
  console.log("🚀 Token server running on http://localhost:3000");
});
