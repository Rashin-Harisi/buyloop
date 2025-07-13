const multer  = require('multer')
const fs = require('fs')
const path = require('path')
const createHttpError = require('http-errors')


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        fs.mkdirSync(path.join(process.cwd(),"public","upload"),{recursive:true})
        cb(null,"public/upload")
    },
    filename: function(req,file,cb){
        const whiteList=["image/png","image/jpg","image/jpeg","image/webp"]
        if(whiteList.includes(file.mimetype)){
            const format = path.extname(file.originalname);
            const filename = new Date().getTime().toString() + format
            cb(null, filename)
        }else{
            cb(new createHttpError.BadRequest("Pictures' format is not acceptable. Please upload pictures in .png/.jpg/.jpeg/.webp formats"))
        }
    }
})
const upload = multer({ 
    storage,
    limits:{
        fileSize: 3 * 1000 * 1000 //bytes
    }
 })

module.exports= {upload}