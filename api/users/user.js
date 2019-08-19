const express = require("express")
const {User} = require("../../model/users")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = (req, res, next)=>{
    const {email,password,fullname,phone,dob} = req.body

    User.findOne({$or: [{email},{phone}]})
        .then(user=>{
            if(user) return Promise.reject({errors: "Email or phone exist"})

            const newUser = new User({
                email,password,fullname,phone,dob
            })
            bcrypt.genSalt(10,(err,salt)=>{
                if(err) return Promise.reject(err)

                bcrypt.hash(password,salt,(err,hash)=>{
                    if(err) return Promise.reject(err)
                    newUser.password=hash;
                    return newUser.save()
                        .then(user => res.status(200).json(user))
                        .catch(err=>res.status(400).json(err))
                })
            })
        })
        .catch(err=>res.status(400).json(err))
}

const login = (req, res, next)=>{
    const {email, password} = req.body

    User.findOne({email})
        .then(user=>{
            if(!user) return Promise.reject({errors:"User don't exist"})

            bcrypt.compare(password,user.password,(err,isMatch)=>{
                if(!isMatch) return res.status(400).json({errors: "wrong password"})

                const payload ={
                    id:user._id,
                    email:user.email,
                    fullname:user.fullname,
                    avatar: user.avatar,
                    dob:user.dob
                }

                jwt.sign(payload,"TuanPham",{expiresIn:"1h"},(err,token)=>{
                    if(err) return res.status(400).json(err)

                    return res.status(200).json({
                        message:"success",
                        token
                    })
                })
            })
        })
        .catch(err=>res.status(400).json(err))
}


const uploadAvatar = (req,res,next)=>{
    const {id} = req.user
    User.findById(id)
        .then(user=>{
            if(!user) return Promise.reject({errors})
            user.avatar = req.file.path
            return user.save()
        })
        .then(user=>res.status(200).json(user))
        .catch(err=>res.status(400).json(err))
}

const getProfile =(req,res,next)=>{
    const {id} = req.user
    User.findById(id)
        .then(user=>res.status(200).json(user))
        .catch(err=>res.status(400).json(err))
}
module.exports={ uploadAvatar ,register,login,getProfile}