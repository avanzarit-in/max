const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/ping', function(req, res) {
    return res.send('pong');
});

app.get('/login', function(req, res) {
    console.log(req.params);
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log("Server started on port 8080"));
