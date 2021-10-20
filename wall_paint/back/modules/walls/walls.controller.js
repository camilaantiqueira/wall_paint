const wallService = require('./walls.service');

const serviceWall = new wallService();

class WallController {
    constructor() {}

    calculateWallPaint() {
        return function(req,res) {
            try {
                let data = req.body;
                let wallPaint = serviceWall.calculateTotalWallPaint(data.wallObj);
                res.send(wallPaint);   
            }
            catch (error) {
                res.send(error)
            }
           
        }
    }
}


const Wall = new WallController();
module.exports = WallController;