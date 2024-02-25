import * as droneService from "./droneService";
import * as orderService from "./orderService";
import * as warehouseService from "./warehouseService";
import * as customerService from "./customersService";


export const addDetailsToOrders = async () => {
    const detailedOrderList = orderService.buildOrderDetailedList();
    let droneFilteredList = await findMostSuitableDron("1");

    return droneFilteredList;
}
export const addCoordinatesToOrders = async () => {
    const CoordinatesOrderList = orderService.buildOrderCoordinatesList();
    return CoordinatesOrderList;
}



//set start time from what comes from input
const estimateStartTime = "00:00";

    
//get first order

//find nearest wh



//find path

//find the most suitable dron. the one with the closest capacity
export const findMostSuitableDron = async (wh_id, path ) => {
    const droneList = await droneService.getDronesFromWarehouse(wh_id);
    console.log(JSON.stringify(droneList));

    for(let i in droneList) { 
        // console.log(droneList[i]);
        if (droneList[i].actualCapacity > path) {
            filteredDroneList.push([i,droneList[i]]); 
        }
     }; 

    return droneList;
}

//set wh start time
//calculate batery and actual capacity

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

