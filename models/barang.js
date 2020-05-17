'use strict';
module.exports = (sequelize, DataTypes) => {
  const barang = sequelize.define('barang', {
    nama: DataTypes.STRING,
    jumlah: DataTypes.STRING
  }, {});
  barang.associate = function(models) {
    // associations can be defined here
  };
  return barang;
};