<template>   
  <div>
    <Navbar></Navbar>
    <HomeView></HomeView>
  </div>
</template>
<script>
import Navbar from './components/Navbar.vue';
import HomeView from './views/HomeView.vue';
export default {
  components: {
    Navbar,
    HomeView
}
}
</script>
<style>
*{
  margin: 0;
  box-sizing: border-box;
}
</style>
