const sucessResponse = (res, status, data, message)=>{
    res.status(status).json({
        message: message,
        data: data
    })
}

export default sucessResponse;