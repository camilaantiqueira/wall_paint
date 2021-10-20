import axios from "axios";

let API = axios.create({
    baseURL: "http://localhost:5000/",
    responseType: "json",
})

const ServiceHandler = {
    calculateWallPaint: async function(wallObj) {
        const response = await API.post('/calculate', {
            wallObj
        });
        return response;
    }
}

export default ServiceHandler;