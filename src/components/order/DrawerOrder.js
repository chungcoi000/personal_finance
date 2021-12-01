import {Button, Col, Divider, Drawer, Row, Space} from "antd";
import moment from "moment";

const DrawerOrder = (props) => {
	const {visible, setVisible, setModalVisible, setMode, showDeleteConfirm, data} = props
	return (
		<div>
			<Drawer
				title='Order Detail'
				visible={visible}
				closable={false}
				width={350}

				onClose={() => {
					setVisible(false)
				}}
				extra={
					<Space>
						<Button
							key='edit'
							type="secondary"
							onClick={() => {
								setVisible(false);
								setModalVisible(true);
								setMode('EDIT')
							}}
						>
							Edit
						</Button>
						<Button
							key='delete'
							type='danger'
							onClick={() => {
								showDeleteConfirm(data.id)
							}}
						>
							Delete
						</Button>
					</Space>
				}
			>
				<Row gutter={60}>
					<Col>
						<div style={{alignText: 'center'}}>
							<h2>Name: {data.name}</h2>
						</div>
					</Col>
					<Col>
						<p>Date: {moment(parseInt(data.date)).format('DD-MM-YYYY h:mm:ss a')}</p>
					</Col>
				</Row>

				<Divider/>
				<Row>
					{
						data.products ?
							data.products.map(product => {
								return (
									<div>
										<Row gutter={12}>
											<Col>
												<p>Product: {product.name}</p>
											</Col>

										</Row>
										<Row gutter={12}>
											<Col span={12}>
												<p>Price: {product.price}</p>
											</Col>
											<Col span={12}>
												<p>Quantity: {product.quantity}</p>
											</Col>
											<Col span={15}>
												<p>Total Price: {product.price * product.quantity}</p>
											</Col>
										</Row>
										<div>
											<Divider/>
										</div>
									</div>

								)
							})
							: null
					}
				</Row>
				{
					data.products
						? <Row style={{float: 'right'}}>
							<p>
								Order's Total: {data.products.reduce((total, product) => {
								return total += (product.quantity * product.price)
							}, 0)}
							</p>
						</Row>
						: null
				}
			</Drawer>
		</div>
	)
}

export default DrawerOrder