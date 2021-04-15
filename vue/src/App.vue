<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/" class="nav_item">Home</router-link>
      <router-link to="/datatable" class="nav_item">DataTable</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style>
* {
    box-sizing: border-box;
}
body {
    margin : 0px;
}

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

.nav_item {
  border : solid 1px #bbb;
  padding: 10px;
}

/* #nav {
  padding: 20px; 
  border : solid 1px #aaa;
} */

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
