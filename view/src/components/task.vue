<template>

  <div class="card mt-2" style="width: 14rem">
    <div class="card-header d-flex flex-row justify-content-between">
      <h3>
        {{ task.title }}
      </h3>
      <a href="#" class="btn bg-danger" @click.prevent="deleteTask">x</a>
    </div>
    <div class="card-body">
      <h4 class="card-title">{{ task.description }}</h4>
      <p class="card-text">by: {{ task.User.email }}</p>
      <p class="card-text">created: {{ task.createdAt.split("T")[0] }}</p>
      <a href="#" class="btn bg-warning" @click.prevent="editTask">Edit</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Category from "./category";
export default {
  props: ["task", "baseUrl", "allCategory"],
  components: {
    Category,
  },
  data(){
      return{
          editMode : false

      }
  },
  methods: {
    deleteTask() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
        .then((result) => {
          if (result.isConfirmed) {
            return axios({
              method: "DELETE",
              url: `${this.baseUrl}/task/${this.task.id}`,
              headers: {
                token: localStorage.access_token,
              },
            });
          } else {
              throw 'cancel'
            // Swal.fire({
            //   title: "Cancel Confirm",
            // });
          }
        })
        .then(() => {
          this.$emit("emitFetchDataCategory");
        })
        .then(() => {
          Swal.fire("Deleted!", "Your Task Has Been Deleted.", "Success");
        })
        .catch((err) => {
            console.log(err.response.data.errors);
            if (err === 'cancel') {
          Swal.fire({
            icon: "info",
            title: "Cancel",
            text: `You Cancel Your Action`,
          });      
            }else{
                Swal.fire({
                  icon: "error",
                  title: "Oops....",
                  text: `${err.response.data.errors}`,
                });

            }
          console.log(err);
        });
    },
    editTask() {
      console.log(this.allCategory);
      axios({
        method: "GET",
        url: `${this.baseUrl}/task/${this.task.id}`,
        headers: {
          token: localStorage.access_token,
        },
      })
        .then((response) => {
          console.log("ini hasil response sukses", response);
          //   console.log("kalau ini dari allcategory",this.allCategory.data.title);
          return Swal.fire({
            title: "Update Task",
            html: `
            <label class="margin-left">Title:</label>
            <input type="text" id="title_task" class="swal2-input" value="${response.data.title}">
            <label class="margin-left">Description:</label>
  <input type="text-area" id="description_task" class="swal2-input" value="${response.data.description}">
  <label class="margin-left">Category:</label><br>
              <select type="text-area" id="category_task" class="form-control">${this.allCategory.map(category=>`<option  value="${category.id}">${category.title}</option>`)}
              </select>`,
            confirmButtonText: "Edit Task",
            focusConfirm: false,
            preConfirm: () => {
              const title = Swal.getPopup().querySelector("#title_task").value;
              const description = Swal.getPopup().querySelector(
                "#description_task"
              ).value;
              const category = Swal.getPopup().querySelector("#category_task").value
              if (!title || !description || !category) {
                Swal.showValidationMessage(
                  `Please enter title, description and category`
                );
              }
              console.log(title, description);
              return { title: title, description: description, category:category };
            },
          });
        })
        .then((result) => {
          console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<", result);
          console.log(
            "ini task id=>",
            this.task.id,
            "inicategoryId=>",
            result.value.category
          );
          return axios({
            method: "PUT",
            url: `${this.baseUrl}/task/${this.task.id}`,
            data: {
              title: result.value.title,
              description: result.value.description,
              CategoryId: result.value.category,
            },
            headers: {
              token: localStorage.access_token,
            },
          });
        })
        .then((output) => {
          console.log(output);
          return Swal.fire({
            icon: "success",
            title: `edit data successs`,
          });
        })
        .then((response) => {
          this.$emit("emitFetchDataCategory");
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops....",
            text: `${err.response.data.errors}`,
          });
        });
    },
  },
};
</script>

<style>
#button_icon {
  color: black;
}
</style>