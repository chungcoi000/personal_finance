import {Button, Card, Col, DatePicker, Divider, Drawer, Form, Input, Modal, notification, Row, Space,} from "antd";
import {useEffect, useState} from "react";
import {getDataFromStorage, setDataToStorage} from "../../services/storageServices";
import {setItem} from "../../redux/actions/Order";
import {useSelector} from "react-redux";
import moment from "moment";
import {ExclamationCircleOutlined, MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";

const {confirm} = Modal;

const Index = (props) => {
	const {mode, setMode} = props;
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [selectedDate, setSelectedDate] = useState(null);
	const [modalVisible, setModalVisible] = useState(false);
	const [data, setData] = useState('');
	useEffect(() => {
		const orderItem = getDataFromStorage('order');
		setItem(orderItem);
	}, []);

	const orders = useSelector(state => state.order);


	const onSelect = (value) => {
		const selectedDate = new Date(value).getTime();
		setSelectedDate(selectedDate);
	}

	const showDeleteConfirm = (id) => {
		confirm({
			title: 'Do you Want to delete these items?',
			icon: <ExclamationCircleOutlined/>,
			content: 'Some descriptions',
			onOk() {
				let newList = orders.filter(orders => orders.id !== id);
				setItem(newList);
				setDataToStorage('order', newList);
				setVisible(false);
				notification.success({
					message: 'Remove Success'
				})
			},
			onCancel() {
				setVisible(false)
			},
		});
	}

	if (mode && mode === 'ADD') {
		form.resetFields();
	} else if (mode && mode === 'EDIT') {
		form.setFieldsValue({
			name: data?.name,
			date: data?.date,
			products: data?.products ?? null,
		})
	}

	const onFinish = (values) => {
		let submitData = {
			id: values?.id ?? Math.random(),
			name: values?.name,
			date: values?.date ?? selectedDate,
			products: values?.products ?? [],
		}

		if (mode && mode === 'ADD') {
			let newList = [...orders, submitData];
			setItem(newList);
			setDataToStorage('order', newList);
			setModalVisible(false);
			notification.success({
				message: 'Add Order Success'
			})
		} else {
			let newList = orders.map(order => {
				if (order.id === data.id) {
					return submitData
				} else {
					return order
				}
			})
			setItem(newList);
			setDataToStorage('order', newList);
			setModalVisible(false);
			notification.success({
				message: 'Update Order Success'
			})
		}
	}
	return (
		<div>
			<div style={{
				marginBottom: '30px',
			}}>
				<Button onClick={() => {
					setModalVisible(true)
					setMode('ADD')
				}}>
					ADD ORDER
				</Button>
			</div>
			<Modal
				visible={modalVisible}
				footer={false}
				title={mode === 'ADD' ? 'Add Order' : 'Edit Order'}
				onCancel={() => {
					setModalVisible(false)
				}}
			>
				<Form
					form={form}
					layout='vertical'
					onFinish={onFinish}
				>
					<Form.Item label='Name' name='name'>
						<Input placeholder='Please input name'/>
					</Form.Item>
					{
						mode === 'ADD'
							?
							<Form.Item label='Date'>
								<DatePicker size='large' onSelect={value => onSelect(value)}/>
							</Form.Item>
							:
							<Form.Item label='Date'>
								<DatePicker size='large' defaultValue={moment(data.date)} onSelect={value => onSelect(value)}/>
							</Form.Item>
					}
					<div>
						<p>Products</p>
						<Form.List name="products">
							{(fields, {add, remove}) => (
								<>
									{fields.map((field, key) => (
										<Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
											<Form.Item
												name={[key, 'name']}
												label="Name"
												rules={[{ required: true, message: 'Missing name' }]}
											>
												<Input placeholder="Enter name..."/>
											</Form.Item>
											<Form.Item
												name={[key, 'quantity']}
												label="Quantity"
												rules={[{ required: true, message: 'Missing quantity' }]}
											>
												<Input placeholder="Enter Quantity"/>
											</Form.Item>
											<Form.Item
												name={[key, 'price']}
												label="Price"
												rules={[{ required: true, message: 'Missing price' }]}
											>
												<Input placeholder="Enter price"/>
											</Form.Item>
											<MinusCircleOutlined style={{alignItems: 'center'}} onClick={() => remove(field.name)}/>
										</Space>
									))}
									<Form.Item>
										<Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
											Add product
										</Button>
									</Form.Item>
								</>
							)}
						</Form.List>
					</div>


					<Form.Item>
						<Space style={{float: 'right'}}>
							<Button type='secondary' onClick={() => {
								setModalVisible(false)
								setVisible(true)
							}}>CANCEL</Button>
							<Button type='primary' htmlType='submit'>
								{mode === 'ADD' ? 'ADD' : 'EDIT'}
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</Modal>
			<div>
				<Row gutter={16}>
					{
						orders.map(order => {
							return (
								<Col xs={12} sm={12} md={12} lg={8} xl={6} xxl={6}>
									<Card
										key={order}
										hoverable
										onClick={() => {
											setVisible(true);
											setData(order);
										}}
									>
										<div>
											<h3 className='mb-0'>{order.name}</h3>
											<span>{moment(parseInt(order.date)).format('DD-MM-YYYY')}</span>
											{
												order.products
													?
													<p>
														{order.products.reduce((total, product) => {
															return total += (product.quantity * product.price)
														}, 0)} VND
													</p>
													: null
											}
										</div>
									</Card>
								</Col>
							)
						})
					}
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
									type="primary"
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
								<p>Name: {data.name}</p>
							</Col>
							<Col>
								<p>Date: {moment(parseInt(data.date)).format('DD-MM-YYYY')}</p>
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
													<Col span={9}>
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
				</Row>
			</div>
		</div>
	)
}

export default Index