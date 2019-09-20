import React,{ Component } from 'react'
import { Card, Row,Col } from 'antd'
import haircut from '../../img/salon.svg'
import LoginForm from './components/LoginForm'
class Login extends Component{
  render(){
    return (
      <div  className="fromTop">
        <Row>
          <Col span={12} offset={6}>
            <Card style={{ padding: '5%' }}>
              <div className="gapBetween containere text-center">
                <span className="spanText">You Can Also Login.Try Now!</span>
              </div>
              <div className="gapBetween containere text-center">
                <img height="90" width="90" alt="scissors" src={haircut} className="rounded mx-auto d-block"/>
              </div>
              <LoginForm history={this.props.history}/>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Login