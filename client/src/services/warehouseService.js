import * as request from "../lib/request";
import * as droneService from "../services/droneService"


// const baseUrl = 'http://localhost:3030/jsonstore/input_data/warehouses';
const baseUrl = 'http://localhost:3030/jsonstore/warehouses';

export let warehouseTime = 0;

export const getAll = async () => {
    const result = await request.get(baseUrl);

    return Object.values(result);
    // return result;
};
export const getOne = async (warehouse_id) => {

    const warehouseData = await request.get(`${baseUrl}/${warehouse_id}`, );

    const drones = await droneService.getDronesFromWarehouse(warehouse_id);

    warehouseData.drones = JSON.stringify(drones);

    return warehouseData;
}
export const body_json = {
    _id: "",
    name: "",
    x: "",
    y: "",
    time: ""
}
export const edit = async (warehouse_id, warehouseData) => {
    const body_json = {
        _id: warehouse_id,
        name: warehouseData.name,
        x: warehouseData.x,
        y: warehouseData.y,
        time: warehouseData.time
    };
    const result = await request.put(`${baseUrl}/${warehouse_id}`, body_json);

    return result;
};
export const setWarehouseTime = async (wh_id, minPlus) => {
    const warehouse = await getOne(wh_id);
    let whTime = (warehouse.time != undefined) ? warehouse.time + minPlus : minPlus;
    
    const body_json = {
        _id: wh_id,
        name: warehouse.name,
        x: warehouse.x,
        y: warehouse.y,
        time: whTime
    };

    const refacturedWh = await edit(wh_id, body_json);
    console.log("setWarehouseTime(...) -> result:");
    console.log(JSON.stringify(refacturedWh));
    return refacturedWh;
}
// export const addDroneToList = async (drone_id, wh_id) => {
    
// }
// export const removeDroneFromList = async (drone_id, whData) => {
//     if (drone_id === undefined) {
//         return;
//     }
//     let droneList = eval(whData.drones);
// // console.log(drone_id);
//     let droneListStr = whData.drones;
//     let droneIndex = droneList.indexOf(Number(drone_id));
    
//     droneList.splice(droneIndex, 1);
    
//     if (droneIndex >= 0) {
        
//         droneListStr = "[" + droneList.toString() + "]";
//     }
    
//     const body_json = {
        
//         _id: whData._id,
//         whName: whData.whName,
//         location: {
//             hCoordinate: whData.location.hCoordinate,
//             vCoordinate: whData.location.vCoordinate
//         },
//         drones: droneListStr
//     };
        

//     const result = await request.put(`${baseUrl}/${whData._id}`, body_json);
//     // console.log(body_json);
//     return result;
// }