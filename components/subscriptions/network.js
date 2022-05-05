const express = require('express');
const router = express.Router();
const response = require('../../network/response');

router.get('/makesubscription',  function (req, res, number){
    console.log("[LOG-INFO] List teams service");
    const errorMessage = 'An error has occurred while searching teams';
    //console.log(res);
    if(res.statusCode != 401){
        try{
            response.success(req, res, "si")
        }catch (err) {
            console.error(err);
            response.error(req, res, err, 500, errorMessage)
        }
    }
})

module.exports = router;