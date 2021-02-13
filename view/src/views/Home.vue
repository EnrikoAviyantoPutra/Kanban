<template>
<div>
      <Navbar :baseUrl="baseUrl" @emitFetchCategory="fetchCategory" @emitLogOut='logOut'></Navbar>
  <div class="container">
    <h1 class="d-flex flex-row justify-content-center">Your Personalize Kanban</h1>
    <hr />
    <div class="row d-flex flex-row justify-content-center">
      <Category
        v-for="category in categories"
        :key="category.id"
        :category="category"
        @emitDelCategory="deleteCategory"
        :baseUrl="baseUrl"
        :allCategory="categories"
        @emitFetchCategory="fetchCategory"
        @fetchDataCategory="fetchCategory"
        @deleteTaskInCategory="fetchCategory"

      >
      </Category>

    </div>
  </div>
</div>
</template>

<script>
import Navbar from "../components/navbar"
import Category from "../components/category";
import Task from '../components/task'
import axios from "axios";
export default {
  props: ["baseUrl"],
  data() {
    return {
      categories: [],
    };
  },
  methods: {
      logOut(){
          this.$emit('emitAuthenticate')
      },
    fetchCategory() {
      axios({
        method: "GET",
        url: `${this.baseUrl}/categories`, //endpoint diganti plural
        headers: {
          token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          console.log(data);
          this.categories = data.data;
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    deleteCategory(value) {
        console.log(value,'<<<<<<<<<<<<<ini di home');
      axios({
        method: "DELETE",
        url: `${this.baseUrl}/categories/${value}`,
        headers: {
          token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          console.log(data);
          Swal.fire({
            icon: "success",
            title: "Category Deleted",
            text: `${data.message}`,
          });
        //   this.$emit('emitChangePage')
          this.fetchCategory()
        })
        .catch((err) => {
          console.log(err);
           Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data.errors}`,
          });
          
        });
    },
  },
  created() {
    this.fetchCategory();
  },

  components: {
    Category,
    Task,
    Navbar
  },
};
</script>

<style>
</style>