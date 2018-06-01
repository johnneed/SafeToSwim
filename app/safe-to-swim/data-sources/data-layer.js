// @flow
import {AsyncStorage} from 'react-native';
import * as types from '../constants/action-types';

const url = 'https://safe-to-swim.herokuapp.com/predict'; // Heroku
// const url = 'http://10.0.0.4:5000/predict'; // John's Mac
// const url = 'http://10.0.0.9:5000/predict'; // John's Ubuntu



export async function upload(image: Object) {
    const options = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        },
        method: 'POST',
        body: new FormData()
    };

    options.body.append('image', image);
    try {
        const rawResponse = await fetch(url, options);
        return rawResponse.json();
    }
    catch(error){
        console.log(JSON.stringify(error));
        return false;
    }

}



export async function getUserStats(dispatch: any => any) {
    try {
        const value = await AsyncStorage.getItem('@SafeToSwim:key');
        if (value !== null) {
            dispatch({type: types.GET_USER_STATS_SUCCESS, data: value});
        }
    } catch (error) {
        dispatch({type: types.GET_USER_STATS_FAIL});
    }
}


export function setUserStats(dispatch: any => any, userStats: Object) {
    return AsyncStorage.setItem('@SafeToSwim:key', userStats);
}