const helloWorldReducer = (state = '', action) => {
  switch (action.type) {
    case "HELLO_WORLD":
      return 'Hello World'
    default:
      return state
  }
}

export default helloWorldReducer