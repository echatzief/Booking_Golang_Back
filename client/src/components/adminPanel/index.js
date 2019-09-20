import React,{ Component } from 'react'
import AdminAuth from '../../auth/AdminAuth'
import axios from 'axios'
import { BASEURL } from '../../config/config'
import { Card,Row,Col,Table,Button,Icon,Popconfirm } from 'antd'
import moment from 'moment'

const ButtonGroup = Button.Group;
class AdminPanel extends Component{
  constructor(props){
    super(props)
    this.state={
      isLoading: false,
      allBookings: [],
    }
  }
  componentDidMount(){
    if (!AdminAuth.isAuthenticated()){
      this.props.history.push('/login')
    } else {
      this.fetchBookings()
    }
  }
  fetchBookings = ()=>{
    this.setState({ isLoading: true })
    axios.get(`${BASEURL}/api/bookings`,{
      headers: {
        Authorization: `Basic ${AdminAuth.getToken()}`
      },
      contentType: 'json',
      responseType: 'json',
      type: 'application/json'
    }).then((res)=>{
      if (res.data){
        res.data.forEach(function(x,index){
          x.key = index;
        }) 
      }
      this.setState({ allBookings: res.data ,isLoading: false })
    })
  }
  deleteBooking = (_id)=>{
    axios.post(`${BASEURL}/api/bookings/delete`,{},{
      headers: {
        Authorization: `Basic ${AdminAuth.getToken()}`
      },
      data: {
        _id: _id,
      },
      contentType: 'json',
      responseType: 'json',
      type: 'application/json'
    }).then(()=>{
      this.fetchBookings()
    })
  }
  render(){
    const columns = [
      {
        title: 'Client Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: (v)=> {return moment(v).format("YYYY-DD-MM HH:mm")}
      },
      {
        title: 'Comments',
        dataIndex: 'comments',
        key: 'comments',
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (elem)=>{
          return (
            <ButtonGroup> 
              <Popconfirm placement="bottom" title={"Are you sure you want to delete the booking ?"} onConfirm={()=>this.deleteBooking(elem._id)} okText="Yes" cancelText="No">
                <Button><Icon type="delete" /></Button>
              </Popconfirm>
            </ButtonGroup>
          )
        }
      },
    ];
    return (
      <div className="fromTop">
        <Row>
          <Col span={20} offset={2}>
            <Card style={{ padding: '5%' }}>
              <div className="container text-center">
                <span className="spanText">Bookings</span>
              </div>
              <Table 
                className="gapBetween"
                dataSource={this.state.allBookings} 
                columns={columns} 
                loading={this.state.isLoading}
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
export default AdminPanel