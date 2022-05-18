const express = require('express')
const router = express.Router()
const Users = require('../model/users')


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
 

router.post('/addTxn', (req,res) => {
    res.send("Add New Txn")
})

router.post('/settleTxn', (req,res) => {
    res.send("Settle Current Txn")
})

module.exports = router