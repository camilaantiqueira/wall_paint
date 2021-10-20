
class WallService {
    constructor() {}

    calculateTotalWallPaint(wallArray) {
        let total_area = 0;

        wallArray.map((wall) => {
            if(wall) {
                wall.height?  parseFloat(wall.height) : 0;
                wall.width? parseFloat(wall.width) : 0;
                wall.windows? parseInt(wall.windows) : 0;
                wall.doors? parseInt(wall.doors) : 0;
    
                total_area = total_area + this.calculateTotalArea(wall);
            }
        });

        let wall_paint = this.calculatePaintVolume(total_area);

        return wall_paint;
    }

    calculateTotalArea (wallObj) {
        if(wallObj.width > 15 || wallObj.height > 15 || wallObj.width < 1 || wallObj.height < 1) {
            throw "As medidas da parede não devem ser maiores que 15m nem menores que 1m"
        }

        let wall_area = (wallObj.width * wallObj.height);

        if(wallObj.windows > 0 || wallObj.doors > 0) {
            if(wallObj.height < 2.20) {
                throw "A altura de uma parede com porta deve ser no mínimo 30cm maior que a altura da porta"
            }

            wall_area = this.calculateResultingArea(wall_area, wallObj);     
        }

        return wall_area;
    }

    calculateResultingArea(wallArea, wallObj) {
        let wall_area = wallArea;
        const windows_area = (WINDOWS_HEIGHT*WINDOWS_WIDTH) * wallObj.windows;
        const doors_area = (DOOR_HEIGHT*DOOR_WIDTH) * wallObj.doors;
        let area_percent = (windows_area + doors_area)/wall_area;

        if(area_percent > 0.5) {
            throw "As portas e janelas devem ocupar no máximo 50% da área da parede" 
        }

        wall_area = wall_area - (windows_area + doors_area);

        return wall_area;
    }

    calculatePaintVolume(wall_area) {
        let cans = 1;
        let paint_can = 0;
        let paint_volume = parseFloat((wall_area/METERS_PER_LITER).toFixed(2));
        let additional_paint = 0;

        if(paint_volume < PAINT_VOLUME_1) {
            paint_can = PAINT_VOLUME_1;
        }
        else if(paint_volume > PAINT_VOLUME_1 && paint_volume <= PAINT_VOLUME_2){
            paint_can = PAINT_VOLUME_2;
        }
        else if(paint_volume > PAINT_VOLUME_2 && paint_volume <= PAINT_VOLUME_3) {
            paint_can = PAINT_VOLUME_3;
        }
        else if(paint_volume > PAINT_VOLUME_3 && paint_volume <= PAINT_VOLUME_4) {
            paint_can = PAINT_VOLUME_4;
        }
        else {
            cans = Math.floor(paint_volume/PAINT_VOLUME_4);
            paint_can = PAINT_VOLUME_4;
            let more_paint = (paint_volume - (cans * PAINT_VOLUME_4));

            if(more_paint< PAINT_VOLUME_1) {
                additional_paint = PAINT_VOLUME_1;
            }
            else if(more_paint > PAINT_VOLUME_1 && more_paint <= PAINT_VOLUME_2){
                additional_paint = PAINT_VOLUME_2;
            }
            else if(more_paint > PAINT_VOLUME_2 && more_paint <= PAINT_VOLUME_3) {
                additional_paint = PAINT_VOLUME_3;
            }
            else if(more_paint > PAINT_VOLUME_3 && more_paint <= PAINT_VOLUME_4) {
                cans = cans + 1;
            }
        }

        let wallPaint = {
            cans,
            paint_can,
            additional_paint,
            paint_volume
        };

        return wallPaint;
    }
}

module.exports =  WallService;