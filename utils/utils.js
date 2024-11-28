class utils{
    sendResponse(res, code, msg, data=null){
        res.send({
            status : code, 
            message : msg,
            data : data
        });
    }
}

module.exports = new utils();
