const express = require('express');
const router = express.Router();
const auth= require('../../middleware/auth');
const uuid = require('uuid').v4;

// models
const Barang = require('../../models').barang

// @route   POST api/barang
// @desc    Create barang
// @access  Private
router.post('/', auth, (req, res) => {
    const { nama, jumlah } = req.body

    if(!nama || !jumlah) return res.status(400).json({ msg: 'Please enter all fields' })

    const newBarang = new Barang({
        nama,
        jumlah
    })

    Barang.create({
        id: uuid(),
        nama: newBarang.nama,
        jumlah: newBarang.jumlah
    }).then(barang => {
        res.status(200).json(barang)
    }).catch(err => {
        res.json(err)
    })
})

// @route   GET api/barang
// @desc    Get all barang
// @access  Private
router.get('/', auth, (req, res) => {
    Barang.findAll().then(barang => {
        res.status(200).json(barang)
    })
})

// @route   DELETE api/barang/:id
// @desc    Delete barang
// @access  Private
router.delete('/:id', auth, (req, res) => {
    const idBarang = req.params.id

   Barang.destroy({
       where: {
           id: idBarang
       }
   }).then(res => {
       res.status(200).json({ delete: 'success' })
   }).catch(err => {
       res.json({ delete: 'failed' })
   })
})

// @route   POST api/barang/update/:id
// @desc    Update Barang
// @access  Private
router.put('/update/:id', auth, (req, res) => {
    const paramId = req.params.id;
    const {nama, jumlah} = req.body;

    // simple validations
    if(!nama || !jumlah ) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const updateBarang = {
        nama,
        jumlah
    }

    // update barang
    Barang.update(
        {
            nama: updateBarang.nama,
            jumlah: updateBarang.jumlah
        },
        {
            where: {
                id: paramId
            }
        }
    ).then(() => {
        res.status(200).json({ update: 'Success' });
    }).catch(err => {
        res.status(400).json(err);
    })
})

module.exports = router