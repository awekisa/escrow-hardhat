const express = require("express");
const cors = require("cors");

var app = express();
app.use(cors());
app.use(express.json());

app.listen(3421, () => {
    console.log("Server running on port 3421");
});

let escrows = {};

app.post("/add", (req, res, next) => {
    try {
        console.log(req.body)
        const address = req.body.address;
        const contract = req.body.contract;

    if (!address || !contract) {
        throw new Error('No deployer address or contract address!')
    }

    if (!escrows[address]) {
        escrows[address] = [];
    }

    escrows[address].push(contract);
    res.send();        
    } catch (ex) {
        console.log(ex);
    }
});

app.post("/escrows", (req, res, next) => {
    try {
        console.log(req.body)
        const address = req.body.address;
    
        if (!address) {
            res.send("DAMN");
        }
    
        console.log(escrows)
    
        res.send({ addresses: escrows[address]});        
    } catch(ex) {
        console.log(ex);
    }
});

