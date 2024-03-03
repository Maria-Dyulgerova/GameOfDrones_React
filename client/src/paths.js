const Path = {
    Home: '/',
    
    OrderList: '/orders/list',
    OrderDetails: '/orders/:orderId',
    OrderCreate: '/orders/create',
    OrderEdit: '/orders/:orderId/edit',
    OrderDelete: '/orders/:orderId/delete',
    
    WarehouseList: '/warehouses/list',
    WarehouseDetails: '/warehouses/:warehouseId',
    WarehouseEdit: '/warehouses/:warehouseId/edit',
    WarehouseDroneList: '../../drones/list',

    DroneCreate: '/drones/create',
    DroneList: '/drones/list',
    DroneDetails: '/drones/:droneId',
    DroneEdit: '/drones/:droneId/edit',

    CustomerList: 'customers/list',
    CustomerDetails: 'customers/:customerId',

    CalculateEstimate: '/queries/CalculateEstimate',
    EstimateOrderList: '/queries/EstimateOrderList',

};

export default Path;
