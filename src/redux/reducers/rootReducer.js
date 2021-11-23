import { combineReducers } from 'redux';
import Order from './Order'
const rootReducer = combineReducers({
	order: Order
});

export default rootReducer