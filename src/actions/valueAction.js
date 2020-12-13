let obj = { optionsKing: [], optionsTypes:[], optionsLocations:[], kingsValue:"", typesValue:"", locationValue:"" }

function valueAction(obj) {
  return {
    type:"VALUE_ACTION",
    payload:obj
  }
}
export default valueAction