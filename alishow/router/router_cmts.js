const router = require('express').Router();
const path = require('path');
const db = require('../db.js')
router.get('/admin/comment/comments', (req, res) => {
    res.render(path.join(global.rootPath, 'view', '/admin/comment/comments.html'), {})
});

module.exports = router;
