import jwt from 'jsonwebtoken'
//seller login:/api/seller/login

export const sellerlogin = async(req,res) =>{

    try {
        const {email,password} = req.body;

    if(password === process.env.SELLER_PASSWORD && email === process.env.SELLER_EMAIL){
        const token = jwt.sign({email}, process.env.JWT_SECRET,{expiresIn:'7d'})

          res.cookie('sellerToken' , token, {
                httpOnly:true, //prevent javascript to access cookie
                secure: process.env.NODE_ENV ==='production' ,//Use secure cookies in production
                sameSite:process.env.NODE_ENV ==='production' ? 'none' : 'strict',//CSPF PROTECTION
                maxAge: 7 * 24 * 60 * 60 * 1000,//cookie expiring time
            })

            return res.json({success:true,mesaage:"Logged In"})
            } else{
                return res.json({success:false, message: "Invalid Credentials"})
            }
    } catch (error) {
        console.log(error.message);
        res.json({sucesss:false, mesaage:error.message})
        
    }
}

//Check Auth: /api/seller/is-auth

export const isSellerAuth = async (req,res)=>{
    try {
      
       return res.json({ success: true });
        
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
        
    }
}

//sellerLogout: /api/seller/logout

 export const sellerLogout = async(req,res)=>{
        try {
          res.clearCookie('sellerToken',{
            httpOnly:true,
            secure:process.env.NODE_ENV ==='production',
            sameSite:process.env.NODE_ENV ==='production' ? 'none' : 'strict',
          });
          return res.json({success:true,message:"Logged Out"})

        } catch (error) {
            console.log(error.message);
            res.json({success:false,message:error.message})
            
        }
    }