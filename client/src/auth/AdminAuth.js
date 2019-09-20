function setToken(token){
  localStorage.setItem('adminToken',token)
}
function getToken(){
  return localStorage.getItem('adminToken')
}
function isAuthenticated(){
  if (localStorage.getItem('adminToken')){
    return true
  }
  return false
}
module.exports={
 setToken: setToken,
 getToken: getToken,
 isAuthenticated: isAuthenticated,
}