// import * as orderService from './orderService';
import * as request from "../lib/request";
// import * as droneService from "./droneService";
import * as orderService from "./orderService";
import * as warehouseService from "./warehouseService";


const baseOrdersUrl = 'http://localhost:3030/jsonstore/orders';
const baseWarehousesUrl = 'http://localhost:3030/jsonstore/warehouses';
const baseDronesUrl = 'http://localhost:3030/jsonstore/drones';



export const getAllOrders = async () => {
    const result = await request.get(baseOrdersUrl);

    return Object.values(result);
};
export const getFirstOrder = async (order_id) => {

    const result = await request.get(`${baseOrdersUrl}/${order_id}`, );

    return result;
};
const getNearestWarehouse = async (hCoordinate, vCoordinate) => {
    const allWarehouses = await request.get(baseWarehousesUrl);

    return result;
};
const pickWareHouse = async(warehouseList, orderHCoordinate, orderVCoordinate) => {
    
    let horPath, vertPath = 0;
    let minPath = 0;
    let paths = [];
    for (let i = 0; i < warehouseList.length; i++) {
        horPath = Math.abs(warehouseList[i].location?.hCoordinate - orderHCoordinate);
        vertPath = Math.abs(warehouseList[i].location?.vCoordinate - orderVCoordinate);
        paths[i] = horPath + vertPath;
        
    }
    // console.log("paths");
    // console.log(paths);
    minPath = Math.min(...paths);
    let index = paths.indexOf(minPath);
    let data  = [];
    data.push(minPath);
    data.push(index);
    
    return data;
    
}
export const getOneDrone = async (drone_id) => {

    const result = await request.get(`${baseDrenesUrl}/${drone_id}`, );

    return result;
}
const pickDrone = async(minPath, droneListIds) => {
    let droneData = {};
    let droneAbility = 0;
    for(let i = 0; i < droneListIds.length; i ++) {
        droneData = await getOneDrone(droneListIds[i]);
        // console.log(JSON.stringify(droneData.batCapacityKW));
        // console.log("batCapacity * batCharged* 1000: " + droneData.batCapacityKW * droneData.batCharge * 1000 );
        // console.log("minPath * 2: " + minPath * 2 );
        droneAbility = droneData.batCapacityKW * droneData.batCharge * 1000;
        if (droneAbility > minPath) {
            return droneData;
        }
    }
    return droneData;
    
}
export const makeEstimate = async () => {
    let data = [];
    // const result = getAllOrders();
    
    const allOrders = await request.get(baseOrdersUrl);
    const currentOrder = await getFirstOrder(Object.keys(allOrders)[0]);

    const allWarehouses = await request.get(baseWarehousesUrl);
    let warehouseListArray = Object.values(allWarehouses);
    
    const nearestWhData = await pickWareHouse(warehouseListArray, currentOrder.hCoordinate, currentOrder.vCoordinate);
    
    //the index of the warehouse is at the position 1
    const nearestWh = warehouseListArray[nearestWhData[1]];
    const dronesList = eval(nearestWh.drones);
    const minPath = nearestWhData[0];
    const droneReady = await pickDrone(minPath, dronesList);
    // console.log(currentOrder);
    // console.log(nearestWhData);
    // console.log(droneReady);
    data.push(currentOrder);
    data.push(nearestWh);
    data.push(droneReady);


    droneService.sendDrone(droneReady._id, droneReady);
    orderService.editOrderStatusSend(currentOrder._id, currentOrder, minPath);
    orderService.toLogOrderSent(currentOrder._id, droneReady._id, nearestWhData[1], )
    let removedroneres = await warehouseService.removeDroneFromList(droneReady._id, nearestWh);
    // if (removedroneres === undefined) {
    //     collect drones
    // }
    let recsFromLog = await orderService.getRecsFromLog();
    console.log(recsFromLog);

    return data;

    // let warehousesCount = Object.keys(allWarehouses).length;
    
    // return allWarehouses;
    // return currentOrder;
};
