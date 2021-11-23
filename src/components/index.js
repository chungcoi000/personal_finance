import {Card, Tabs} from "antd";
import Order from "./order";
import {useState} from "react";
const { TabPane } = Tabs;

const OrderList = () => {
	const [mode, setMode] = useState('ADD');
	return (
		<div>
			<Card>
				<Tabs defaultActiveKey="1">
					<TabPane tab="Day" key="day">
						<h2>Day Payment: 300$</h2>
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