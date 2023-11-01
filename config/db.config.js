const { connect, connection } = require('mongoose');
const DB_URL = process.env.dbUrl;
console.log(DB_URL)
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
};

connection.on('connected', () => {
    console.log('Mongoose connection established to DB Clusters.');
});

connection.on('error', (err) => {
    console.log({ err }, 'Mongoose connection error:');
});

connection.on('disconnected', () => {
    console.log('Mongoose disconnected.');
});

const doConnect = async () => {
    return connect(DB_URL, options);
};

module.exports = {
    doConnect,
};
