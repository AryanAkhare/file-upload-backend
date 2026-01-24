const File=require("../models/File")

exports.localFileUpload=async(req,res)=>{
    try{
        //fetch file
        const file=req.files.file;
        console.log('File comming',file);

        let path=__dirname+"/files/"+Date.now()+`.${file.name.split('.')[1]}`;

        file.mv(path,(err)=>{
            if(err){
                console.log(err)
                return res.status(500).json({
                    success:false,
                    message:'Error moving file.'
                });
            }
            res.json({
                success:true,
                message:'Local File Uploaded Successfully.'
            })
        });


    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message:'Local File Uploading Failed.'
        })
    }
}