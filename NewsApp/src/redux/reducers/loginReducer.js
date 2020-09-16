const initState = {
  isUserLoggedIn: false
}

const loginReducer = (state = initState, action) => {
  switch (action.type) {
    case 'IS_LOGGED_IN':
        return { ...state, isUserLoggedIn: true }
    case 'IS_LOGGED_OUT':
        return { ...state, isUserLoggedIn: false }
    
    default:
      return state;
  }
}

export default loginReducer;