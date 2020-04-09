import React from 'react'


const Connection =({profile}) =>{  

    var profilePic;
if(profile.pPic == null){
    profilePic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
}else{
    profilePic = profile.pPic;
}      
// myFunction(profile.pPic);
//set the profile prop object values
    return(
        <div>      
            <div className="card shadow-box-example hoverable project-summary">
                <div className="card-content grey-text text-darken-3">
                    <img className='circular_view' src= {profilePic} width="20%" height="20%"/>
                    <span className="card-title">{profile.fN} {profile.lN}</span>      {/*set profile user name   (the name of the accessor must be same as the field name of the database)*/}
                    <p>Company: {profile.cmp}</p>                                  {/*set profile user company (the name of the accessor must be same as the field name of the database)*/}
                </div>
            </div>
        </div>
    )
}
export default Connection
    
