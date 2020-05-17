'use strict';
module.exports = (sequelize, DataTypes) => {
  const laporan = sequelize.define('laporan', {
    file: DataTypes.STRING,
    tanggal: DataTypes.DATEONLY
  }, {});
  laporan.associate = function(models) {
    // associations can be defined here
  };
  return laporan;
};