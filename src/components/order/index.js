import {
	Avatar,
	Button,
	Form,
	List,
	Modal,
	notification,
} from "antd";
import {useEffect, useState} from "react";
import {getDataFromStorage, setDataToStorage} from "../../services/storageServices";
import {setItem} from "../../redux/actions/Order";
import {useSelector} from "react-redux";
import moment from "moment";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import order from "../../redux/reducers/Order";
import DrawerOrder from "./DrawerOrder";
import ModalOrder from "./ModalOrder";

const {confirm} = Modal;

const Index = (props) => {
	const {mode, setMode} = props;
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [data, setData] = useState('');

	useEffect(() => {
		const order = getDataFromStorage('order');
		setItem(order);
	}, []);

	const orders = useSelector(state => state.order);

	const onSelect = (value) => {
		return moment(value).format('x');
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

	useEffect(() => {
		if (mode && mode === 'ADD') {
			form.resetFields();
		} else if (mode && mode === 'EDIT') {
			form.setFieldsValue({
				name: data?.name,
				date: moment(data?.date),
				products: data?.products ?? null,
			})
		}
	})

	const onFinish = (values) => {
		let submitData = {
			id: values?.id ?? Math.random(),
			name: values?.name,
			date: new Date(values?.date).getTime(),
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
				<Button
					type='primary'
					onClick={() => {
						setModalVisible(true)
						setMode('ADD')
					}}>
					ADD ORDER
				</Button>
			</div>
			<ModalOrder
				modalVisible={modalVisible}
				mode={mode}
				setModalVisible={setModalVisible}
				form={form}
				onFinish={onFinish}
				data={data}
				setVisible={setVisible}
				onSelect={onSelect}
			/>

			<DrawerOrder
				visible={visible}
				setVisible={setVisible}
				setModalVisible={setModalVisible}
				setMode={setMode}
				showDeleteConfirm={showDeleteConfirm}
				data={data}
			/>

			<div style={{marginBottom: '30px'}}>
				<List
					className='list-order'
					bordered={true}
					size='large'
					dataSource={orders}
					itemLayout="horizontal"
					renderItem={item => {
						return (
							(
								<List.Item
									key={item.id}
									onClick={() => {
										setVisible(true);
										setData(item);
									}}
								>
									<List.Item.Meta
										avatar={<Avatar
											src='data:image/jpeg;base64,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'/>}
										title={item.name}
										description={moment(item.date).format('DD-MM-YYYY, h:mm:ss a')}
									/>
									<div>
										{item.products.reduce((total, product) => {
											return total += (product.quantity * product.price)
										}, 0)} VND
									</div>
								</List.Item>
							)
						)
					}}
				>
				</List>
			</div>
		</div>
	)
}

export default Index