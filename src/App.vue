<template>  
  <Navbar></Navbar>
  <router-view/>
</template>
<script>
import Navbar from './components/Navbar.vue';
export default {
  components: {
    Navbar
  }
}
</script>
<style>
*{
  margin: 0;
  box-sizing: border-box;
}
</style>
