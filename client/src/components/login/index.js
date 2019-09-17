import React,{ Component } from 'react'
import { Card, Row,Col } from 'antd'
import haircut from '../../img/salon.svg'
import LoginForm from './components/LoginForm'
class Login extends Component{
  render(){
    return (
      <Row className="fromTop">
        <Col span={12} offset={6}>
          <Card>
            <Row className="gapBetween">
              <Col span={12} offset={7}>
                <span className="spanText">You Can Also Login.Try Now!</span>
              </Col>
            </Row>
            <Row className="gapBetween">
              <Col span={12} offset={6}>
                <img height="90" width="90" alt="scissors" src={haircut} className="rounded mx-auto d-block"/>
              </Col>
            </Row>
            <LoginForm history={this.props.history}/>
          </Card>
        </Col>
      </Row>
    )
  }
}
export default Login