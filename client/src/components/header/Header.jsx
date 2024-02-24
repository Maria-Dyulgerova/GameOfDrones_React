


import { Link } from 'react-router-dom';
import Path from '../../paths';
// import { Routes, Route } from 'react-router-dom';
import Navigation from "./Navigation";

export default function Header()  {
    return (
        <header>
            <h1><Link className="home" to={Path.Home}>Game Of Drones</Link></h1>
            <Navigation/>
            
        </header>
    )

}
