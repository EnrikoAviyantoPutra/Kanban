<template>
  <div class="container">
    <div class="row">
      <div class="col-12 d-flex justify-content-center align-items-center mt-3">
        <div class="card bg-secondary">
          <article class="card-body">
            <h4 class="card-title text-center mb-4 mt-1 text-white">
              Register
            </h4>
            <hr />
            <form id="register-form" @submit.prevent="register">
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
                    v-model="register_email"
                    placeholder="Email"
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
                    v-model="register_password"
                    placeholder="Password"
                    type="password"
                  />
                </div>
                <!-- input-group.// -->
              </div>
              <!-- form-group// -->
              <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">
                  Register
                </button>
              </div>
              <!-- form-group// -->
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
export default {
  props: ["baseUrl"],
  data() {
    return {
      register_email: "",
      register_password: "",
    };
  },
  methods: {
    register() {
      axios({
        method: "POST",
        url: `${this.baseUrl}/register`,
        data: {
          email: this.register_email,
          password: this.register_password,
        },
      })
        .then(({ data }) => {
          console.log(data);
          Swal.fire({
            icon: "success",
            title: "Register",
            text: `${data.message}`,
          });

          this.$emit("emitChangePage", "login");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops.....",
            text: `${err.response.data.errors}`,
          });
        })
        .then(() => {
          this.register_email = "";
          this.register_password = "";
        });
    },
  },
};
</script>

<style>
</style>