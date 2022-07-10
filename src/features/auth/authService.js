import axios from 'axios'

const API_URL = 'localhost:8888/api/'

// login user
const login = async (userData) => {
    const response = await axios.POST(API_URL + 'login', userData)

    if (response && response.data) {
        AsyncStorage.setItem('login', JSON.stringify(response.data))
        console.log(response.data)
    }

    return response.data
}

const authService = {
    login,
}

export default authService