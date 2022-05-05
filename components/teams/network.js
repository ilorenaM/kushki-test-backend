const express = require('express');
const { checkApiKey } = require('../../middleware/auth');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./controller');


router.get('/', checkApiKey, function (req, res, number){
    console.log("[LOG-INFO] List teams service");
    const errorMessage = 'An error has occurred while searching teams';
    //console.log(res);
    if(res.statusCode != 401){
        try{
            controller.getTeams()
                .then((data) => {
                    response.success(req, res, data);
                })
                .catch((message) => {
                    response.error(req, res, message, 500, errorMessage)    
                });
        }catch (err) {
            console.error(err);
            response.error(req, res, err, 500, errorMessage)
        }
    }
})

router.get('/:id/players', checkApiKey, function (req, res){
    console.log("[LOG-INFO] List players by team service");
    const errorMessage = 'An error has occurred while searching players';
    if(res.statusCode != 401){
        try{
            const teamId = req.params.id;
    
            controller.getPlayersByTeam(teamId)
                .then((data) => {
                    response.success(req, res, data);
                })
                .catch((message) => {
                    response.error(req, res, message, 500, errorMessage)    
                });
        }catch (err) {
            response.error(req, res, err, 500, errorMessage)
        }
    }
})

router.get('/players/:position', checkApiKey, function (req, res){
    console.log("[LOG-INFO] List players by position service");
    const errorMessage = 'An error has occurred while searching players';
    if(res.statusCode != 401){
        try{
            const position = req.params.position;
    
            controller.getPlayersByPosition(position)
                .then((data) => {
                    response.success(req, res, data);
                })
                .catch((message) => {
                    response.error(req, res, message, 500, errorMessage)    
                });
        }catch (err) {
            response.error(req, res, err, 500, errorMessage)
        }
    }
})

module.exports = router;