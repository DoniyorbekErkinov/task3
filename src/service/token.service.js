const TOKEN_KEY = 'access_token'
const USER_DATA = 'user'
const TokenService = {
    setToken(access_token) {
        localStorage.setItem(TOKEN_KEY, access_token)
    },
    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },
    removeToken() {
        return localStorage.removeItem(TOKEN_KEY)
    },
    setUser(user) {
        localStorage.setItem(USER_DATA, user)
    },
    getUser() {
        return localStorage.getItem(USER_DATA)
    },
    removeUser() {
        return localStorage.removeItem(USER_DATA)
    }    
}
export {TokenService}