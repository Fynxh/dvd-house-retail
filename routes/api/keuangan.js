const express = require('express');
const router = express.Router();
const auth= require('../../middleware/auth');
const uuid = require('uuid').v4;

// models
const Keuangan = require('../../models').keuangan

// @route   POST api/keuangan
// @desc    Create keuangan
// @access  Private
router.post('/', auth, (req, res) => {
    const { tanggal, pemasukan, pengeluaran } = req.body

    if(!tanggal || !pemasukan || !pengeluaran) return res.status(400).json({ msg: 'Please enter all fields' })


    const jumlah = pemasukan - pengeluaran

    const newKeuangan = new Keuangan({
        tanggal,
        pemasukan,
        pengeluaran,
        jumlah
    })

    Keuangan.create({
        id: uuid(),
        tanggal: newKeuangan.tanggal,
        pemasukan: newKeuangan.pemasukan,
        pengeluaran: newKeuangan.pengeluaran,
        jumlah: newKeuangan.jumlah
    }).then(keuangan => {
        res.status(200).json(keuangan)
    }).catch(err => {
        res.json(err)
    })
})

// @route   GET api/keuangan
// @desc    Get all keuangan
// @access  Private
router.get('/', auth, (req, res) => {
    Keuangan.findAll().then(keuangan => {
        res.status(200).json(keuangan)
    })
})

// @route   DELETE api/keuangan/:id
// @desc    Delete keuangan
// @access  Private
router.delete('/:id', auth, (req, res) => {
    const idKeuangan = req.params.id

   Keuangan.destroy({
       where: {
           id: idKeuangan
       }
   }).then(res => {
       res.status(200).json({ delete: 'success' })
   }).catch(err => {
       res.json({ delete: 'failed' })
   })
})

// @route   POST api/keuangan/update/:id
// @desc    Update keuangan
// @access  Private
router.put('/update/:id', auth, (req, res) => {
    const paramId = req.params.id;
    const {tanggal, pemasukan, pengeluaran} = req.body;

    // simple validations
    if(!tanggal || !pemasukan || !pengeluaran ) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const jumlah = pemasukan - pengeluaran

    const updateKeuangan = {
        tanggal,
        pemasukan,
        pengeluaran,
        jumlah
    }

    // update keuangan
    Keuangan.update(
        {
            tanggal: updateKeuangan.tanggal,
            pemasukan: updateKeuangan.pemasukan,
            pengeluaran: updateKeuangan.pengeluaran,
            jumlah: updateKeuangan.jumlah
        },
        {
            where: {
                id: paramId
            }
        }
    ).then(() => {
        res.status(200).json({ msg: 'Successfully updated' });
    }).catch(err => {
        res.status(400).json(err);
    })
})

module.exports = router