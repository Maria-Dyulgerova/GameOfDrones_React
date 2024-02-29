import { Link } from 'react-router-dom';
import Path from '../../paths';


export default function Navigation() {
    
    return (
       
        <nav>
            <div>
                <Link as={Link} to={Path.OrderList}>Orders</Link> | 
                <Link as={Link} to={Path.OrderCreate}>Add Order</Link> | 
                <Link as={Link} to={Path.WarehouseList}>Warehouses</Link> | 
                <Link as={Link} to={Path.CustomerList}>Customers</Link> | 
                <Link as={Link} to={Path.DroneList}>Drones</Link> | 
                <Link as={Link} to={Path.DroneCreate}>Add Drone</Link> | 
                <Link as={Link} to={Path.CalculateEstimate}>Make Estimate</Link>    
                
            </div>
        </nav>
    );
}

