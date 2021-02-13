<template>
  <div
    class="card bg-info mr-5 mt-3 d-flex flex-column justify-content-between align-items-center"
  >
    <div class="d-flex flex-row justify-content-xxl-between align-item-center">
      <div class="text-white px-4">
        <h2>
          {{ category.title }}
        </h2>
      </div>
      <hr />
      <div>
        <a
          href="#"
          @click.prevent="deleteCategory(category.id)"
          class="btn btn-danger"
          >x</a
        >
      </div>
    </div>
    <div style="overflow: auto; height: 600px">
      <Task
        v-for="task in category.Tasks"
        :key="task.id"
        :task="task"
        :baseUrl="baseUrl"
        :allCategory="allCategory"
        @emitFetchDataCategory="fetchDataCategory"
        @emitDeleteTask="deleteTask"
      >
      </Task>
    </div>
    <a
      href="#"
      @click.prevent="addTask()"
      class="btn btn-success d-flex align-item-center mb-2 mt-3"
      >Add Task</a
    >
  </div>
</template>

<script>
import Task from "../components/Task";
import Navbar from "../components/navbar"
import axios from "axios";
export default {
  props: ["category", "baseUrl", "allCategory"],
  data() {
    return {
      tasks: [],
    };
  },
  components: {
    Task,
  },
  methods: {
    
    deleteCategory(value) {
      console.log(value);
      this.$emit("emitDelCategory", Number(value));
    },
    addTask() {
      Swal.fire({
        title: "Add Task",
        html: `<input type="text" id="title_task" class="swal2-input" placeholder="title">
  <input type="text-area" id="description_task" class="swal2-input" placeholder="description">`,
        confirmButtonText: "New Task",
        focusConfirm: false,
        preConfirm: () => {
          const title = Swal.getPopup().querySelector("#title_task").value;
          const description = Swal.getPopup().querySelector("#description_task")
            .value;
          if (!title || !description) {
            Swal.showValidationMessage(`Please enter title and description`);
          }
          console.log(title, description);
          return { title: title, description: description };
        },
      })
        .then((result) => {
          console.log(this.baseUrl);
          axios({
            method: "POST",
            url: `${this.baseUrl}/task`,
            data: {
              title: result.value.title,
              description: result.value.description,
              CategoryId: this.category.id,
            },
            headers: {
              token: localStorage.access_token,
            },
          });
          return { message: "Successfuly Add Task" };
        })
        .then((output) => {
          return Swal.fire({
            icon: "success",
            title: `${output.message}`,
          });
        })
        .then((response) => {
          this.$emit("emitFetchCategory");
        })
        .catch((err) => {
          debugger;
          console.log(err);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data.errors}`,
          });
        });
    },
    fetchDataCategory() {
      this.$emit("fetchDataCategory");
    },
    deleteTask() {
      this.$emit("deleteTaskInCategory");
    },
  },
};
</script>

<style>
</style>