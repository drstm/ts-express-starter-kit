import express from "express";
import path from "path"
import cookieParser from "cookie-parser"
import logger from "morgan" 
import bodyParser from "body-parser"
import cors from "cors"

let enrouten = require('express-enrouten');
const port = 8080
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(enrouten({ 
    directory: 'controllers'
}));
app.use(logger("dev", {
    skip: (req, res) => {
        return res.statusCode > 400
    },
    stream: process.stdout
}));
app.use(logger("dev", {
    skip: (req, res) => {
        return res.statusCode < 400
    },
    stream: process.stderr
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 8080)

export default app; 