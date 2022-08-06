import axios from 'axios'
import {encode as btoa} from 'base-64'
import { API_URL, PATH } from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// login user
const login = async (formData) => {
    var basicAuth = 'Basic ' + btoa(formData.username + ':' + formData.password)

    axios.post(API_URL + PATH.LOGIN, {}, {
      headers: {'Authorization': basicAuth}
    }
    )
      .then(response => {
        data = response.data
        console.log(data.data)

        await AsyncStorage.setItem('user', data.data)

        alert('Login successfully')
        navigation.navigate('HomeNavigator')
      })
      .catch(error => {
        var errorMsg = error.response.status
        console.log(errorMsg)

        if (errorMsg == '401') {
          alert("Invalid username/password")
        }
      })
  }

const authService = {
    login,
}

export default authService