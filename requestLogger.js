const fs = require('fs');
const path = require('path');

const requestLogger = (req, res, next) => {
    const logFilePath = path.join(__dirname, '../logs/requests.log');

    const logDetails = {
        timestamp: new Date().toISOString(),
        ip: req.ip || req.connection.remoteAddress,
        url: req.originalUrl,
        protocol: req.protocol,
        method: req.method,
        hostname: req.hostname,
        query: req.query,
        headers: req.headers,
        userAgent: req.get('User-Agent'),
    };

    const checkLogFileSize = (filePath) => {
        const maxSize = 1 * 1024 * 1024; // 1MB
        fs.stat(filePath, (err, stats) => {
            if (!err && stats.size >= maxSize) {
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const archiveFilePath = `${filePath.replace('.log', '')}-${timestamp}.log`;
                fs.rename(filePath, archiveFilePath, (err) => {
                    if (err) {
                        console.error('Failed to rotate log file:', err);
                    }
                });
            }
        });
    };
    
    checkLogFileSize(logFilePath);
    
    const logEntry = JSON.stringify(logDetails,null, 2) + '\n';
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Failed to write log:', err);
        }
    });

    next(); 
};

module.exports = requestLogger;
