const uriHeader = "" //"animevost-web" or "" for localhost
const uriHeaderWD = uriHeader === "" ? '' : `/${uriHeader}`
const apiUrl = "https://api.animetop.info/v1" // https://api.animevost.org/v1
export { uriHeader, uriHeaderWD, apiUrl }