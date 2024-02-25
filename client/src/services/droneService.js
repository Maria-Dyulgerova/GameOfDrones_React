import * as request from "../lib/request";

import * as warehouseServices from "./warehouseService";
const baseUrl = 'http://localhost:3030/jsonstore/drones';
const droneTypesUrl = 'http://localhost:3030/jsonstore/drone_types';



export const getAll = async () => {
    const result = await request.get(baseUrl);
    return Object.values(result);
};
export const getOne = async (drone_id) => {
    // console.log(drone_id);
    const result = await request.get(`${baseUrl}/${drone_id}`, );
    // console.log(JSON.stringify(result));
    return result;
}
export const create = async (droneData) => {
    // console.log(droneData.droneType);
    
    const droneDetails = await getDroneDetails(droneData.droneType);
    let capacity = convertInWats(droneDetails.capacity);
    // console.log(droneDetails.capacity);
    // console.log(JSON.stringify(droneData));
    const body_json = {
        _id: droneData._id,
        droneType: droneData.droneType,
        actualCapacity: capacity,
        warehouseId: droneData.warehouseId,
        batCharge: 100
    }

    const result = await request.post(baseUrl, body_json);

    return result;
};


const getConsumption = async (droneType) => {
    const droneDetails = await getDroneDetails(droneType);
    return numbFromString(droneDetails.consumption);
   
}
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
//calculate batery and actual capacity

export const calculateActualCapacity = async (droneId, path) => {

    const drone = await getOne(droneId);
    console.log(JSON.stringify(drone));
    // console.log(droneId);
}

// export const calculateActualCapacity = async (droneType) => {
    
//     const droneDetails = await getDroneDetails(droneType);
//     let capacity = getCapacityInWats(droneDetails.capacity);

//     let consumption = numbFromString(droneDetails.consumption);

//     return capacity;
//     // get capacity, power consumption
//     // .replace(/[^0-9]/g, '')
//     //  get batCharge 

    
// }

export const getDroneDetails = async(droneType) => {
    // console.log("getDroneDetails");
    // console.log("droneType from params: ");
    
    // console.log(typeof(droneType));
    // console.log(droneType);
    const result = await request.get(droneTypesUrl);
    // console.log(JSON.stringify(result));
    const droneTypeList = Object.values(result);
    // console.log(JSON.stringify(droneTypeList));
    let droneData = {}; 
    for (let i = 0; i < droneTypeList.length; i ++) {
        // console.log("droneTypeList[i]: ");
        // console.log(typeof(droneTypeList[i]._id));
        // console.log(droneTypeList[i]._id);
        if (droneTypeList[i]._id == droneType) {
            // console.log("here !!!");
            droneData = droneTypeList[i];
            break;
        }
    }
    // console.log("droneData");
    // console.log(droneData);
    // let capacity = droneData.capacity;
    // let capacity = convertInWats(droneData.capacity);

    
    
    return droneData;

}
export const getDronesFromWarehouse = async (wh_id) => {
    let droneList = await request.get(baseUrl);
    let filteredDroneList = [];
    for(let i in droneList) { 
        // console.log(droneList[i]);
        if (droneList[i].warehouseId == wh_id) {
            filteredDroneList.push(droneList[i]); 
        }
     }; 
    // console.log(filteredDroneList);
    return filteredDroneList;
}

// export const setBatteryCharge = async (drone_id, batChargePercentage) => {
//     const droneData = await getOne(drone_id);
//     const body_json = {
//         _id: droneData._id,
//         droneType: droneData.droneType,
//         actualCapacity: droneData.actualCapacity,
//         warehouseId: droneData.warehouseId,
//         batCharge: batChargePercentage
//     };

// }
function convertInWats(inputCapacity) {
    let units = symbFromString(inputCapacity);
    console.log(numbFromString(inputCapacity));
    console.log(units);
    
    // let capacityUnits = inputCapacity.substring(capacity.length - 2);
    // //I asume that if last two symbols are not KW, then the units are W. If we dont unify the mesure units in the input data
    let capacity = (units === "kW") ? numbFromString(inputCapacity) * 1000 : numbFromString(inputCapacity);
    // return capacity;
    return capacity
}
function numbFromString(str) { 
    var num = str.replace(/[^0-9]/g, ''); 
    return parseInt(num,10); 
}
function symbFromString(str) { 
    var symbols = str.replace(/[^a-zA-Z]/g, ''); 
    return symbols; 
}