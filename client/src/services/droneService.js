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
        batCharge: 100
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
export const receiveDroneToWarehouse = async (droneId, warehouseId, passedMin) => {
    //calculate actual capacity / batCharge 
}

export const calculateActualCapacity = async (droneType) => {
    
    const droneDetails = await getDroneDetails(droneType);
    let capacity = getCapacityInWats(droneDetails.capacity);

    let consumption = numbFromString(droneDetails.consumption);

    return capacity;
    // get capacity, power consumption
    // .replace(/[^0-9]/g, '')
    //  get batCharge 

    
}

export const getDroneDetails = async(droneType) => {
    const result = await request.get(droneTypesUrl);
    
    // let resultLength = Object.keys(result).length;
    const droneTypeList = Object.values(result);

    for (let i = 0; i < droneTypeList.length; i ++) {
        if (droneTypeList[i]._id == droneType) {
            return droneTypeList[i];
        }
    }
}

export const setBatteryCharge = async (drone_id, batChargePercentage) => {
    const droneData = await getOne(drone_id);
    const body_json = {
        _id: droneData._id,
        droneType: droneData.droneType,
        actualCapacity: droneData.actualCapacity,
        warehouseId: droneData.warehouseId,
        batCharge: batChargePercentage
    };

}
function getCapacityInWats(capacity) {
    let capacityUnits = capacity.substring(capacity.length - 2);
    // capacity = numbFromString(capacity);
    //I asume that if last two symbols are not KW, then the units are W. If we dont unify the mesure units in the input data
    capacity = (capacityUnits === "kW") ? numbFromString(capacity) : numbFromString(capacity) / 1000;
    return capacity;
}
function numbFromString(str) { 
    var num = str.replace(/[^0-9]/g, ''); 
    return parseInt(num,10); 
}