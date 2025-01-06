<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from "@/store";

const store = useStore();
const router = useRouter();

const user = ref("");
const pw = ref("");
const message = ref("");

//console.log(user.username, user.password)

async function submit(){
    let response = await fetch("https://eoin1o6hx1.execute-api.us-east-1.amazonaws.com/default/user_login",
        {
            method : "POST",
            body : JSON.stringify({"username" : user, "password" : pw}),
            headers : {
                "Content-type" : "application/json; charset=UTF-8"
            }
        }
    );

    console.log(await response.json())

    if (response.status === 200) {
        store.userDetails = {
            "username" : username,
            "auth" : true
        }
    } 

    
}

</script>

<template>
<!--HTML layout by ChatGPT-->
  <div
    class="container vh-100 d-flex justify-content-center align-items-center"
  >
    <div class="card shadow-sm" style="width: 100%; max-width: 400px">
      <div class="card-body">
        <h3 class="card-title text-center mb-4">Login</h3>
        <form @submit.prevent = "submit">
          <div class="mb-3">
            <div class = "invalid-feedback">{{message}}</div>
            <label for="username" class="form-label">Username:</label>
            <input
              type="text"
              class="form-control"
              id="username"
              placeholder="Enter your username"
              v-model = "username"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password:</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Enter your password"
              v-model = "password"
            />
          </div>
          <button type="submit" class="btn btn-primary btn-lg w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
