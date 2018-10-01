import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import LoginForm from './components/LoginForm'

class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: "AIzaSyCMqJ2A2iMoft2Fc1t8IrLVmdbjKpDbXVo",
            authDomain: "manager-ec566.firebaseapp.com",
            databaseURL: "https://manager-ec566.firebaseio.com",
            projectId: "manager-ec566",
            storageBucket: "manager-ec566.appspot.com",
            messagingSenderId: "563974890286"
        };
        firebase.initializeApp(config);
    }

    render () {
        return (
            <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
                <LoginForm />
            </Provider>
        )
    }
}

export default App;