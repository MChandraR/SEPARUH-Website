class utils{
    sendResponse(res, code, msg, data){
        res.send({
            status : code, 
            message : msg,
            data : data
        });
    }
}

module.exports = new utils();
