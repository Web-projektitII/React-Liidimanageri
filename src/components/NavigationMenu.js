import React from 'react'
import { Link } from "react-router-dom"

function NavigationMenu(props){

    return (
        <div>
            <div className="font-bold py-3">
                AppName
            </div>
            <ul>
                <li>
                    <Link 
                        to="/" 
                        className="text-blue-500 py-3 border-t border-b block"
                        onClick={props.closeMenu}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/react-liidimanageri/about" 
                        className="text-blue-500 py-3 border-b block"
                        onClick={props.closeMenu}
                    >
                        About
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/login" 
                        className="text-blue-500 py-3 border-b block"
                        onClick={props.closeMenu}
                    >
                        Login
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/signup" 
                        className="text-blue-500 py-3 border-b block"
                        onClick={props.closeMenu}
                    >
                        Signup 
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/admin" 
                        className="text-blue-500 py-3 border-b block"
                        onClick={props.closeMenu}
                    >
                        Admin 
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default NavigationMenu