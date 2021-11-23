export const setDataToStorage = (key, data) => {
	return localStorage.setItem(key, JSON.stringify(data));
}

export const getDataFromStorage = (key) => {
	return JSON.parse(localStorage.getItem(key)) || [];
}