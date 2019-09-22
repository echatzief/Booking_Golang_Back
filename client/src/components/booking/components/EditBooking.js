import React,{ Component } from 'react'
import { Row,Col,Card,Form,Input,Spin,Icon,Button } from 'antd'
import Auth from '../../../auth/auth'
import axios from 'axios'
import { BASEURL } from '../../../config/config'
import EditForm from './EditForm'


const FormItem = Form.Item
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} />

class EditBookingForm extends Component{
  constructor(props){
    super(props)
    this.state={
      isLoading: false,
      bookingHash: null,
      booking: null,
    }
  }
  componentDidMount(){
    //Setup the authentication first
    if (!Auth.isAuthenticated()){
      axios.get(`${BASEURL}/public/auth`)
      .then(res=>{
        Auth.setToken(res.data.Credential)
      })
    }
  }
  changeInput = (e)=>{
    this.setState({ bookingHash: e.target.value })
  }
  searchForBooking = () =>{
    this.setState({ isLoading: true })
    axios.post(`${BASEURL}/api/booking/find`,{},{
      headers: {
        Authorization: `Basic ${Auth.getToken()}`
      },
      data: {
        _id: this.state.bookingHash,
      },
      contentType: 'json',
      responseType: 'json',
      type: 'application/json'
    }).then((res)=>{
      if (res.data._id){
        this.setState({ isLoading: false ,booking: res.data })
      } else {
        this.setState({ isLoading: false ,booking: null })
      }
    })
  }
  render(){
    return (
      <div className="gapBetween">
        <Row>
          <Col span={12} offset={6}>
            <Card className="container text-center">
              <strong>Enter the hash in order to edit your booking: </strong>
              <Row className="gapBetween">
                <Col span={8} offset={8}>
                  <Form>
                    <FormItem>
                      <Input placeholder="Booking hash" onChange={this.changeInput} value={this.state.bookingHash}/>
                    </FormItem>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Button onClick={this.searchForBooking}>Search</Button>
              </Row>
              <Row className="gapBetween"> 
                <Spin indicator={antIcon} spinning={this.state.isLoading}>
                  {
                    this.state.booking
                    ? <Col span={10} offset={7}>
                        <EditForm booking={this.state.booking} onSuccess={this.searchForBooking}/>
                      </Col>
                    : null
                  }
                </Spin>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
export default EditBookingForm