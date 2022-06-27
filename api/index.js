const Mux = require('@mux/mux-node');
const { Video } = new Mux();

module.exports = async (req, res) => {
  // This ultimately just makes a POST request to https://api.mux.com/video/v1/uploads with the supplied options.
  const upload = await Video.Uploads.create({
    cors_origin: 'http://localhost:3001',
    new_asset_settings: {
      playback_policy: 'public',
    },
  });

  // Save the Upload ID in your own DB somewhere, then
  // return the upload URL to the end-user.
  res.end(upload.url);
};

// const express = require('express')
// const app = express()
// const port = 3001

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.post('/api/upload', (req, res) => {
//   console.log({res})
//   res.send('works')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })