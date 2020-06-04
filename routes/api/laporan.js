const express = require('express');
const router = express.Router();
const auth= require('../../middleware/auth');
const uuid = require('uuid').v4;
const multer = require('multer')

// models
const Laporan = require('../../models').laporan

// @route   POST api/laporan
// @desc    Create laporan
// @access  Private
router.post('/', auth, (req, res) => {
    const date = new Date()

    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'tmp/file')
        },
        filename: function(req, file, cb) {
            cb(null, '( '+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' )'+file.originalname )
        }
    })
    
    const upload = multer({ storage: storage }).single('laporan')

    upload(req, res, function(err) {
        
        //check multer error 
        if(err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }

        // when everything OK

        const file = '( '+date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()+' )'+req.file.originalname
        const tanggal = req.body

        Laporan.create({
            id: uuid(),
            file: file,
            tanggal: tanggal
        }).then(laporan => {
            res.status(200).json(laporan)
        }).catch(err => {
            res.json(err)
        })
    })
})

// @route   GET api/laporan
// @desc    Get all laporan
// @access  Private
router.get('/', auth, (req, res) => {
    Laporan.findAll().then(laporan => {
        res.status(200).json(laporan)
    })
})

module.exports = router