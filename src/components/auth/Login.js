import React, { Component } from 'react'
import {connect} from 'react-redux'
import {login} from '../../store/actions/authAction'

class Login extends Component {
    state = {
        email : '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state);
    }
    render() {
        const {authError} = this.props;
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <form onSubmit = {this.handleSubmit} className="white">
                            <div className="card">
                                <h5 className="card-title text-center">Login</h5>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input className="form-control" type="email" id="email" onChange ={this.handleChange}/>
                                    </div>
                                    <div className = "form-group">
                                        <label htmlFor="password">Password</label>
                                        <input className="form-control" type="password" id="password" onChange={this.handleChange}/>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary">Login</button>
                                        <div className="text-danger text-center">
                                            {authError ? <p>{authError}</p> : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form> 
                    </div>
                </div>      
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        login: (creds) => dispatch(login(creds))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
