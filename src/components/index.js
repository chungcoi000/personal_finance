import {Card, Tabs} from "antd";
import Order from "./order/index";
import {useState} from "react";
import {useSelector} from "react-redux";
import moment from "moment";

const {TabPane} = Tabs;

const OrderList = () => {
	const [mode, setMode] = useState('ADD');

	const startOfWeek = moment().startOf('week').format('x');
	const endOfWeek = moment().endOf('week').format('x');

	const getDate = (date) => {
		return date.getUTCDate();
	}

	const getMonth = (date) => {
		return date.getUTCMonth() + 1
	}

	const getYear = (date) => {
		return date.getUTCFullYear()
	}

	const orders = useSelector(state => state.order);

	let orderDay = [];
	let orderMonth = [];
	let orderWeek = []
	let orderYear = [];

	const reduceFunction = (array) => {
		return array.map(order => {
			return order.products.reduce((total, product) => {
				return total += (product.price * product.quantity)
			}, 0)
		})
	}

	for (let order of orders) {
		const date = new Date(order.date)
		if (getDate(new Date()) === getDate(date)
			&& getMonth(new Date()) === getMonth(date)
			&& getYear(new Date()) === getYear(date)) {
			orderDay.push(order)
		}

		if (moment(order.date).startOf('week').format('x') === startOfWeek &&
			moment(order.date).endOf('week').format('x') === endOfWeek
		) {
			orderWeek.push(order)
		}

		if (getMonth(new Date()) === getMonth(date)
			&& getYear(new Date()) === getYear(date)) {
			orderMonth.push(order)
		}
		if (getYear(new Date()) === getYear(date)) {
			orderYear.push(order)
		}
	}

	return (
		<div>
			<Card>
				<Tabs defaultActiveKey="1">
					<TabPane tab="Day" key="day">
						<h2>
							Day Payment: {reduceFunction(orderDay).reduce((a, b) => {
							return a + b
						}, 0)} VND
						</h2>
					</TabPane>
					<TabPane tab="Week" key="week">
						<h2>Week Payment: {
							reduceFunction(orderWeek).reduce((a, b) => {
								return a + b
							}, 0)
						} VND</h2>
					</TabPane>
					<TabPane tab="Month" key="month">
						<h2>
							Month Payment: {
							reduceFunction(orderMonth).reduce((a, b) => {
								return a + b
							}, 0)
						} VND
						</h2>
					</TabPane>
					<TabPane tab="Year" key="year">
						<h2>
							Year Payment: {
							reduceFunction(orderYear).reduce((a, b) => {
								return a + b
							}, 0)
						} VND
						</h2>
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