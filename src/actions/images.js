import { CREATE } from '../constants/actionTypes';

// Action Creators =>  functions that return 
// use thunk to fetch asynchronous data
export const createImageAction = (data) => {
    console.log(`data in action, ${data}`);
    const object = {
            type: CREATE, payload: data
        }
    return object
        
    
}