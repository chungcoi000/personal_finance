import moment from "moment";
import {setDataToStorage} from "../services/storageServices";

const fakeData = [
	{
		id: Math.random(),
		name: 'Order 1',
		products: [
			{
				id: Math.random(),
				name: 'Paper',
				price: 6000,
				quantity: 3,
			}, {
				id: Math.random(),
				name: 'Love',
				price: 1000,
				quantity: 100,
			}, {
				id: Math.random(),
				name: 'Love',
				price: 3123,
				quantity: 2,
			}
		],
		total: 6000 * 3 + 1000 * 100 + 3123 * 2,
		date: 1637657147000
	}, {
		id: Math.random(),
		name: 'Order 2',
		products: [
			{
				id: Math.random(),
				name: 'XD',
				price: 10000,
				quantity: 3,
			}, {
				id: Math.random(),
				name: 'Love',
				price: 1000,
				quantity: 100,
			}, {
				id: Math.random(),
				name: 'Love',
				price: 3123,
				quantity: 2,
			}
		],
		total: 10000 * 3 + 1000 * 100 + 3123 * 2,
		date: 1637657147000
	}, {
		id: Math.random(),
		name: 'Order 3',
		products: [
			{
				id: Math.random(),
				name: 'Love',
				price: 1000,
				quantity: 100,
			}, {
				id: Math.random(),
				name: 'Love',
				price: 1000,
				quantity: 100,
			}, {
				id: Math.random(),
				name: 'Love',
				price: 3123,
				quantity: 2,
			}
		],
		total: 1000 * 100,
		date: 1637657147000
	},
]

const user = setDataToStorage('order', fakeData);