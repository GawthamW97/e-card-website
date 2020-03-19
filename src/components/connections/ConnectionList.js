import React from 'react'
import Connection from './Connection'
import {Link} from 'react-router-dom'
const ConnectionList = ({profiles}) =>{     // list of connection from the database
    return(
        <div className="connection-list section">
            <div className="card">
                <h5 className="card-title text-center pt-2">Connection List</h5>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Company</th>
                                    <th>View Details</th>
                                </tr>
                            </thead>
                            <tbody>
                        {profiles && profiles.map(profile => {             // map the profiles object to the profile object from Connection.js
                                                                            // ID of the profile will be ID in the firestore document ID
                            return(
                                <tr key={profile.id}>
                                    <td>{profile.fN}</td>
                                    <td>{profile.cmp}</td>
                                    <td>
                                    <Link to={'/project/'+ profile.id} key={profile.id}>        
                                        {/* <Connection profile={profile} /> */}
                                        <i className="material-icons">details</i> View
                                    </Link>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConnectionList