const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const {config, KushkiInstance} = require('../../config/config'); 
const { checkApiKey } = require('../../middleware/auth');
const fs = require('fs');

router.post('/makesubscription',checkApiKey,  function (req, res, number){
    console.log("[LOG-INFO] Make a subscription service");
    const errorMessage = 'An error has occurred while making a subscription';
    

    const token = req.headers['token'];
    const payload = {...req.body, token }
    console.log(payload);
    if(res.statusCode != 401){
        try{
            KushkiInstance.post('/subscriptions/v1/card', {...payload})
        .then((instRes)=>{
            console.log(instRes.data);
            try {
                const subscriptions = require('../../subscriptions.json')
                var content = [...subscriptions]
                content.push(instRes.data)
                fs.writeFileSync('subscriptions.json', JSON.stringify(content));
            } catch (error) {
                console.log(error);
            }
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
    }
})

router.get('/',  function (req, res, number){
    console.log("[LOG-INFO] List subscriptions service");
    const errorMessage = 'An error has occurred while searching subscriptions';
    //console.log(res);
    
    try{
        const subscriptions = require('../../subscriptions.json')
        response.success(req, res, subscriptions)
    }catch (err) {
        console.error(err);
        response.error(req, res, err, 500, errorMessage)
    }
    
})
router.get('/:subscriptionId',  function (req, res, number){
    console.log("[LOG-INFO] List subscriptions service");
    const errorMessage = 'An error has occurred while searching subscriptions';
    //console.log(res);
    
    try{
        const subscriptionId = req.params.subscriptionId;
        KushkiInstance.get('/subscriptions/v1/card/search/'+subscriptionId)
        .then((instRes)=>{
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

router.post('/:subscriptionId/authorize',  function (req, res, number){
    console.log("[LOG-INFO] List subscriptions service");
    const errorMessage = 'An error has occurred while searching subscriptions';
    //console.log(res);
    const payload = {...req.body }
    try{
        const subscriptionId = req.params.subscriptionId;
        KushkiInstance.post(`/subscriptions/v1/card/${subscriptionId}/authorize`, {...payload})
        .then((instRes)=>{
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

router.post('/:subscriptionId/capture',  function (req, res, number){
    console.log("[LOG-INFO] List subscriptions service");
    const errorMessage = 'An error has occurred while searching subscriptions';
    //console.log(res);
    const payload = {...req.body }
    try{
        const subscriptionId = req.params.subscriptionId;
        KushkiInstance.post(`/subscriptions/v1/card/${subscriptionId}/capture`, {...payload})
        .then((instRes)=>{
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