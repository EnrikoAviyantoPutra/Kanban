<template>
  <!-- NAVBAR -->
  <nav
    class="navbar navbar-expand-lg navbar-light shadow-lg mb-4"
    style="background-color: #f1c40f"
  >
    <img src="./img/kanbanboard_120442.png" alt="" class="src" width="50px" />
    <a class="navbar-brand text-white" href="#">Kanban</a>
    <div class="container-fluid d-flex flex-row justify-content-end">
      <div class="row">
        <div
          class="d-flex flex-column justify-content-sm-evenly align-items-center"
        >
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
              <li class="nav-item">
                <a
                  class="nav-link active text-white"
                  aria-current="page"
                  @click.prevent="addCategory"
                  href="#"
                  >Add Category</a
                >
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" @click.prevent="logout()" href="#"
                  >Logout</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import axios from 'axios'
export default {
  props: ['baseUrl'],
  data() {
    return {


    };
  },
  methods: {
    logout() {
      this.$emit("emitAuthenticate");
      this.$emit("emitLogOut")
    },
    addCategory() {
        console.log(this.baseUrl);
      Swal.fire({
        title: "Add New Category",
        html: `<input type="text" id="title_category" class="swal2-input" placeholder="title" @click.prevent>`,
        confirmButtonText: "New Category",
        focusConfirm: false,
        preConfirm: () => {
          const title = Swal.getPopup().querySelector("#title_category").value;
          if (!title) {
            Swal.showValidationMessage(`Please enter your title category`);
          }
          console.log(title, 'ini dri line 75');
          return { title: title };
        }
      }).then((result) => {
          console.log(result, 'ini dari line 79');
          return axios({
            method: "POST",
            url: `${this.baseUrl}/categories`,
            data: {
              title: result.value.title,
            },
            headers: {
              token: localStorage.access_token,
            },
          });
        })
        .then(({result}) => {
          console.log(result,'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
          Swal.fire({
            icon: "success",
            title: "Success",
            text: `Category Successfully Added`,
          });
          this.$emit("emitFetchCategory");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",

          });
        });
    },
  },
};
</script>

<style>
</style>