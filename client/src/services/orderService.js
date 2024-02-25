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
export const getDetails = async (order_id) => {
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
        orderObj = await getDetails(orderList[i]._id);
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
        orderObj = await getDetails(orderList[i]._id);
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
        data.push(warehouseIndex);

        return data;
};

export const changeOrderStatus = async (orderId, statusStr) => {
    const orderData = await getOne(orderId);
    const body_json = {
        _id: orderId,
        customerId: orderData.customerId,
        productList: orderData.productList,
        status: statusStr
    };



}

// export const editOrderStatusSend = async (orderId, orderData, path) => {
//     const body_json = {
//         _id: orderData._id,
//         hCoordinate: orderData.hCoordinate,
//         vCoordinate: orderData.vCoordinate,
//         load: orderData.load,
//         status: "started",
//         startTime: new Date().toISOString(),
//         estimate: packingTime + unitsPerMin * path * 2,
//         endTime: "0"
//     };
//     const result = await request.put(`${baseUrl}/${orderId}`, body_json);

//     // console.log(result);
//     return result;
// };

// export const toLogOrderSent = async (order_id, drone_id, warehouse_id, estimate) => {
//     const body_json = {
//         order_id: order_id,
//         drone_id: drone_id,
//         warehouse_id: warehouse_id,
//         estimate: estimate,
//         status: "sent"
//     };

       
//     const result = await request.post(baseLogUrl, body_json);

//     return result;
// }
// export const getRecsFromLog = async() => {
//     const result = await request.get(baseLogUrl);

//     return Object.values(result);    
// }

// export const remove = async (orderId) => request.remove(`${baseUrl}/${orderId}`);

// export function buildJsonBody(orderData) {
//     // console.log(artistData);
//     const body_json = {
//         _id: orderData._id,
//         hCoordinate: orderData.hCoordinate,
//         vCoordinate: orderData.vCoordinate,
//         load: orderData.load,
//         state: orderData.state,
//         startTime: orderData.startTime,
//         endTime: orderData.endTime,
//     };
    
//     return body_json;
// };
