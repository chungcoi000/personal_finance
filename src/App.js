import OrderList from "./components";
import 'antd/dist/antd.css';

function App() {
	return (
		<div
			style={{margin: '50px 200px'}}
		>
			<div style={{marginBottom: '40px'}}>
				<h1>Personal Finance Manager</h1>
			</div>
			<div>
				<OrderList/>
			</div>
		</div>
	);
}

export default App;
