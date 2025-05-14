const NotFound = (req,res,next)=>{
    return res.status(404).json({
        statusCode : res.statusCode,
        error:{
            type: "NotFound",
            message: `Not found ${req.url} route`
        }
    })

}
const ErrorHandler = (err,req,res,next)=>{
    let status = err?.status ?? err?.statusCode ?? err?.code;
    if(!status || isNaN(+status) || status>511 || status<200 ) status = 500;
    return res.json({
        statusCode : status,
        error:{
            message: err?.message ?? err?.stack ?? "Internal Server Error"
        }
    })
}

module.exports={
    NotFound,
    ErrorHandler
}