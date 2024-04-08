const httpStatusCode = require('../constant/httpStatusCode');
const workerModel = require('../models/workerModel')

const viewWorker = async (req,res) =>{
    try{
        const workers = await workerModel.find();
        if(!workers){
            return res.status(httpStatusCode.BAD_REQUEST).json({
                success:false,
                message:"worker are not found",
            })
        }
        return res.status(httpStatusCode.OK).json({
            success:true,
            message:"Successfully worker found",
            data:workers,
        })
    }catch(error){
        console.error("Error in View",error);
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:"something went wrong",
            error:error.message
        })
    }
}
const viewWokerProfile = async(req,res)=>{
    try{
        const {id} = req.body;
        const workers = await workerModel.findById(id);
        if(!workers){
            return res.status(httpStatusCode.BAD_REQUEST).json({
                success:false,
                message:"worker are not found",
            })
        }
        return res.status(httpStatusCode.OK).json({
            success:true,
            message:"Successfully worker found",
            data:workers,
        })
    }catch(error){
        console.error("Error in View",error);
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:"something went wrong",
            error:error.message
        })
    }
}
module.exports={
    viewWorker,
    viewWokerProfile,
}