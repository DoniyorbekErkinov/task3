import router from '@/router'
import ApiService from './api.service'
import { TokenService } from './token.service'

class AuthenticationError extends Error {
    constructor(errorCode, message) {
        super(message)
        this.name = this.constructor.name
        this.message = message
        this.errorCode = errorCode
    }
}

const UserService = {
    /**
     * Login the user and store the access token to TokenService.
     *
     * @returns access_token
     * @throws AuthenticationError
     **/
    login: async function (userData) {
        const requestData = {
            method: 'post',
            url: 'v.1/auth-payload',
            data: {
                username: userData.username,
                password: userData.password
            }
        };

        try {
            const response = await ApiService.customRequest(requestData);
            let data = response.data
            await TokenService.setToken(data.token);
            await TokenService.setUser(JSON.stringify({
                username: data.username,
            }))
            ApiService.setHeader();
            ApiService.mount401Interceptor();            
            if(response.status === 200 && response.data.token) {
                router.push('/')
            }
        } catch (error) {
            throw new AuthenticationError(error);
        }
    },

    /**
     * Logout the current user by removing the token from storage.
     *
     * Will also remove `Authorization Bearer <token>` header from future requests.
     **/
    logout() {
        // Remove the token and remove Authorization header from Api Service as well
        TokenService.removeToken()  
        TokenService.removeUser()  
        ApiService.removeHeader();
        ApiService.unmount401Interceptor()
        router.push('/login')
    },
};

export { UserService, AuthenticationError };