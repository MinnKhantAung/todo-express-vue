<template>
  <div class="card m-auto" style="width: 400px">
    <div class="card-body">
      <form>
        <div class="mb-3 text-center">
          <h2>Register</h2>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Name</label>
          <input
            v-model="user.name"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useApi, API_STATUS } from "../services/apiService";
import { userRegister } from "../apis/UserApi";
import { useAuthStore } from "../services/authService";

const user = ref({
  name: "",
  email: "",
  password: "",
});
const AuthStore = useAuthStore();
const userApi = useApi(userRegister);

const register = async () => {
  await userApi.call(user);
  if (userApi.status.value === API_STATUS.SUCCESS) {
    console.log(userApi.response.value?.data);
  }
};
</script>


<style>
</style>