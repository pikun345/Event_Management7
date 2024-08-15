const err_list = require("../err_list/errlst");

const errohanler=(err,req,res,next)=>{
const statusCode=res.statusCode ? res.statusCode:500;

switch(statusCode)
{
    case err_list.VALIDATION_ERR:
        res.json({title:"validation failed",message:err.message,stackTrace:err.stack});
        break;
    case err_list.UNAUTHORIZED:
        res.json({title:"unauth",message:err.message,stackTrace:err.stack});
        break;
    case err_list.FORBIDDEN:
        res.json({title:"forbidden",message:err.message,stackTrace:err.stack})
        break;
    case err_list.NOT_FOUND:
        res.json({title:"not found",message:err.message,stackTrace:err.stack})
        break;
    // default:
    //     console.log("no err  ")
    
}



}
//stacktrace used to find out in which exact point err is comimg




module.exports=errohanler;

//err.msg ? err.stack ?
//err not coming
