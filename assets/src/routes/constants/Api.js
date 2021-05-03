import Axios from 'axios'

export const instance = Axios.create({
    headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    withCredentials:true,
    baseURL:"http://localhost:1337/"
})

export const getAllrestaurants = 'api/card/restaurants'
export const allrestaurants = 'api/admin/restaurants'
export const deleteRestaurant = 'api/restaurant'
export const editRestaurant = 'api/restaurant'
export const getRestaurant = 'api/restaurant'
export const addRestaurant = 'api/registration'
export const signin = 'user/login'
export const signout = 'user/logout'
export const signup = 'user/registration'
export const admin = "Admin"
