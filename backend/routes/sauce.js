
const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const authVerify = require('../middleware/authVerify');
const multer = require('../middleware/multer');
const validate = require('../middleware/validate');

router.get('/', auth, sauceCtrl.getAllSauce);
router.get('/:id', auth, validate.id, sauceCtrl.getOneSauce);
router.post('/', auth, multer, validate.sauce, sauceCtrl.createSauce);
router.put('/:id', auth, authVerify, multer, validate.id, validate.sauce, sauceCtrl.modifySauce);
router.delete('/:id', auth, authVerify, validate.id, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, validate.id, validate.like, sauceCtrl.likeDislikeSauce);

module.exports = router;