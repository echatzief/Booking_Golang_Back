import React,{ Component } from 'react'
import { Form,Input,Button, Col,Row,message } from 'antd'
import axios from 'axios'
import { BASEURL } from '../../../config/config'
const FormItem = Form.Item
class LoginForm extends Component{

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        axios.post(`${BASEURL}/public/login`,{},{
          data: {
            ...values,
          },
          contentType: 'json',
          responseType: 'json',
          type: 'application/json'
        }).then((res)=>{
          if (res.data.Success === "true"){
            this.props.history.push('/a')
          } else {
            message.error("Wrong credentials.Try again.")
          }
        })
      }
    });
  };
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="gapBetween">
        <Row>
          <Col span={12} offset={6}>
            <Form className="text-center">
              <FormItem label="Username: ">
              {getFieldDecorator('username', {
                rules: [
                  {
                    required: true,
                    message: 'Please check your username.',
                  },
                ],
              })(<Input placeholder="Your username..." />)}
              </FormItem>
              <FormItem label="Password">
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please check your password!',
                    },
                  ],
                })(<Input.Password placeholder="Your password..." />)}
              </FormItem>
              <Button onClick={this.handleSubmit} type="primary">Login</Button>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Form.create()(LoginForm)