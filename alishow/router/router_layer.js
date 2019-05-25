const express = require('express');

const router = express.Router();
const path = require('path');
router.get('/test/layer', (req, res) => {
    res.render(path.join(global.rootPath, 'view', 'test/layer.html'))
});
router.get('/test/ueditor', (req, res) => {
    res.render(path.join(global.rootPath, 'view', 'test/ueditor.html'))
});

module.exports = router;