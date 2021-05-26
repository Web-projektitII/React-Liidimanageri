import React from 'react'
import {BrowserRouter as Router, Link} from "react-router-dom"
import {PrivateLink,PublicLink} from '../Links';

function NavigationMenu(props){
    return (
        <div>
            <div className="sm:hidden font-bold">
                AppName
            </div>
            <ul className="flex flex-col sm:flex-row mb-0 list-none lg:ml-auto">
                <li className="sm:px-2">
                    <Link 
                        to="/" 
                        className="text-blue-500 py-2 border-t border-b sm:border-0 block"
                        onClick={props.closeMenu}
                    >
                        Home
                    </Link>
                </li>
                <li className="sm:px-2">
                    <Link 
                        to="/about" 
                        className="text-blue-500 py-2 border-b sm:border-0 block"
                        onClick={props.closeMenu}
                    >
                        About
                    </Link>
                </li>
                <li className="sm:px-2">
                    <PublicLink 
                        to="/login" 
                        className="text-blue-500 py-2 border-b sm:border-0 block"
                        onClick={props.closeMenu}
                    >
                        Login
                    </PublicLink>
                </li>
                <li className="sm:px-2">
                    <PublicLink 
                        to="/signup" 
                        className="text-blue-500 py-2 border-b sm:border-0 block"
                        onClick={props.closeMenu}
                    >
                        Signup 
                    </PublicLink>
                </li>
                <li className="sm:px-2">
                    <PrivateLink 
                        to="/admin" 
                        className="text-blue-500 py-2 border-b sm:border-0 block"
                        onClick={props.closeMenu}
                    >
                        Administraattori 
                    </PrivateLink>
                </li>
            </ul>
        </div>
    )
}

export default NavigationMenu