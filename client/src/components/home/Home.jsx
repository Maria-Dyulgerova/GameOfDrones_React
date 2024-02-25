import OrderList from '../orders/OrderList';
import WarehouseList from '../warehouses/WarehouseList';
// import DroneList from '../drones/droneList';
import EstimateOrderList from '../queries/EstimateOrderList';
function Home () {
    
        
    return (
        
        <section id="catalog-page">
            <h1>Home</h1>
            <OrderList/>
            <WarehouseList/>
            <DroneList/>
            <EstimateOrderList
                data={"some data"} 
            />
        </section>    
    );
    
}

export default Home;