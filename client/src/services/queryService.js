import * as droneService from "./droneService";
import * as orderService from "./orderService";
import * as warehouseService from "./warehouseService";
import * as customerService from "./customersService";


export const addDetailsToOrders = async () => {
    const detailedOrderList = orderService.buildOrderDetailedList();
    let droneFilteredList = await findMostSuitableDron("1", 23);
    // console.log(droneFilteredList);
    let warehouise = await warehouseService.setWhStartTime("1", "00:00");
    console.log(warehouise);
    let droneToChange = await droneService.calculateActualCapacity(droneFilteredList._id, 23);
    return droneFilteredList;
}
export const addCoordinatesToOrders = async () => {
    const CoordinatesOrderList = orderService.buildOrderCoordinatesList();
    return CoordinatesOrderList;
}



//set start time from what comes from input
const estimateStartTime = "00:00";

    
//get first order

// find nearest wh
// find path
// orderServices

//find the most suitable dron. the one with the closest capacity
export const findMostSuitableDron = async (wh_id, path ) => {
    const droneList = await droneService.getDronesFromWarehouse(wh_id);
    console.log(JSON.stringify(droneList));
    let capacityDroneList = [];
    for(let i in droneList) { 
        // console.log(droneList[i].actualCapacity);
        if (droneList[i].actualCapacity > path) {
            capacityDroneList.push(droneList[i].actualCapacity); 
        }
     }; 
    let closestCapacity = Math.min(...capacityDroneList);
    let droneIndex = capacityDroneList.indexOf(closestCapacity);
        

    console.log(JSON.stringify(droneList[droneIndex]));
    return droneList[droneIndex];
}

//set wh start time
//warehouseServices

//calculate batery and actual capacity
//droneService


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

