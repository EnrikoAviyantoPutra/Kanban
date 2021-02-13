<template>
  <div
    class="container d-flex flex-row justify-content-center align-item-center"
  >
    <div class="row-6">
      <div class="d-flex justify-content-lg-center mt-5">
        <div
          class="card text-dark bg-dark mb-3 d-flex ju"
          style="max-width: 18rem"
        >
          <div class="card-header d-flex justify-content-lg-center bg-success">
            ADD CATEGORY
          </div>
          <div class="card-body">
            <form>
              <div class="form-group">
                <div class="input-group">
                  <div class="input-group-prepend"></div>
                  <input
                    name=""
                    class="form-control"
                    v-model="title_category"
                    placeholder="title"
                    type="text"
                  />
                </div>
              </div>
              <button type="submit" @click.prevent="addNewCategory" class="btn btn-primary btn-block">
                New Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["baseUrl"],
  data() {
    return {
      title_category: "",
    };
  },
  methods: {
    addNewCategory() {
      axios({
        method: "POST",
        url: `${this.baseUrl}/categories`,
        data: {
          title: this.title_category,
        },
        headers: {
          token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          console.log(data);
          Swal.fire({
            icon: "success",
            title: "Category Successfully Added",
            text: `${data.message}`,
          });
            this.$emit("emitChangePage", "home");
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
};
</script>

<style>
</style>