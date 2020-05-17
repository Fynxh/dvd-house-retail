'use strict';
module.exports = (sequelize, DataTypes) => {
  const keuangan = sequelize.define('keuangan', {
    tanggal: DataTypes.DATEONLY,
    pemasukan: DataTypes.INTEGER,
    pengeluaran: DataTypes.INTEGER,
    jumlah: DataTypes.INTEGER
  }, {});
  keuangan.associate = function(models) {
    // associations can be defined here
  };
  return keuangan;
};