import * as request from "../lib/request";
import * as warehouseService from "../services/warehouseService";

const baseUrl = 'http://localhost:3030/jsonstore/orders';
const baseCustomersUrl = 'http://localhost:3030/jsonstore/customers';




// const unitsPerMin = 1;
// //as it is in the task 1 min = 1 unit in the map
// const packingTime = 5;
// //5 minutes

export const getAll = async () => {
    const result = await request.get(baseUrl);

    return Object.values(result);
};
export const getOne = async (order_id) => {
    const result = await request.get(`${baseUrl}/${order_id}`, );

    return result;
}
export const getCoordinates = async (order_id) => {
    const orderData = await request.get(`${baseUrl}/${order_id}`, );
    
    const customerData = await request.get(`${baseCustomersUrl}/${orderData.customerId}`,);

    return customerData;
}


export const create = async (orderData) => {
    console.log(orderData._id);
    const body_json = {
        _id: orderData._id,
        customerId: orderData.customerId,
        
        productList: orderData.productList
    };
    const result = await request.post(baseUrl, body_json);

    return result;
};

export const body_json = {
    _id: "",
    customerId: "",
    productList: ""
}

export const edit = async (orderId, orderData) => {
    const body_json = {
        _id: orderId,
        customerId: orderData.customerId,
        productList: orderData.productList,

        path: orderData.path,
        status: orderData.status,
        startTime: orderData.startTime,
        drone: orderData.drone

    };
    const result = await request.put(`${baseUrl}/${orderId}`, body_json);

    // console.log(result);
    return result;
};
export const remove = async (orderId) => request.remove(`${baseUrl}/${orderId}`);


export const buildOrderCoordinatesList = async () => {
    const orderList = await getAll();
    // console.log(JSON.stringify(orderList));
    let detailedOrderList = [];
    let orderObj = {};
    let detailedOrderObj = {};
    for (let i = 0; i < orderList.length; i ++) {
        orderObj = await getCoordinates(orderList[i]._id);
        detailedOrderObj = {
            _id: orderList[i]._id,
            customerId: orderList[i].customerId,
            // productList: orderList[i].productList,
            x: orderObj.coordinates.x,
            y: orderObj.coordinates.y,
        };

        detailedOrderList.push(detailedOrderObj);
    }
    console.log(detailedOrderList);
}
export const buildOrderDetailedList = async () => {
    const orderList = await getAll();
    // console.log(JSON.stringify(orderList));
    let detailedOrderList = [];
    let orderObj = {};
    let detailedOrderObj = {};
    let nearestWh = "";
    for (let i = 0; i < orderList.length; i ++) {
        orderObj = await getCoordinates(orderList[i]._id);
        nearestWh = await findNearestWarehouse(orderObj.coordinates.x, orderObj.coordinates.y);
        detailedOrderObj = {
            _id: orderList[i]._id,
            customerId: orderList[i].customerId,
            customerName: orderObj.name,
            productList: orderList[i].productList,
            x: orderObj.coordinates.x,
            y: orderObj.coordinates.y,
            nearestWh: nearestWh,
        };

        detailedOrderList.push(detailedOrderObj);
    }
    // console.log(detailedOrderList);
}

export const findNearestWarehouse = async (xCoordinate, yCoordinate) => {
    const warehouseList = await warehouseService.getAll();
    // console.log(JSON.stringify(warehouseList));
    
        let paths = [];
        let horPath, vertPath = 0;
        for (let i = 0; i < warehouseList.length; i ++) {
            horPath = Math.abs(warehouseList[i].x - xCoordinate);
            vertPath = Math.abs(warehouseList[i].y - yCoordinate);
            paths[i] = horPath + vertPath;   
        }
        // console.log(JSON.stringify(paths));
        let minPath = Math.min(...paths);
        let warehouseIndex = paths.indexOf(minPath);
        let data  = [];
        data.push(minPath);
        data.push(warehouseList[warehouseIndex]._id);
        console.log("findNearestWarehouse(...) -> result:");
        console.log(JSON.stringify(data));
        return data;
};

export const setOrderPath = async (orderId, path) => {
    const orderData = await getOne(orderId);
    let startTime = (orderData.startTime == undefined) ? "" : orderData.startTime;
    let status = (orderData.status == undefined) ? "" : orderData.status;
    let drone = (orderData.drone == undefined) ? "" : orderData.drone;
    const body_json = {
        _id: orderId,
        customerId: orderData.customerId,
        productList: orderData.productList,
        path: path,
        status: orderData.status,
        startTime: startTime,
        drone: drone
    };
    const result = await edit(orderId, body_json);
    console.log("setOrderPath(...) -> result:");
    console.log(JSON.stringify(result));
    return result;
}
export const changeOrderStatus = async (orderId, statusStr) => {
    const orderData = await getOne(orderId);
    let startTime = (orderData.startTime == undefined) ? "" : orderData.startTime;
    let path = (orderData.path == undefined) ? "" : orderData.path;
    let drone = (orderData.drone == undefined) ? "" : orderData.drone;
    const body_json = {
        _id: orderId,
        customerId: orderData.customerId,
        productList: orderData.productList,
        path: path,
        status: statusStr,
        startTime: startTime,
        drone: drone
    };
    const result = await edit(orderId, body_json);
    console.log("changeOrderStatus() -> result:");
    console.log(JSON.stringify(result));
    return result;
}
export const setOrderDrone = async (orderId, droneId) => {
    const orderData = await getOne(orderId);
    let startTime = (orderData.startTime == undefined) ? "" : orderData.startTime;
    let path = (orderData.path == undefined) ? "" : orderData.path;
    const body_json = {
        _id: orderId,
        customerId: orderData.customerId,
        productList: orderData.productList,
        path: path,
        status: orderData.status,
        startTime: startTime,
        drone: droneId
    };
    const result = await edit(orderId, body_json);
    console.log("setOrderDrone(...) -> result:");
    console.log(JSON.stringify(result));
    return result;
}
export const setOrderStartTime = async (orderId, startTime) => {
    const orderData = await getOne(orderId);
    let drone = (orderData.drone == undefined) ? "" : orderData.drone;
    const body_json = {
        _id: orderId,
        customerId: orderData.customerId,
        productList: orderData.productList,
        path: orderData.path,
        status: orderData.status,
        startTime: startTime,
        drone: orderData.drone
    };
    const result = await edit(orderId, body_json);
    console.log("setOrderStartTime(...) -> result:");
    console.log(JSON.stringify(result));
    return result;
}
export const getDeliveredOrders = async (timeInMin) => {
    let orderList = await getAll();
    
    let deliveredOrdersList = [];
    let dronesToReceiveList = [];
    for (let i = 0; i < orderList.length; i ++) {
        if ((orderList[i].startTime != undefined) && (orderList[i].startTime != "")) {
            console.log(orderList[i].startTime + orderList[i].path * 2 < timeInMin);
            // console.log("orderList[i].startTime" + orderList[i].startTime );
            // console.log("orderList[i].path" + orderList[i].path );
            // console.log("timeInMin" + timeInMin );
            if (orderList[i].startTime + orderList[i].path * 2 < timeInMin) {
                
                deliveredOrdersList.push(orderList[i]);
                dronesToReceiveList.push(orderList[i].drone);
            }
            
        }
        
    }
    
    let data = [];
    if (dronesToReceiveList.length > 0) {
        
        data.push(deliveredOrdersList);
        data.push(dronesToReceiveList);
        
    }
    console.log("getDeliveredOrders(...) -> data:");
    // console.log(JSON.stringify(data));
    return data;
    
}