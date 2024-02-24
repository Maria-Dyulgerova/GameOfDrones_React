import * as request from "../lib/request";


const baseUrl = 'http://localhost:3030/jsonstore/drones';
const droneTypesUrl = 'http://localhost:3030/jsonstore/drone_types';



export const getAll = async () => {
    const result = await request.get(baseUrl);
    return Object.values(result);
};
export const getOne = async (drone_id) => {

    const result = await request.get(`${baseUrl}/${drone_id}`, );

    return result;
}
export const create = async (droneData) => {
    const body_json = {
        _id: droneData._id,
        droneType: droneData.droneType,
        actualCapacity: "",
        warehouseId: droneData.warehouseId,
        batCharge: droneData.batCharge
    }
    const result = await request.post(baseUrl, body_json);

    return result;
};

export const edit = async (droneId, droneData) => {
    const body_json = {
        _id: droneId,
        droneType: droneData.droneType,
        actualCapacity: droneData.actualCapacity,
        warehouseId: droneData.warehouseId,
        batCharge: droneData.batCharge
    };
    const result = await request.put(`${baseUrl}/${droneId}`, body_json);

    console.log(result);
    return result;
};
export const remove = async (droneId) => request.remove(`${baseUrl}/${droneId}`);

export const body_json = {
    _id: "",
    droneType: "",
    actualCapacity: "",
    batCharge: "",
    warehouseId: ""
}
export const calculateActualCapacity = async (droneType) => {
    const result = await request.get(droneTypesUrl);
    
    let resultLength = Object.keys(result).length;
    const resultArr = Object.values(result);
    return resultArr;
    // get capacity, power consumption
    // .replace(/[^0-9]/g, '')
    //  get batCharge 

    for (let i = 0; i < resultLength; i ++) {

    }
}

function numbFromString(str) { 
    var num = str.replace(/[^0-9]/g, ''); 
    return parseInt(num,10); 
}