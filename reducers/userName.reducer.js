export default function(userName = '', action) {
    if(action.type == 'saveUserName') {
        // console.log('action username', action.name);
        return action.userName; 
    } else {
      return userName; 
   } 
}