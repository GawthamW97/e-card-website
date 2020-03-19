import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createProfile} from '../../store/actions/profileAction'

class CreateProfile extends Component {
    state = {
        fN : '',
        cmp: ''
    }
    handelChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createProfile(this.state);
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-5 mx-auto">
                        <form onSubmit = {this.handleSubmit} className="white">
                            <div className="card">
                                <h5 className = "card-title text-center">Create Profile</h5>
                                <div className="card-body">
                                    <div className = "form-group">
                                        <label htmlFor="fName">Full Name</label>
                                        <input className="form-control" type="text" id= "fN" onChange ={this.handelChange}/>
                                    </div>
                                    <div className = "form-group">
                                        <label htmlFor="company">Company</label>
                                        <input className="form-control" type="text" id="cmp" onChange={this.handelChange}/>
                                    </div>
                                    <div className="form-group">
                                        <button className="btn btn-primary">Upload</button>
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

const mapDispatchToProps = (dispatch) => {
    return {
        createProfile: (profile) => dispatch(createProfile(profile))
    }
}

export default connect(null,mapDispatchToProps)(CreateProfile)
