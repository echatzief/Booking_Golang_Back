function setToken(token){
  localStorage.setItem('requestToken',token)
}
function getToken(){
  return localStorage.getItem('requestToken')
}
function isAuthenticated(){
  if (!localStorage.getItem('requestToken')){
    return true
  }
  return false
}
module.exports={
 setToken: setToken,
 getToken: getToken,
 isAuthenticated: isAuthenticated,
}