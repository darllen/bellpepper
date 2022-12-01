import axios from "../node_modules/axios"

export function getRecipes(URL = 'https://voluble-conkies-26aad6.netlify.app/.netlify/functions/api') {
  debugger
  resp = axios.get(URL)
    .then(data => console.log(data))
    .catch(err => console.log(err))
  
  return resp
}
