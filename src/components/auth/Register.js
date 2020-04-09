import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../store/actions/authAction'
import { isEmpty } from 'react-redux-firebase'


class Register extends Component {
    state = {
        em :'',
        pwd:'',
        fN:'',
        lN:'',
        fNError: "",
        lNError: "",
        eMError: "",
        pwdError: ""
    }

    validate = () => {
        // show all hidden validation feedback divs
        document.querySelectorAll('.validate').forEach(i => i.style.display = 'block');

        let fNError = "";
        let lNError = "";
        let eMError = "";
        let pwdError = "";
        
        if(this.state.fN < 1) {
            fNError = "First Name cannot be blank";
        }

        if(this.state.lN < 1) {
            lNError = "Last Name cannot be blank";
        }

        if(this.state.pwd < 1) {
            pwdError = "Password cannot be blank";
        } else if (this.state.pwd.length < 6) {
            pwdError = "Password should be atleast 6 characters";
        }

        if(!this.state.em.includes('@')){
            eMError = "Invalid Email";
        }

        if (eMError || fNError || lNError || pwdError){
            this.setState({eMError, fNError, lNError, pwdError});
            return false;
        }

        // this.clearAllErrors();
        return true;
    };


    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        // hide next sibling (validation feedback)
        if (e.target.nextElementSibling) {
            e.target.nextElementSibling.style.display = 'none';
        }
    }

    
    handleSubmit = (e) => {
        e.preventDefault();
        const isValid = this.validate();
        if (isValid) {
            // alert('Form is valid');
            this.props.register(this.state);
            this.props.history.push('/create');
        } // else error messages for any form fields are shown
    }

    render() {
        const {auth,authError} = this.props;
        if(auth.uid) return <Redirect to='/' />
        return (
            <div className="container">
                <form onSubmit = {this.handleSubmit} className="white" noValidate>
                    <h5 className = "grey-text text-darken-3">Register</h5>

                    <div className = "input-field">
                        <label htmlFor="email">First Name</label>
                        <input type="text" id= "fN" onChange ={this.handleChange}/>

                        <div className="validate" style={{fontSize:12, color:"red"}}>
                            {this.state.fNError}
                        </div>    
                    </div>

                    <div className = "input-field">
                        <label htmlFor="email">Last Name</label>
                        <input type="text" id= "lN" onChange ={this.handleChange}/>

                        <div className="validate" style={{fontSize:12, color:"red"}}>
                            {this.state.lNError}
                        </div>
                    </div>

                    <div className = "input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id= "em" onChange ={this.handleChange}/>

                        <div className="validate" style={{fontSize:12, color:"red"}}>
                            {this.state.eMError}
                        </div> 
                    </div>

                    <div className = "input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="pwd" onChange={this.handleChange}/>

                        <div className="validate" style={{fontSize:12, color:"red"}}>
                            {this.state.pwdError}
                        </div>
                    </div>

                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Register</button>
                    <div className="red-text center">
                        {authError ? <p> {authError} </p>: null}
                    </div>
                    </div>

                </form>       
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError:state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        register: (newUser) => dispatch(register(newUser))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Register)
