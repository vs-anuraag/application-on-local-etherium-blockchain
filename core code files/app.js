const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())


const Web3 = require('web3')
const web3 = new Web3('http://127.0.0.1:8545')

var messagecontract = new web3.eth.Contract(
        [
        {
        "constant": false,
        "inputs": [
          {
            "name": "newPoint",
            "type": "uint256"
          }
        ],
        "name": "addPoint",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
        },
        {
        "constant": true,
        "inputs": [],
        "name": "getPoint",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
        }
        ],'0x70f842e26e74d4dc9fad963f011349d2be3e74aa',
   {
     from: '0xad29f85eff931e04e5d9875ba93bdeacbe92ff55',
     data: "0x60806040526000805534801561001457600080fd5b5060ee806100236000396000f3fe6080604052600436106043576000357c0100000000000000000000000000000000000000000000000000000000900480635bea9faa146048578063fc4d312d146070575b600080fd5b348015605357600080fd5b50605a60a7565b6040518082815260200191505060405180910390f35b348015607b57600080fd5b5060a560048036036020811015609057600080fd5b810190808035906020019092919050505060b0565b005b60008054905090565b8060008082825401925050819055505056fea165627a7a72305820d5aaf8829191ffbd493a903058162fe0718f68a924f38af05de42a3f1bfcb45d0029",
      gas: '4700000'
   })


   app.get('/add-points', (req, res, next) => {
     const points = req.query.points;
     console.log('player sent', points);
      messagecontract.methods.addPoint(points).send({from: '0xad29f85eff931e04e5d9875ba93bdeacbe92ff55'}).then(e => res.send(e))
   })

   app.get('/get-points', (req, res, next) => {
      messagecontract.methods.getPoint().call().then(e => res.send(e))
   })

app.listen(3000)

   // messagecontract.deploy().send()
// messagecontract.methods.getPoint().call().then(e => console.log(e))
// messagecontract.methods.setMessage('hi how').send('0xad29f85eff931e04e5d9875ba93bdeacbe92ff55').then(e => console.log(e))
