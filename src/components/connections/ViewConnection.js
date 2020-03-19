import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

const ViewConnection = (props) => {
    const {conn_profile} = props;
    if(conn_profile){
        return(

            <div className="pt-2 section project-details">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <div className="card">
                                <div className="card-body">
                                    <span className="card-title">Name - {conn_profile.fN}</span>
                                    <p>Company - {conn_profile.cmp}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div className= "container center">
                <p>Loading Profile...</p>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => { //for id receive from selecting an item from the list
    const id = ownProps.match.params.id         
    const profiles = state.firestore.data.user;     // check with the id values of the documents in the firestore 
    const profile = profiles ? profiles[id]:null    // and when the value has a match pass that document as an object
    return{
        conn_profile: profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'user'}
    ])
)(ViewConnection)