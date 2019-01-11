import { createStore,applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initialState = {
    isLogged: false,
    isLoaderActive: false,
    users: {
        data: [],
        page: null,
        perPage: null,
        total: null,
        totalPage: null
    },
    user: {
        id: null,
        firstName: null,
        lastName: null,
        avatar: null
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USERS':
            state = { ...state, users: action.payload};
        break;
        case 'SET_USER':
            state = { ...state, user: action.payload};
        break;
        case 'SET_LOGGED_IN':
            localStorage.setItem('isLogged',true);
            state = { ...state, isLogged: true};
        break;
        case 'SET_LOGGED_OUT':
            localStorage.removeItem('isLogged');
            state = { ...state, isLogged: false};
        break;
        case 'SET_LOADER_ACTIVE':
            state = { ...state, isLoaderActive: action.payload};
        break;
        default:
            return state;
    }
    return state;
}

const Store = createStore(reducer,applyMiddleware(thunk));

export default Store;