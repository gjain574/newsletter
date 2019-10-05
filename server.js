const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require('fs');
const util = require('util');

const readdirAsync = util.promisify(fs.readdir);

const emailsFolder = './issues/';

app.use(express.static(emailsFolder))

app.get('/api/issues', (req, res) => {
    return readdirAsync(emailsFolder).then((files)=>{
        const issues = files.map((file)=>{
            return file.replace(".html", "");
        });

        return res.json({
            "issues" : issues,
            "count" : issues.length
        });
    })
});

app.get('/', function(req, res){
    res.sendFile(path.resolve(__dirname, './index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))