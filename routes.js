const fs = require('fs');
const requestHandler = (req, res) => {

    const url = req.url;
    const method = req.method;

    const ar = ['A', 'B', 'C'];
    const br = [...ar];

    if(url=== '/') {
        res.setHeader('Content-type', 'text/html');
        res.write('<html>');
        res.write('<header><title>Enter form details</title></header>')
        res.write('<body><h1>Form</h1><form method="post" action="message">Message: <input type="test" name="message"><input type="submit" value="Send"></form></body>')
        res.write('</html>');
        return res.end();

    } else if(url === '/message' && method === 'POST') {
        const body = [];

        req.on('data', (chunk)=> {
            body.push(chunk);
        });

        return req.on('end', ()=> {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split("=");
            fs.writeFile('hello.txt', message[1], (err) => {
                console.log('File write completed');
                res.setHeader('Location', '/');
                res.statusCode = 302;
                return res.end();
            });            
        })      
        
        
    }
};

module.exports = requestHandler;
exports.requestHandler