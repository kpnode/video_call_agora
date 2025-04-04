const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const APP_ID = 'e45b4a04aa0045a7ab86e68f56f6974c';
const APP_CERTIFICATE = '6dd0bd57bf454d15806f522d0d5f5b92';

app.use(express.static('public'));
app.use(bodyParser.json()); // Middleware to parse JSON bodies

app.get('/token', (req, res) => {
    const channelName = req.query.channel;
    const uid = req.query.uid;
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpiredTs);
    
    // Log token generation
    console.log(`Token generated for channel: ${channelName}, UID: ${uid}`);
    
    res.json({ token });
});

// Log when a user joins the server
app.post('/join', (req, res) => {
    const { channel, uid } = req.body;
    console.log(`User ${uid} joined the channel: ${channel}`);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
