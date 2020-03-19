import React from 'react'
import {Link} from 'react-router-dom'
import LoggedInLink from './LoggedInLink'
import LoggedOutLink from './LoggedOutLink'
import {connect} from 'react-redux'

const Navbar = () => {
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to='/' className="navbar-brand">E-Card</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav-content" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="nav-content">
                    <div className="navbar-nav ml-auto">
                        <LoggedOutLink />
                        <LoggedInLink />
                    </div>
                </div>
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return{
        
    }
}

export default connect(mapStateToProps)(Navbar)