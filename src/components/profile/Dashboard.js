import React, {Component} from 'react'
import Notification from './Notification'
import ConnectionList from '../connections/ConnectionList'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

class Dashboard extends Component{
    render(){
        // console.log(this.props);
        const {profiles} = this.props;
        return(
            <div className="pt-2 dashboard-container">
                <div className="container">
                    <div className="row">
                        <div className="col-md pb-3">
                            <span className="">Dashboard</span>
                        </div>
                    </div>
                    <div className ="row">
                        <div className="col-md-8">
                            <ConnectionList profiles= {profiles}/>   {/* Display the list of connection the user has */}
                        </div>
                        <div className="col-md-4">
                            <Notification />
                        </div>
                    </div>
                
                </div>
            </div>
        )
    }
}

//variable name must be same when passing props to the nested component and mapping stateProps
const mapStateToProps = (state) => {
    return{
        profiles: state.firestore.ordered.user // get the  list of user from the
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'user'}
    ])
)(Dashboard)