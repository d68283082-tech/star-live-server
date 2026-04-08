const express = require('express');
const { AccessToken } = require('livekit-server-sdk');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server is running! Use /getToken to get your token.');
});

app.get('/getToken', async (req, res) => {
  const roomName = req.query.roomName || 'test-room';
  const participantName = req.query.participantName || 'user-' + Math.floor(Math.random() * 1000);

  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    { identity: participantName }
  );
  
  at.addGrant({ roomJoin: true, room: roomName });
  res.send({ token: await at.toJwt() });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
