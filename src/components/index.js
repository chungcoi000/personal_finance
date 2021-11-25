import {Card, Tabs} from "antd";
import Order from "./order/index";
import {useState} from "react";
import {useSelector} from "react-redux";
import moment from "moment";

const {TabPane} = Tabs;

const OrderList = () => {
	const [mode, setMode] = useState('ADD');

	const orders = useSelector(state => state.order);

	let orderDay = [];

	const orderTotal = orders.map(order => {
		// const date = new Date(order.date);
		// const orderDay = date.getUTCDate();
		// const orderMonth = date.getUTCMonth() + 1;
		// const orderYear = date.getUTCFullYear();
		// if (orderDay === day) {
		// 	orderDay.push(order)
		// 	return orderDay.products.reduce((total, product) => {
		// 		return total += (product.price * product.quantity)
		// 	}, 0)
		// }
		// if (orderMonth === month) {
		// 	orderDay.push(order)
		// 	return orderDay.products.reduce((total, product) => {
		// 		return total += (product.price * product.quantity)
		// 	}, 0)
		// }
		// if (orderYear === year) {
		// 	orderDay.push(order)
		// 	return orderDay.products.reduce((total, product) => {
		// 		return total += (product.price * product.quantity)
		// 	}, 0)
		// }
		return order.products.reduce((total, product) => {
			return total += (product.price * product.quantity)
		}, 0)
	});

	const dateObj = new Date();
	const month = dateObj.getUTCMonth() + 1; //months from 1-12
	const day = dateObj.getUTCDate();
	const year = dateObj.getUTCFullYear();

	return (
		<div>
			<Card>
				<Tabs defaultActiveKey="1">
					<TabPane tab="Total" key="day">
						<h2>
							{
								orderTotal.reduce((a, b) => {
									return a + b
								}, 0)
							}
						</h2>
					</TabPane>
					<TabPane tab="Week" key="week">
						<h2>Week Payment: 1000$</h2>
					</TabPane>
					<TabPane tab="Month" key="month">
						<h2>Month Payment: 4000$</h2>
					</TabPane>
					<TabPane tab="Year" key="year">
						<h2>Year Payment: 60000$</h2>
					</TabPane>
				</Tabs>
			</Card>

			<div style={{
				marginTop: '50px'
			}}>
				<Order mode={mode} setMode={setMode}/>
			</div>
		</div>
	)
}

export default OrderList;