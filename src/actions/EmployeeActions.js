import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { EMPLOYEE_UPDATE, EMPLOYEE_CREATE, EMPLOYEES_FETCH_SUCCESS, RESET_FORM } from './types'

export const employeeUpdate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
        // action.payload === { prop: 'name', value: 'Jane'}
    }
};

export const employeeCreate = ({ name, phone, shift }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
        .push({ name, phone, shift })
        .then(() => {
            dispatch({ type: EMPLOYEE_CREATE })
            Actions.pop()
        })
    }
};

export const employeesFetch = () => {
    const { currentUser} = firebase.auth()

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .on('value', snapshot => {
                dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() })
            })
    };
};

export const employeeSave = ({name, phone, shift, uid}) => {
    const { currentUser} = firebase.auth()

    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .set({name, phone, shift})
            .then(() => {
                Actions.employeeList({type: 'reset'})
            })
    };
}

export const resetForm = () => {
    return {
        type: RESET_FORM
    };
};

export const employeeDelete = ({ uid }) => {
    const { currentUser} = firebase.auth()

    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
            .remove()
            .then(() => {
                Actions.employeeList({type: 'reset'})
            })
    };
}