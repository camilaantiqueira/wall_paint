const wallController = require('../modules/walls/walls.controller');

const WallController = new wallController();

module.exports = (app) => {

    app.get('/',(req,res) => {
        res.send('Backend running')
    });

    app.post('/calculate', WallController.calculateWallPaint());
}