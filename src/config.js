const localHostnames = ["localhost", "127.0.0.1", "0.0.0.0"] // список адресов для которых роутинг будет из корня
const myPathToPage = "animevost-web" // корневой юрл если адреса не было в списке выше

const uriHeader = localHostnames.includes(location.hostname) ? "" : myPathToPage // "animevost-web" for prod or "" for localhost
const uriHeaderWD = uriHeader === "" ? '' : `/${uriHeader}`
const apiUrl = "https://api.animetop.info/v1" // https://api.animevost.org/v1
export { uriHeader, uriHeaderWD, apiUrl }