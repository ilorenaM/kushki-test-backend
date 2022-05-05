const store = require('./store')

const getTeams = () => {
    return new Promise((resolve, reject) => {
       try {           
           const teams = store.listTeams();
           resolve(teams);
       } catch (error) {
           reject(error)
       }
    });
};

const getPlayersByTeam = (teamId) => {
    return new Promise((resolve, reject) => {

        if(!teamId || teamId == null || teamId == '' || !parseInt(teamId, 8)){
            reject('El Id del equipo es obligatorio y numérico');
        }

        try {           
            const players = store.listPlayersByTeam(teamId);
            resolve(players);
        } catch (error) {
            reject(error)
        }
    });
};

const getPlayersByPosition = (position) => {
    return new Promise((resolve, reject) => {
        
        if(!position || position == null || position == ''){
            reject('La posición es obligatoria');
        }

        try {           
            const players = store.listPlayersByPosition(position);
            resolve(players);
        } catch (error) {
            reject(error)
        }
    });
};

module.exports = {
    getTeams,
    getPlayersByTeam,
    getPlayersByPosition
}