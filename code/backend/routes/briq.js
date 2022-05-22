const express = require('express')
const router = express.Router()
const Users = require('../model/users')
const Txn = require('../model/transaction')


router.get('/authorize', (req,res) => {
    res.sendStatus(200)
})


router.get('/user/:id', async (req,res)=>{
    try {
        const user_data = await Users.findById(req.params.id)
        const userInfo = {
            id: user_data._id,
            name: user_data.name,
            email: user_data.email,
            profile_image: user_data.profile_image
        }
        res.status(200).json(userInfo);
    }catch(err) {
        res.send('Error'+err)
    }
})

router.get('/allUsers', async(req,res)=> {
    try {
     const userList = await Users.find()
     const allUser = userList.map(({_id, name, email, profile_image}) => ({_id, name, email, profile_image}))
     allUser.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
     res.status(200).send(allUser)
    } catch(err) {
 
    }
})
 
router.get('/userTxn', async(req,res)=> {
    try {
     const Txn = await Txn.findOne({
        'user_id' : req.query.briqEmail,
        'txn_status': 'unpaid'
     })
     res.status(200).send(Txn)
    } catch(err) {
 
    }
})
 

router.post('/addTxn', async(req,res) => {
    console.log(req.body);
    const add_txn = new Txn();
    add_txn.txn_with = req.body.briqTxnWith;
    add_txn.txn_type = req.body.briqTxnType;
    add_txn.txn_reason = req.body.briqReason;
    add_txn.user_id = req.body.briqEmail;
    add_txn.txn_date = req.body.briqDate;
    add_txn.txn_amount = req.body.briqTxnAmount;
    add_txn.txn_status = 'unpaid';

    try {
        const userAdd = await add_txn.save()
        res.sendStatus(200).send({
            success:true,
            message:"Added the Transaction"
        })
    } catch(err) {
        console.log(err);
    }
})

router.post('/settleTxn', (req,res) => {
    res.send("Settle Current Txn")
})

module.exports = router