const jwt = require("jsonwebtoken")
const Customer = require("../models/customer");
const ServiceProvider = require("../models/service-provider");


const customerAuth = (req,res,next) =>{
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token,"Customer",(err,decodeedToken)=>{
            if(err){
                res.redirect("/login-customer")
            }
            else{
                next()
            }
        })
    }
    else{
        res.redirect("/startup")
    }
}

const serviceProviderAuth =  (req,res,next) =>{
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token,"ServiceProvider", async (err,decodeedToken)=>{
            if(err){
                res.redirect("/login-service")
            }
            else{
                next()
            }
        })
    }
    else{
        res.redirect("/startup")
    }
}

const AdminAuth =  (req,res,next) =>{
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token,"Admin", async (err,decodeedToken)=>{
            if(err){
                res.redirect("/admin-login")
            }
            else{
                next()
            }
        })
    }
    else{
        res.redirect("/admin-login")
    }
}



const checkUser =  (req,res,next) =>{
    const token = req.cookies.jwt;
    let user
    
    //let user
    if(token){
        jwt.verify(token,"Customer",async(err,decodeedToken)=>{
            if(err){
                jwt.verify(token,"ServiceProvider",async(err,decodeedToken)=>{
                    if(err){
                        res.redirect("/startup")
                        res.locals.user = null;
                        res.locals.user= user;
                        next()
                    }
                    else{
                        let user = await ServiceProvider.findById(decodeedToken.id)
                        const flag ="sp"
                        res.locals.user= user;
                        res.locals.flag = flag;
                        next()
                    }
                })  
            }
            else{
                let user = await Customer.findById(decodeedToken.id)
                const flag = "cu"
                res.locals.flag = flag;
                res.locals.user = user;
                next()
            }
        })
    }
    else{
        res.redirect("/startup")
        res.locals.user = null;
        next()
    } 
}


module.exports = {serviceProviderAuth,customerAuth,checkUser,AdminAuth}