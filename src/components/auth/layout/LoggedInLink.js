import React, { Fragment } from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../../store/actions/authAction'

const LoggedInLink = (props) => {
    return(
        <Fragment>
            <li className="nav-item"><NavLink className="nav-link" to='/create'>Create Profile</NavLink></li>
            <li className="nav-item"><a className="nav-link" onClick={props.logout} to='/'>Log Out</a></li>
            <li className="nav-item"><NavLink to='/' className='btn btn-outline-primary'>NN</NavLink></li>
        </Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null,mapDispatchToProps)(LoggedInLink)