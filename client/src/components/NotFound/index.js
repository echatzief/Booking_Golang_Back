import React,{ Component } from 'react'

class NotFound extends Component{
  render(){
    return (
      <div className="text-center error-page">
        <div className="err">
          <h4>404</h4>
          <h3>Sorry, Page Not Found</h3>
        </div>
      </div>
    )
  }
}
export default NotFound