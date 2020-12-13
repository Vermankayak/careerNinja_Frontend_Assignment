let initState = {}

function valueReducer(state = initState, action) {
  if (action.type === "VALUE_ACTION") {
    let newState = action.payload
    return newState
  }
  else{
    return initState
  }
}
export default valueReducer