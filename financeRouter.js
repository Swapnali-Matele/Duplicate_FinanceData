const express = require('express');
const router = express.Router();
const {getPost} = require('../controller/fetchData2')





router.post('/finance', getPost);

module.exports = router;