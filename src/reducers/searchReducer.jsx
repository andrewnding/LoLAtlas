const initialState = {
  summonerName: '',
  region: ''
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "HELLO_WORLD":
      return 'Hello World'
    default:
      return state
  }
}

export default searchReducer