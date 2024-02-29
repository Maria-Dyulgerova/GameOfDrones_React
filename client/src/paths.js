const Path = {
    Home: '/home/Home',
    
    OrderList: '/orders/list',
    OrderDetails: '/orders/:orderId',
    OrderCreate: 'orders/create',
    OrderEdit: '/orders/:orderId/edit',
    OrderDelete: '/orders/:orderId/delete',
    
    WarehouseList: '/warehouses/list',
    WarehouseDetails: '/warehouses/:warehouseId',
    WarehouseEdit: '/warehouses/:warehouseId/edit',
    

    DroneCreate: 'drones/create',
    DroneList: 'drones/list',
    DroneDetails: 'drones/:droneId',

    CustomerList: 'customers/list',
    CustomerDetails: 'customers/:customerId',

    CalculateEstimate: 'queries/CalculateEstimate',
    CalculateEstimate: 'queries/EstimateOrderList'

};

export default Path;
