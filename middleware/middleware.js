const jwt = require("jsonwebtoken")
const Customer = require("../models/customer");
const ServiceProvider = require("../models/service-provider");

// const requireAuth = (req,res,next) =>{
//     const token = req.cookies.jwt;
//     if (token){
//         jwt.verify(token,"gaymomma",(err,decodeedToken)=>{
//             if(err){
//                 console.log(err.message)
//                 res.redirect("/login")

//             }
//             else{
//                 console.log(decodeedToken)
//                 next()
//             }
//         })

//     }
//     else{
//         res.redirect("/login")
//     }

// }

const customerAuth = (req,res,next) =>{
    console.log("ran customer auth")
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token,"Customer",(err,decodeedToken)=>{
            if(err){
                res.redirect("/startup")
            }
            else{
                console.log("went inside")
                next()
            }
        })

    }
    else{
        res.redirect("/startup")
    }

}

const serviceProviderAuth = (req,res,next) =>{
    const token = req.cookies.jwt;
    if (token){
        jwt.verify(token,"ServiceProvider",(err,decodeedToken)=>{
            if(err){
                res.redirect("/api/v1/service-provider/login")
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


const checkUser =  (req,res,next) =>{
    console.log("chckl user")
    const token = req.cookies.jwt;
    let user
    if(token){
        jwt.verify(token,"Customer",async(err,decodeedToken)=>{
            if(err){
                jwt.verify(token,"ServiceProvider",async(err,decodeedToken)=>{
                    if(err){
                        res.redirect("/api/v1/customer/login")
                        res.locals.user = null;
                        next()
                    }
                    else{
                        let user = await ServiceProvider.findById(decodeedToken.id)
                        res.locals.user= user;
                        next()
                    }
                }
                )  
            }
            else{
                let user = await Customer.findById(decodeedToken.id)
                res.locals.user = user;
                next()
            }
        }
        )
        
        

    }
    else{
        res.locals.user = null;
        next()

    }
   
}





module.exports = {serviceProviderAuth,customerAuth,checkUser}