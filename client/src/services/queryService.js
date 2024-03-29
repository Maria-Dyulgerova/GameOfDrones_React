import * as droneService from "./droneService";
import * as orderService from "./orderService";
import * as warehouseService from "./warehouseService";
import * as customerService from "./customersService";
import * as Enums from "../enums";





//set start time from what comes from input
export const estimateGeneralStartTime = "00:00";
//this comes also from input
export let timeIntervalInMins = 0;


export const startProgramFlow = async (timePeriod) => {
    timeIntervalInMins = timePeriod;
    let orderList = await orderService.getAll();
    let orderData = {};
    let orderCoordinates = {};
    
    let nearestWarehouseData = [];
    let drone = {};
    let packingTime = 5;
    for (let orderCount = 0; orderCount < orderList.length; orderCount ++) {
        orderData = await orderService.getOne(orderList[orderCount]._id);
        orderCoordinates = await orderService.getCoordinates(orderList[orderCount]._id);
        console.log(orderData);
        if ((orderData.startTime !== undefined) && (orderData.startTime != "")){
            console.log(orderData.startTime);
            continue;

        }
        nearestWarehouseData = await orderService.findNearestWarehouse(orderCoordinates.coordinates.x, orderCoordinates.coordinates.y);
        //path = nearestWarehouseData[0]; warehouseId = nearestWarehouseData[1]
        if (nearestWarehouseData[0] < timePeriod) {
            continue;
        }
        drone = await findMostSuitableDron(nearestWarehouseData[1], nearestWarehouseData[0]);
        console.log(JSON.stringify(drone));
        if ((Object.keys(drone).length > 0) && (drone._id > -1)) {
            
            let warehouse = await warehouseService.setWarehouseTime(nearestWarehouseData[1], packingTime);
            let droneToChange = await droneService.calculateActualCapacity(drone._id, nearestWarehouseData[0]);
            droneToChange = await droneService.changeStatus(drone._id, Enums.DroneStatus.busy);
            let orderToChange = await orderService.changeOrderStatus(orderList[orderCount]._id, Enums.OrderStatus.currentlyInDelivery);
            orderToChange = await orderService.setOrderPath(orderList[orderCount]._id, nearestWarehouseData[0]);
            orderToChange = await orderService.setOrderDrone(orderList[orderCount]._id, drone._id);  
            orderToChange = await orderService.setOrderStartTime(orderList[orderCount]._id, warehouse.time + packingTime);
        } else {
            console.log('startProgramFlow: NO Drones available');
            //find delivered orders by endTime
            console.log(timePeriod);
    
            let deliveredOrdersData = await orderService.getDeliveredOrders(timePeriod);
            if (deliveredOrdersData.length > 0) {
                let deliveredOrdersList = deliveredOrdersData[0];
                let dronesToReceiveList = deliveredOrdersData[1];
        
                //check if they have enough capacity to make the delivery
                let dronesWithCapacity = [];
                console.log(nearestWarehouseData[0]);
                let availableDronesList = await droneService.checkAvailability(deliveredOrdersData[1], nearestWarehouseData[0]);
                
                if (availableDronesList.length > 0) {
                    for (let i = 0; i < availableDronesList.length; i ++) {
                        let droneToChange = await droneService.calculateActualCapacity(availableDronesList[i]._id, nearestWarehouseData[0]);
                        droneToChange = await droneService.changeStatus(availableDronesList[i]._id, Enums.DroneStatus.ready);
                    }

                } else {
                    //charge drones if there are in Warehouse with no enough capacity and add 20 min to the warehouse time
                }
            } else {
                console.log("No More Orders could be delivered in such a short time period");
                break;
            }
            //charge drones and return the first ready with 100% batCharge
            //charge all other drones with same percentage like the first ready
            //add returned time for the first ready drone min to wearhouseTime
            
        }
        


    }
    // let ordersWithStatusList = await orderService.getAll();
    // return ordersWithStatusList;
}
    


//find the most suitable dron. the one with the closest capacity
export const findMostSuitableDron = async (wh_id, path ) => {

    const droneList = await droneService.getDronesFromWarehouse(wh_id);
    console.log(JSON.stringify(droneList));
    let capacityDroneList = [];
    let idsDroneList = [];
    let consumption = "";
    for(let i in droneList) { 
        consumption = await droneService.getConsumption(droneList[i].droneType);
        if ((droneList[i].actualCapacity > path * 2 * consumption) && (droneList[i].status == "ready")){
            capacityDroneList.push(droneList[i].actualCapacity); 
            idsDroneList.push(droneList[i]._id);
        } 
     }; 
     console.log("capacityDroneList");
     console.log(JSON.stringify(capacityDroneList));
     
     if (capacityDroneList.length > 0) {
        let closestCapacity = Math.min(...capacityDroneList);
        
        let droneIndex = capacityDroneList.indexOf(closestCapacity);
        
        // console.log("idsDroneList[droneIndex]");
        // console.log(JSON.stringify(idsDroneList[droneIndex]));
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


