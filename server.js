const express = require('express')
const sequelize = require('sequelize')
const app = express()

app.use(express.json({limit: '50mb'}))

// sequelize connection
const sequelizeConnect = new sequelize ('db_dvdhouseretail', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        aquire: 30000,
        idle: 10000
    }
});

// test connection
sequelizeConnect.authenticate()
    .then(() => {
        console.log('Connection has been established successfully');
    })
    .catch(err => {
        console.log('Unable to connect to the database:', err);
    });

// server start
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port: ${port}`));