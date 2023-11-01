const router = require('express').Router();
// eslint-disable-next-line import/no-dynamic-require
router.use('/' + process.env.VERSION, require('./routes/' + process.env.VERSION));

module.exports = router;
