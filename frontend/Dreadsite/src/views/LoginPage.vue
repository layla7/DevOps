<template>
<!--HTML layout by ChatGPT-->
  <div
    class="container vh-100 d-flex justify-content-center align-items-center"
  >
    <div class="card shadow-sm" style="width: 100%; max-width: 400px">
      <div class="card-body">
        <h3 class="card-title text-center mb-4">Login</h3>
        <form>
          <div class="mb-3">
            <label for="username" class="form-label">Username:</label>
            <input
              type="text"
              class="form-control"
              id="username"
              placeholder="Enter your username"
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password:</label>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Enter your password"
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
