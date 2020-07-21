import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://udemy-react-94a34.firebaseio.com/'
})

export default instance