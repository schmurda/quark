const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');
const mime = require('mime');

function log(data) {
    console.log(`=== Quark Server\t[${process.env.QUARK_DESC}]:\t${data}\b`);
}

const server = http.createServer(function (req, res) {
    if (process.env.QUARK_LOG) {
        log(`${req.method} ${req.url}`);
    }


    var purl = url.parse(req.url);
    var pathname = path.join(process.env.QUARK_DIR, purl.pathname);
    var ext = path.parse(pathname).ext;

    fs.exists(pathname, (exists) => {
        if (!exists) {
            res.statusCode = 404;
            res.end(`Could not find ${pathname} :(`);
            return;
        } else {
            fs.readFile(pathname, (err, data) => {
                if (err) {
                    res.statusCode = 500;
                    res.end(`Had trouble getting ${pathname}`);
                } else {
                    res.setHeader('Content-type', mime.getType(ext) || 'text/plain');
                    res.setHeader('Access-Control-Allow-Origin', url.format({
                        hostname: 'localhost',
                        port: process.env.QUARK_PORT,
                        protocol: 'http'
                    }));

                    res.end(data);
                    return;
                }
            })
        }
    })
})

server.listen(process.env.QUARK_PORT);

log(`Quark Server started on ${process.env.QUARK_PORT}`);
