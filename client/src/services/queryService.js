import * as droneService from "./droneService";
import * as orderService from "./orderService";
import * as warehouseService from "./warehouseService";
import * as customerService from "./customersService";


export const addDetailsToOrders = async () => {
    const detailedOrderList = orderService.buildOrderDetailedList();
    // let droneFilteredList = await findMostSuitableDron("1", 23);
    // // console.log(droneFilteredList);
    // let warehouise = await warehouseService.setWhStartTime("1", "00:00");
    // console.log(warehouise);
    // let droneToChange = await droneService.calculateActualCapacity(droneFilteredList._id, 23);
    // droneToChange = await droneService.changeStatus(droneFilteredList._id, "busy");
    // let orderToChange = await orderService.changeOrderStatus(1, 'currently in delivery');
    // orderToChange = await orderService.setOrderPath(1, 23);
    return detailedOrderList;
}
export const addCoordinatesToOrders = async () => {
    const CoordinatesOrderList = orderService.buildOrderCoordinatesList();
    return CoordinatesOrderList;
}



//set start time from what comes from input
const estimateGeneralStartTime = "00:00";
//this comes also from input
const timeIntervalInMins = 120;


export const startProgramFlow = async () => {
    let orderList = await orderService.getAll();
    let orderDetails = {};
    let nearestWarehouseData = [];
    let drone = {};
    let packingTime = 5;
    for (let i = 3; i < orderList.length; i ++) {
        orderDetails = await orderService.getDetails(orderList[i]._id);
        
        nearestWarehouseData = await orderService.findNearestWarehouse(orderDetails.coordinates.x, orderDetails.coordinates.y);
        //path = nearestWarehouseData[0]; warehouseId = nearestWarehouseData[1]
        drone = await findMostSuitableDron(nearestWarehouseData[1], nearestWarehouseData[0]);
        console.log(JSON.stringify(drone));
        if ((Object.keys(drone).length > 0) && (drone._id > -1)) {
            
            let warehouse = await warehouseService.setWarehouseTime(nearestWarehouseData[1], packingTime);
            let droneToChange = await droneService.calculateActualCapacity(drone._id, nearestWarehouseData[0]);
            droneToChange = await droneService.changeStatus(drone._id, "busy");
            let orderToChange = await orderService.changeOrderStatus(orderList[i]._id, 'currently in delivery');
            orderToChange = await orderService.setOrderPath(orderList[i]._id, nearestWarehouseData[0]);
            orderToChange = await orderService.setOrderDrone(orderList[i]._id, drone._id);  
            orderToChange = await orderService.setOrderStartTime(orderList[i]._id, warehouse.time + packingTime);
        } else {
            console.log('startProgramFlow: NO Drones available');

            //charge drones
        }
        
        // break;
    }
    
    
    
    
    // let warehouise = await warehouseService.setWarehouseTime("1", 0);
    // console.log(warehouise);
    // let droneToChange = await droneService.calculateActualCapacity(drone._id, 23);
    // droneToChange = await droneService.changeStatus(droneFilteredList._id, "busy");
    // let orderToChange = await orderService.changeOrderStatus(1, 'currently in delivery');
    // orderToChange = await orderService.setOrderPath(1, 23);
    // orderToChange = await orderService.setOrderDrone(1, 3);
}
    
//get first order

// find nearest wh
// find path
// orderServices

//find the most suitable dron. the one with the closest capacity
export const findMostSuitableDron = async (wh_id, path ) => {

    const droneList = await droneService.getDronesFromWarehouse(wh_id);
    console.log(JSON.stringify(droneList));
    let capacityDroneList = [];
    let idsDroneList = [];
    for(let i in droneList) { 
        console.log(droneList[i].actualCapacity);
        if ((droneList[i].actualCapacity > path) && (droneList[i].status == "ready")){
            capacityDroneList.push(droneList[i].actualCapacity); 
            idsDroneList.push(droneList[i]._id);
        } 
     }; 
     console.log("capacityDroneList");
     console.log(JSON.stringify(capacityDroneList));
     
     if (capacityDroneList.length > 0) {
        let closestCapacity = Math.min(...capacityDroneList);
        
        let droneIndex = capacityDroneList.indexOf(closestCapacity);
        
        console.log("idsDroneList[droneIndex]");
        console.log(JSON.stringify(idsDroneList[droneIndex]));
        return {
            _id: idsDroneList[droneIndex]
        };
    } else {
        console.log("findMostSuitableDron : NO suitable dron found in this warehouse");
        return {
            _id: -1
        };
    }
}

//set wh start time
//warehouseServices

//calculate batery and actual capacity
//droneService.calculateActualCapacity


//add 5 min to the wh start time
//set order start time
//add path/min to order start time
//add path to orders
//drone set available to "busy"


    
// export const getNearestWarehouse = async (xCoordinate, yCoordinate) => {
//     const warehouseList = await warehouseService.getAll();
//     console.log(JSON.stringify(warehouseList));
    
//         let paths = [];
//         let horPath, vertPath = 0;
//         for (let i = 0; i < warehouseList.length; i ++) {
//             horPath = Math.abs(warehouseList[i].x - xCoordinate);
//             vertPath = Math.abs(warehouseList[i].y - yCoordinate);
//             paths[i] = horPath + vertPath;   
//         }
//         console.log(JSON.stringify(paths));
//         let minPath = Math.min(...paths);
//         let warehouseIndex = paths.indexOf(minPath);
//         let data  = [];
//         data.push(minPath);
//         data.push(warehouseIndex);

//         return data;
// };

