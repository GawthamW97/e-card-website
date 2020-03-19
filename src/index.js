import React from 'react';
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import * as firebase from 'firebase';
import 'firebase/firestore';
import * as serviceWorker from './serviceWorker';
import {createStore,applyMiddleware, compose} from 'redux'
import rootReducer from './store/reducer/rootReducer'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import { ReactReduxFirebaseProvider,getFirebase,reactReduxFirebase} from 'react-redux-firebase'
import { reduxFirestore,createFirestoreInstance,getFirestore } from 'redux-firestore'
import fbConfig from './config/fbConfig'
const rrfConfig = {userProfile: 'users'} // react-redux-firebase config
const initialState = {}
// Initialize firebase instance
if (!firebase.apps.length) {
   firebase.initializeApp({fbConfig});
}

const store = createStore(
    rootReducer,
    initialState,
    compose(
    // reactReduxFirebase(firebase,rrfConfig), // pass in firebase instance instead of config
    // reduxFirestore(firebase),
    applyMiddleware(thunk.withExtraArgument({firebase})) // to add other middleware
    )
  )

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
  }

ReactDOM.render(<Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
    </ReactReduxFirebaseProvider>
</Provider>, document.getElementById('root'));
serviceWorker.unregister();
