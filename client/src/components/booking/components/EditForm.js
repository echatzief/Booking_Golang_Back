import React,{ Component } from 'react'
import { Form,Input,DatePicker,Button, message } from 'antd'
import moment from 'moment'
import axios from 'axios'
import { BASEURL } from '../../../config/config'
import Auth from '../../../auth/auth'

const { TextArea } = Input;
const FormItem =Form.Item
class EditForm extends Component{

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.post(`${BASEURL}/api/booking/edit`,{},{
          headers: {
            Authorization: `Basic ${Auth.getToken()}`
          },
          data: {
            ...values,
            _id: this.props.booking._id,
            cAt: this.props.booking.cAt,
          },
          contentType: 'json',
          responseType: 'json',
          type: 'application/json'
        }).then(()=>{
          message.success('Booking has been updated successfully.')
          this.props.onSuccess()
        })
      }
    });
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="text-center">
        <FormItem label="Name: ">
        {getFieldDecorator('name', {
          initialValue: this.props.booking && this.props.booking.name,
          rules: [
            {
              required: true,
              message: 'Please check your name.',
            },
          ],
        })(<Input placeholder="Your name ..." />)}
        </FormItem>
        <FormItem label="E-mail: ">
          {getFieldDecorator('email', {
            initialValue: this.props.booking && this.props.booking.email,
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
          })(<Input placeholder="Your E-mail ..." />)}
        </FormItem>
        <FormItem label="Comments: ">
          {getFieldDecorator('comments', {
            initialValue: this.props.booking && this.props.booking.comments,
            rules: []
          })( <TextArea 
                rows={3} 
                placeholder="Comments...." 
                autosize={{ minRows: 2,maxRows: 4 }}
              />
          )}
        </FormItem>
        <FormItem label="Time and Date: ">
          {getFieldDecorator('date', {
            initialValue: this.props.booking &&  moment(this.props.booking.date),
            rules: [
              {
                required: true,
                message: 'Please input the appointment date',
              },
            ],
          })(
            <DatePicker 
              showTime 
              placeholder="Select Time ..." 
            />
          )}
        </FormItem>
        <Button onClick={this.handleSubmit} type="primary">Edit</Button>
      </Form>
    )
  }
}
export default Form.create()(EditForm) 