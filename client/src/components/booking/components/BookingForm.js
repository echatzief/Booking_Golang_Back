import React,{ Component } from 'react'
import { Card,Form,Input,DatePicker, Button } from 'antd'

const FormItem = Form.Item
const { TextArea } = Input;

class BookingForm extends Component{
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="card-booking">
        <Card title={<h6 className="text-center">Book Your Haircut</h6>}>
          <Form className="text-center">
            <FormItem label="Your Name: ">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input placeholder="Your name...."/>)}
            </FormItem>
            <FormItem label="E-mail">
              {getFieldDecorator('email', {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<Input placeholder="Your E-mail"/>)}
            </FormItem>
            <FormItem label="Comments">
              {getFieldDecorator('comments', {
                
              })(<TextArea rows={3} placeholder="Comments...." autosize={{ minRows: 2,maxRows: 4 }}/>)}
            </FormItem>
            <FormItem label="Time and Date">
              {getFieldDecorator('date', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your E-mail!',
                  },
                ],
              })(<DatePicker showTime placeholder="Select Time" />)}
            </FormItem>
            <Button type="primary">Book Now</Button>
          </Form>
        </Card>
      </div>
    )
  }
}
export default Form.create()(BookingForm) 