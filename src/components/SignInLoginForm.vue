<template>
    <div class="relative">
        <!-- background blur -->
        <div @click="close" class="fixed z-40 bg-black/50 top-0 right-0 left-0 bottom-0">
        </div>
        <!-- sign in form -->
        <form 
        x-show.transition.opacity.duration.700ms="open"
        class="absolute flex text-center flex-col z-50 inset-x-0 shadow-indigo-100 shadow-md p-4 bg-gray-50 w-3/4 md:w-2/5 mx-auto top-[60%] rounded-lg "
        @submit="handleLogin">
            <div class="w-full flex justify-end">
                <span class="cursor-pointer border shadow-sm px-2" @click="close">x</span>
            </div>
            <h2 class="text-xl font-semibold">Sign In</h2>
            <label class="font-semibold text-lg mt-2">Email</label>
            <input class="outline-none px-4 py-2 mt-2 border rounded-md" v-model="formLogin.username" type="text"/>
            <label class="font-semibold text-lg mt-2">Password</label>
            <input class="outline-none px-4 py-2 mt-2 border rounded-md" v-model="formLogin.password" type="password"/>
            <button  type="submit" class="border mx-auto w-1/2 mt-2 shadow-sm px-2">Sign In</button>
        </form>
    </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import ApiService from '../service/ApiService';
const emit = defineEmits(['close'])
const formLogin = ref({
    username: "",
    password: ""
})
/**
 * Sign in
 */
function handleLogin(e) {
    e.preventDefault();
    ApiService.signIn({
        username: formLogin.value.username,
        password: formLogin.value.password
    }).then(res => {
        localStorage.setItem('token',res.data.data.acceess_token);
        location.reload()
    })
}
function close() {
    emit('close')
}
</script>

<style lang="scss" scoped>

</style>