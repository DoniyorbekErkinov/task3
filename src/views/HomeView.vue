<!-- eslint-disable no-unused-vars -->
<template>
   <div class="relative rounded-xl  py-4 px-8 m-5">
     <p class="text-3xl text-center text-gray-700 font-bold mb-5">
       Products
     </p>
     <div class="flex justify-between  flex-wrap -m-4 text-center ">
        <div
        class="flex items-center  flex-wrap gap-1 w-[100%] justify-between p-4  rounded-lg "            
          >
            <div 
            class="flex flex-col items-center border w-[45%]  p-4  rounded-lg bg-gray-50 my-5 shadow-indigo-100 shadow-md hover:scale-110"
              v-for="(item, i) in products" :key="i"
            >
              <p class="flex  w-full text-xl font-semibold">{{ item.name }}</p>
              <p>{{ item.text }}</p>
              <div class="flex -mb-1 w-full mt-5 justify-between items-center">                  
                <StarRating                                   
                  :round-start-rating="true" 
                  :star-size="20" 
                  :read-only="true"
                  :show-rating="false"
                  v-bind:rating="ratingOfProduct(item.rating.ratings)">
                </StarRating>
                <span @click="openModal(item)" class="cursor-pointer text-base hover:text-red-500 transition-all">Rate Product</span>
              </div>
            </div>
        </div>
     </div>
     <div
     v-if="modal"
     x-show.transition.opacity.duration.700ms="open"
      class="absolute flex flex-col  inset-x-0 shadow-indigo-100 shadow-md p-4 bg-gray-50 w-3/4 md:w-2/5 mx-auto top-1/2 rounded-lg rounded-t-none">
        <div class="flex justify-between font-semibold text-xl">
          <span>{{ itemName }}</span>
          <span @click="modal = false" class="text-end -mt-2 border px-1 rounded-lg shadow-md cursor-pointer">x</span>
        </div>
        <div class="w-full flex justify-between mt-4">
          <StarRating                 
            :round-start-rating="true" 
            :star-size="20" 
            :read-only="false"
            :show-rating="false"
            v-model="rating"
            :increment="0.5"
            @update:rating="rating = $event"
          >
          </StarRating>
          <button @click="rateProduct" class="text-xl text-green-400 px-2 rounded shadow-md w-[25%] border cursor-pointer ">Rate</button>
        </div>
     </div>
     <SignInLoginForm v-if="openSignIn"></SignInLoginForm>
  </div>
</template>

<script>
// eslint-disable vue/no-unused-components 
import SignInLoginForm from '@/components/SignInLoginForm.vue';
import axios from 'axios'
import StarRating from 'vue-star-rating'
export default {
  name: 'HomeView',
  components: {
    StarRating,
    SignInLoginForm
},
  data() {
    return {
      products: [],
      modal: false,
      itemName: '',
      rating: 0,
      token: "",
      openSignIn: false,
      currentItem: {}
    }
  },
  methods: {
    getData() {
      axios.get('http://demo0684927.mockable.io/get-products').then(res => {
        this.products = res.data.result
      })
    },
    ratingOfProduct(item) {
      let ratingScore = 0
      item.forEach(el => {
        ratingScore += +el.userBall
      })
      ratingScore = ratingScore / item.length
      return Number.parseFloat(ratingScore.toFixed(2))
    },
    rateProduct() {
      if(this.token) {            
        axios.post(`http://demo0684927.mockable.io/rate?productid=${this.currentItem.productId}&rating=${this.rating}`).then(res => {
          this.modal = false
          alert(res.data.success)
        })
      } else {
        this.openSignIn = true
      }
    },
    openModal(item) {
      this.itemName = item.name
      this.currentItem = item
      this.modal = true
    }
  },
  created() {
    this.getData()
    this.token = !!localStorage.getItem('token')
  }
}
</script>
