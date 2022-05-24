const router = require('express').Router();
const { check } = require('express-validator');

router.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;