import axios from 'axios'
const mockrequest = axios.create({
    timeout:5000
})
export default mockrequest