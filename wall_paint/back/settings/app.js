const express = require('express')
var cors = require('cors');
const app = express();
const port = 5000;
const routes = require('./routes')
const global = require('./global_variables');

app.use(cors());

app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());

routes(app);

app.listen(port, () => {
    console.log(`BACKEND listening at http://localhost:${port}`)
})