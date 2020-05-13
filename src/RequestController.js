import express from 'express';

const router = express.Router();

router.use((req, res, next) => {
    console.log(`${new Date()} - New request: { method: ${req.method}, url: ${req.url} }`);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');

    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
})

export default router;