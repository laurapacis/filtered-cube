import { CREATE } from '../constants/actionTypes';
// import { DOWNLOAD } from '../constants/actionTypes';

const initialState = {
    images: [],
};
// eslint-disable-next-line
export default function (state = initialState, action) {
     console.log(`data in reducer, ${action.payload}`);
    switch (action.type) {
        
        case CREATE:
            return {
                ...state,
                images: action.payload
            }
        
        default:
            return state;
    }
}