import {SET_ORDER_LIST} from "../constants/OrderConstant";
import {store} from "../store/store";


export const setItem = (data) => {
	return store.dispatch({
		type: SET_ORDER_LIST,
		payload: data
	})
};