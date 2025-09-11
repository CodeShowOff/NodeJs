// Express Middleware:

import express from 'express';


const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


const middleware = (req, res, next) => {
  throw new Error('Middleware Error');
}

app.get('/testMiddleware', middleware, (req, res) => {
  res.send();
}, (error, req, res, next) => {
  res.status(400).send({ error: error.message });
});