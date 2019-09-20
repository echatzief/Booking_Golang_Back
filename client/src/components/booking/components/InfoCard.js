import React,{ Component } from 'react'
import haircut from '../../../img/salon.svg'
import { Button } from 'antd'
class InfoCard extends Component{
  render(){
    return (
      <div className="container text-center image-thumb">
        <img height="90" width="90" alt="scissors" src={haircut} className="rounded mx-auto d-block"/>
        <h6>Book your haircut</h6>
        <Button type="primary" onClick={()=>this.props.history.push('/booking/edit')}>Edit</Button>
      </div>
    )
  }
}
export default InfoCard