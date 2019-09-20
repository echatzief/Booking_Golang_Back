import React,{ Component } from 'react'
import { Row,Col } from 'antd'
import BookingForm from './components/BookingForm'
import InfoCard from './components/InfoCard'

class BookingIndex extends Component{
  render(){
    return (
      <Row type="flex" justify="center">
        <Col span={7}>
          <InfoCard history={this.props.history}/>
        </Col>
        <Col span={17} className="right-part">
          <BookingForm/>
        </Col>
      </Row>
    )
  }
}
export default BookingIndex