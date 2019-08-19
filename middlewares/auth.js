const jwt = require('jsonwebtoken');

const authenticating = (req, res, next)=>{
    const token = req.header("authorization");
    const KEY = "TuanPham";
    try {
        const decoded = jwt.verify(token,KEY)
        req.user = decoded;
        next()
    }
    catch(error){
        res.status(403).json({errors:"Token không hợp lệ => không thể vào"})
    }
}

module.exports={authenticating}