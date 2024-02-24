import * as request from "../lib/request";


// const baseUrl = 'http://localhost:3030/jsonstore/input_data/warehouses';
const baseUrl = 'http://localhost:3030/jsonstore/warehouses';



export const getAll = async () => {
    const result = await request.get(baseUrl);

    return Object.values(result);
    // return result;
};
export const getOne = async (warehouse_id) => {

    const result = await request.get(`${baseUrl}/${warehouse_id}`, );

    return result;
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