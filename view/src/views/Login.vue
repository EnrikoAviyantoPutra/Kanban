<template>
  <!-- <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css"> -->

  <div class="container">
    <div class="row">
      <div class="col-12 d-flex justify-content-center align-items-center mt-3">
        <div class="card shadow-lg" style="background-color: #457b9d">
          <article class="card-body">
            <h4 class="card-title text-center mb-4 mt-1 text-white">Login</h4>
            <hr />
            <form id="login-form" @submit.prevent="login">
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fa fa-user"></i>
                    </span>
                  </div>
                  <input
                    name=""
                    class="form-control"
                    v-model="login_email"
                    placeholder="Email or login"
                    type="email"
                  />
                </div>
                <!-- input-group.// -->
              </div>
              <!-- form-group// -->
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fa fa-lock"></i>
                    </span>
                  </div>
                  <input
                    class="form-control"
                    v-model="login_password"
                    placeholder="**"
                    type="password"
                  />
                </div>
                <!-- input-group.// -->
              </div>
              <!-- form-group// -->
              <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block mb-0">
                  Login
                </button>
                <p class="text-center fs-1">
                  <!-- Register -->
                  <a @click="changePage('register')" class="btn fs-1"
                    >Register</a
                  >
                </p>
              </div>
              <GoogleLogin
                :params="params"
                :renderParams="renderParams"
                :onSuccess="onSuccess"
                :onFailure="onFailure"
              ></GoogleLogin>
            </form>
          </article>
        </div>
        <!-- card.// -->
      </div>
      <!-- col.// -->
    </div>
    <!-- row.// -->
  </div>
</template>

<script>
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import GoogleLogin from "vue-google-login";
export default {
  props: ["baseUrl"],
  components: {
    GoogleLogin,
  },
  data() {
    return {
      login_email: "",
      login_password: "",
      params: {
        client_id:
          "382446582515-unphondongv9fuasfg9r40mq3ovg1nck.apps.googleusercontent.com",
      },
      // only needed if you want to render the button with the google ui
      renderParams: {
        width: 250,
        height: 50,
        longtitle: true,
      },
    };
  },
  methods: {
    onSuccess(googleUser) {
      console.log(googleUser);
      const id_token = googleUser.uc.id_token;
      console.log(id_token);
      axios({
        method: "POST",
        url: `${this.baseUrl}/google`,
        data: {
          googleToken: id_token,
        },
      })
        .then((response) => {
          console.log(response);
          localStorage.access_token = response.data.accessToken;
          this.$emit("emitChangePage", "home");
        })
        .catch((err) => {
          console.log(err);
        });

      // This only gets the user information: id, name, imageUrl and email
      console.log(googleUser.getBasicProfile());
    },
    onFailure(error) {
      console.log(error);
    },
    login() {
      axios({
        method: "POST",
        url: `${this.baseUrl}/login`,
        // url: `${this.baseUrl}/login`,
        data: {
          email: this.login_email,
          password: this.login_password,
        },
      })
        .then(({ data }) => {
          console.log(data.message);
          localStorage.access_token = data.access_token;
          this.$emit("emitChangePage", "home");
          Swal.fire({
            icon: "success",
            title: "Welcome",
            text: `${data.message}`,
          });
        })
        .catch((err) => {
          console.log(err.response.data.errors);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data.errors}`,
            footer: "<a href>Why do I have this issue?</a>",
          });
        })
        .then(() => {
          this.login_email = "";
          this.login_password = "";
          //   localStorage.clear()
        });
    },
    changePage(value) {
      this.$emit("emitChangePage", value);
    },
  },
};
</script>

<style>
</style>

