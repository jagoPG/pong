const
  express = require('express')
  app = express(),
  port = process.env.port || 3000;

app.use(
  express.static('public')
);

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(port);
console.log(`Running server at port ${port}`);
