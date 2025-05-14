const mongoose = require('mongoose');

const authUser = process.env.DBUSER;
const authPass = process.env.DBPASS;
const databaseURL = process.env.DBURL;
const databaseAppName = process.env.DBAPPNAME;
const databaseName = process.env.DBNAME;

const uri = `mongodb+srv://${authUser}:${authPass}@${databaseURL}/?retryWrites=true&w=majority&appName=${databaseAppName}/`;

mongoose.connect(uri, {dbName: databaseName});