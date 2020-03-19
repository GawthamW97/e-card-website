import React, { Component } from 'react'

class Register extends Component {
    state = {
        email : '',
        password: '',
        firstName:'',
        lastName:''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <form onSubmit = {this.handleSubmit} className="white">
                            <div className="card">
                                <h5 className = "card-title text-center">Register</h5>
                                <div className="card-body">
                                    <div className="form-row">
                                        <div className = "form-group col-md">
                                            <label htmlFor="email">First Name</label>
                                            <input className="form-control" type="text" id= "firstName" onChange ={this.handleChange}/>
                                        </div>
                                        <div className = "form-group col-md">
                                            <label htmlFor="email">Last Name</label>
                                            <input className="form-control" type="text" id= "lastName" onChange ={this.handleChange}/>
                                        </div>
                                    </div>
                                    <div className = "form-group">
                                        <label htmlFor="email">Email</label>
                                        <input className="form-control" type="email" id= "email" onChange ={this.handleChange}/>
                                    </div>
                                    <div className = "form-group">
                                        <label htmlFor="password">Password</label>
                                        <input className="form-control" type="password" id="password" onChange={this.handleChange}/>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <div className="form-group">
                                        <button className="btn btn-primary">Register</button>
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

export default Register
