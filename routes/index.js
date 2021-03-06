const express = require('express');

const router = express.Router();
const homecontroller = require('../controllers/home_controller');

console.log('Router loaded..');

router.get('/', homecontroller.home);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));
router.use('/comments',require('./comments'));


// to tell routes index about api folder
router.use('/api', require('./api') );

// For any further routes access from here
// router.use('/routeName', require('./routerFile'));

module.exports = router ;