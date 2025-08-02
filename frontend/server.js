// server.js
const express = require('express');
const path = require('path');
const app = express();

// serve anything in the "public" folder
app.use(express.static(path.join(__dirname, 'src/public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`▶️  Server running at http://localhost:${PORT}`);
});