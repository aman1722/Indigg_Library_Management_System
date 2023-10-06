const morgan = require("morgan");


const fs = require('fs');
const path = require('path');

const mainDirectory = path.dirname(require.main.filename);

// Specify the path for the access.log file in the main directory
const logStream = fs.createWriteStream(path.join(mainDirectory, 'access.log'), { flags: 'a' });

const logger = morgan('combined', { stream: logStream }); 


module.exports={
    logger
}