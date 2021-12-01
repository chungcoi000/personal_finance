import {Button, DatePicker, Form, Input, Modal, Space} from "antd";
import moment from "moment";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {useState} from "react";

const ModalOrder = (props) => {
	const {modalVisible, mode, setModalVisible, form, onFinish, data, setVisible, onSelect} = props
	return (
		<div>
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
					<Form.Item label='Date' name='date'>
						<DatePicker
							showTime
							size='large'
							defaultValue={mode === 'EDIT' ? moment(data.date) : false}
							onSelect={value => onSelect(value)}
						/>
					</Form.Item>
					<div>
						<p>Products</p>
						<Form.List name="products">
							{(fields, {add, remove}) => (
								<>
									{fields.map(({key, name, fieldKey}) => (
										<Space key={key} style={{display: 'flex', marginBottom: 8}} align="baseline">
											<Form.Item
												label='Name'
												name={[name, 'name']}
												fieldKey={[fieldKey, 'name']}
												rules={[{required: true, message: 'Missing name'}]}
											>
												<Input placeholder="Please input Name..."/>
											</Form.Item>
											<Form.Item
												label='Quantity'
												name={[name, 'quantity']}
												fieldKey={[fieldKey, 'quantity']}
												rules={[{required: true, message: 'Missing quantity'}]}
											>
												<Input placeholder="Please input quantity..." onChange={() => {

												}}/>
											</Form.Item>
											<Form.Item
												label='Price'
												name={[name, 'price']}
												fieldKey={[fieldKey, 'price']}
												rules={[{required: true, message: 'Missing price'}]}
											>
												<Input placeholder="Please input price..."/>
											</Form.Item>
											<Form.Item
												label='Total'
												name={[name, 'total']}
												fieldKey={[fieldKey, 'total']}
											>
												<Input placeholder="Please input price..."/>
											</Form.Item>
											<MinusCircleOutlined onClick={() => remove(name)}/>
										</Space>
									))}
									<Form.Item>
										<Button type="dashed" onClick={() => {
											add()
										}} block icon={<PlusOutlined/>}>
											Add product
										</Button>
									</Form.Item>
								</>
							)}
						</Form.List>
					</div>

					<Form.Item>
						<Space style={{float: 'right'}}>
							{
								mode === 'EDIT'
									? <Button type='secondary' onClick={() => {
										setModalVisible(false)
										setVisible(true)
									}}>CANCEL</Button>
									: <Button type='secondary' onClick={() => {
										setModalVisible(false)
										setVisible(false)
									}}>CANCEL</Button>
							}
							<Button type='primary' htmlType='submit'>
								{mode === 'ADD' ? 'ADD' : 'EDIT'}
							</Button>
						</Space>
					</Form.Item>
				</Form>
			</Modal>
		</div>
	)
}

export default ModalOrder