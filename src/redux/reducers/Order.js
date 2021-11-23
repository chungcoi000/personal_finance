import { SET_ORDER_LIST} from "../constants/OrderConstant";

const INITIAL_STATE = [];

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_ORDER_LIST:
			return [...action.payload]
		default:
			return state;
	}
}

export default reducer;