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
        'user_id' : req.body.briqId,
        'txn_status': 'unpaid'
    })
     const allUser = userList.map(({_id, name, email, profile_image}) => ({_id, name, email, profile_image}))
     allUser.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
     res.status(200).send(allUser)
    } catch(err) {
 
    }
})
 

router.post('/addTxn', async(req,res) => {
    const add_user = new Users();
    add_user.name = req.body.briqName;
    add_user.email = req.body.briqEmail;
    add_user.profile_image = 'null';
    const salt = await bcrypt.genSalt(10);
    add_user.password = await bcrypt.hash(req.body.briqPassword, salt);

    try {
        const userAdd = await add_user.save()
        let token = jwt.sign({
            email: userAdd.email, 
            id: userAdd._id
        }, 'secret', { expiresIn: '1d' });
        //res.cookie('jwt', token)
        res.status(200).send({
            success:true,
            name: userAdd.name,
            email: userAdd.email,
            profile_image: userAdd.profile_image,
            token: "Bearer "+ token
        })
    } catch(err) {
        console.log(err);
    }
})

router.post('/settleTxn', (req,res) => {
    res.send("Settle Current Txn")
})

module.exports = router