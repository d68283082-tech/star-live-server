const express = require('express');
const { AccessToken } = require('livekit-server-sdk');
const app = express();

// --- حط بياناتك هنا من موقع LiveKit ---
const API_KEY = 'حط_هنا_API_Key'; 
const API_SECRET = 'حط_هنا_API_Secret';
// ---------------------------------------

app.get('/token', async (req, res) => {
  const roomName = req.query.room || 'star_room';
  const participantName = req.query.user || 'user_' + Math.floor(Math.random() * 100);

  const at = new AccessToken(API_KEY, API_SECRET, { identity: participantName });
  at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });
  
  res.send({ token: await at.toJwt() });
});

app.listen(process.env.PORT || 3000, () => console.log('Server Ready!'));
