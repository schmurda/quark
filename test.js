const path = require('path');
const quark = require('./index');

quark({
    port: 21048,
    dir: path.join(__dirname, 'test_dir'),
    description: 'HTTP Server'
});
