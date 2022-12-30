import axios from "axios";

const ApiService = {
  getProducts() {
    return axios.get('http://demo0684927.mockable.io/get-products')
  },
  rateProduct(data) {
    return axios.post(`http://demo0684927.mockable.io/rate?productid=${data.productId}&rating=${data.rating}`)
  },
  signIn(data) {
    return axios.post((`http://demo0684927.mockable.io/login?username=${data.username}&password=${data.password}`))
  }
};

export default ApiService;