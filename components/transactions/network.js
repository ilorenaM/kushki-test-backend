const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const {config, KushkiInstance} = require('../../config/config') 

router.get('/',  function (req, res, number){
    console.log("[LOG-INFO] List transactions service");
    const errorMessage = 'An error has occurred while searching transactions';
    //console.log(res);
    
    try{
        const today = new Date()
        const params = {
            from: '2022-03-04T23:59:59',
            to: today.toISOString(),
            merchant_id: config.merchanId
        }
        KushkiInstance.get('/analytics/v1/transactions-list', {params})
        .then((instRes)=>{
            response.success(req, res, instRes.data.data)
        })
        .catch((instError)=>{
            if(instError.response){
                response.error(req, res, instError.response.data.message, instError.response.status, errorMessage)
            }else{
                response.error(req, res, "error", 500, errorMessage)
            }
        })
    }catch (err) {
        console.error(err);
        response.error(req, res, err, 500, errorMessage)
    }
    
})

router.delete('/void/:ticket',  function (req, res, number){
    console.log("[LOG-INFO] Void a transaction service");
    const errorMessage = 'An error has occurred while void a transaction';
    //console.log(res);
    
    try{
        const ticket = req.params.ticket;
        KushkiInstance.delete(`/v1/charges/${ticket}`, {"fullResponse": true})
        .then((instRes)=>{
            console.log(instRes.data);
            response.success(req, res, instRes.data)
        })
        .catch((instError)=>{
            if(instError.response){
                response.error(req, res, instError.response.data.message, instError.response.status, errorMessage)
            }else{
                response.error(req, res, "error", 500, errorMessage)
            }
        })
    }catch (err) {
        console.error(err);
        response.error(req, res, err, 500, errorMessage)
    }
    
})

module.exports = router;