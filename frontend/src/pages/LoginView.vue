<template>
  <div class="card m-auto" style="width: 400px">
    <div class="card-body">
      <form>
        <div class="mb-3 text-center">
          <h2>Login</h2>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            v-model="user.email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            v-model="user.password"
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
import  {useApi, API_STATUS } from "../services/apiService";
import { userLogin } from "../apis/UserApi";
import { useAuthStore } from "../services/authService";

const user = ref({
  email: "",
  password: "",
});
const AuthStore = useAuthStore();
const userApi = useApi(userLogin);

const login = async () => {
  await userApi.call(user);
  if (userApi.status.value === API_STATUS.SUCCESS) {
    let token = userApi.response.value?.data || null;
    AuthStore.storeAuth(token);
  }
};
</script>

<style>
</style>