<template>
  <div>
    <!-- <h1>{{message}}</h1> -->
    <!-- <Navbar v-if="page === 'home'" @emitAuthenticate="auth" @emitChangePage="changePage" :baseUrl="url" @emitFetchCategory= "getAllCategory"></Navbar> -->
    <Home v-if="page === 'home'" :baseUrl="url" @emitAuthenticate='auth'></Home>
    <Login
      v-if="page === 'login'"
      @emitChangePage="changePage"
      :baseUrl="url"
    ></Login>
    <Register
      v-if="page === 'register'"
      @emitChangePage="changePage"
      :baseUrl="url"
    ></Register>
    <!-- <AddCategory v-if="page === 'addCategory'"  :baseUrl="url" @emitChangePage="changePage"  ></AddCategory> -->
  </div>
</template>

<script>
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
// import AddCategory from "./components/addCategory"
import Vue from "vue"
export default {
  data() { 
    return {
      message: "Hello Vue",
      page: "login",
      url: "https://kanban-rmt008.herokuapp.com",
    };
  },
  components: {
    Home,
    Login,
    Register,
    // Navbar,
    // AddCategory
  },

  methods: {
      getAllCategory(){

      },
    changePage(value) {
      this.page = value;
    },
    auth() {
      this.page = 'login';
      localStorage.clear();
      Vue.GoogleAuth.then(auth2 => {
        auth2.signOut().then(() => {
        })
      })
    },
  },
  created(){
        console.log('created di app vue')
        if (localStorage.access_token) {
            this.page = 'home'
        }else{
            this.page = 'login'
        }
    }
};
</script>
<style>
* {
  font-family: "Alata";
}
</style>