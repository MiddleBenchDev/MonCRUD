const express = require("express")
const userModel = require("../models/user")

const app = express()

app.get("/users", async (req, res) => {
    const users = await userModel.find({})

    try {
        res.send(users)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.get("/get-user", async (req, res) => {
    let {phone, password} = req.body
    if(!phone || !password) {
        res.json({err: "All fields are required"})
    }
    else {
        let user = userModel.findOne({phone})
        .then((data) => {
            if(data.password === password) {
                return res.json({data})
            }
            else {
                return res.json({err: "Passowrd not matched"})
            }
        })
    }
})

app.post("/add-user", async (req, res) => {
    let {name, password, phone} = req.body
    if( !name || !password || !phone) {
        res.json({err:"All fields are required!"})
    }
    else {
        let exist = userModel.findOne({phone})
        .then(data => {

            if(data != null && data.phone === phone) console.log("User exists")
            else{
            let user = new userModel({name, phone, password})
            user.save()
            .then((data) => {
                return res.json({data});
            })}
        })

    }
})

app.put("/update-user", async (req, res) => {
    let {id, data} = req.body
    console.log(data, typeof(data))
    if(!data) {
        res.json({err: "Fields are empty"})
    }
    else {
        let user = userModel.findByIdAndUpdate(id, data)
        user.exec((result, err) => {
            if(err) console.log(err)
            return res.json({success: "successfully updated"})
        })
    }
})

app.delete("/delete-user", async (req, res) => {
    let {id} = req.body
        if(id != null) {
        let data = userModel.findByIdAndDelete(id)
        data.exec((result, err) => {
            if(err) console.log(err)
            res.json({success: "User deleted successfully"})
        })
    }
    else {
        res.json({err: "Id is required"})
    }
})

module.exports = app