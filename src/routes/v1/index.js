const router = require('express').Router();

const UserRoute = require('../../user/user.route');
const BookRoute = require('../../book/book.route');
router.get('/', (req, res) => {
    res.render('index', {
        title: 'Welcome to  API V1',
    });
});

router.use('/user', UserRoute);
router.use('/book', BookRoute);
module.exports = router;
