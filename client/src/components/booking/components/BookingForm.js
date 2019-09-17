import React,{ Component } from 'react'
import { Card,Form,Input,DatePicker, Button ,message } from 'antd'
import axios from 'axios'
import { BASEURL } from '../../../config/config'
import Auth from '../../../auth/auth'
const FormItem = Form.Item
const { TextArea } = Input;

class BookingForm extends Component{

  componentDidMount(){
    //Setup the authentication first
    if (!Auth.isAuthenticated()){
      axios.get(`${BASEURL}/public/auth`)
      .then(res=>{
        Auth.setToken(res.data.Credential)
      })
    }
  }

  clearFields = ()=>{
    this.props.form.setFieldsValue({ name: '' ,email: '', comments: '',date: null });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.post(`${BASEURL}/api/create/booking`,{},{
          headers: {
            Authorization: `Basic ${Auth.getToken()}`
          },
          data: {
            ...values,
            cAt: new Date()
          },
          contentType: 'json',
          responseType: 'json',
          type: 'application/json'
        }).then(()=>{
          this.clearFields()
          message.success('Booking has been arranged.')
        })
      }
    });
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="card-booking">
        <Card title={<h6 className="text-center">Book Your Haircut</h6>}>
          <Form className="text-center">
            <FormItem label="Name: ">
            {getFieldDecorator('name', {
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
            <Button onClick={this.handleSubmit} type="primary">Book Now</Button>
          </Form>
        </Card>
      </div>
    )
  }
}
export default Form.create()(BookingForm) 