import React, { Fragment } from 'react'
import {NavLink} from 'react-router-dom'

const LoggedOutLink = () => {
    return(
        <Fragment>
            <li className="nav-item"><NavLink className="nav-link" to='/register'>Sign Up</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to='/login'>Login</NavLink></li>
        </Fragment>
    )
}

export default LoggedOutLink