<template>
    <div class="flex justify-between items-center w-full p-2 bg-slate-200">
        <router-link to="/">Logo</router-link>
        <!-- Token bor yo'qligiga ko'ra button chiqaradi -->
        <button 
            @click="modalOpen"
            class="text-[#20af03] shadow-md bg-white px-4 border rounded hover:scale-110"
            v-if="!token">Sign In</button>        
        <button 
            @click="signOut"
            class="text-[#20af03] shadow-md bg-white px-4 border rounded hover:scale-110"
            v-else>Sign Out</button>        
    </div>
    <!-- sign in form -->
    <SignInLoginForm @close="close" v-if="openModal"></SignInLoginForm>
</template>
<script>
import SignInLoginForm from './SignInLoginForm.vue';

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Navbar",
    data() {
        return {
            token: false,
            openModal: false
        };
    },
    methods: {
        // modal boshqaruvi
        modalOpen() {
            this.openModal = true
        },
        close() {
            this.openModal = false
        },
        // modal boshqaruvi
        // tizimdan chiqish
        signOut() {
            localStorage.removeItem("token")
            location.reload()
        }
    },
    created() {
        // tokenni oladi
        this.token = !!localStorage.getItem("token");
    },
    components: { SignInLoginForm }
}
</script>
<style scoped>
a {
    text-decoration: none;
    color: #20af03;
    font-size: 30px;
    margin: 0 35px;
}
</style>