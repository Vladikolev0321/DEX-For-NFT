<template>
  <div class="navigation">
    <nav class="nav justify-content-center">
      <router-link class="nav-link" to="/home">Home</router-link>
      <router-link class="nav-link" to="/sell">Sell</router-link>
      <router-link class="nav-link" to="/nfts">MyNfts</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<style >
.navigation {
  flex-direction: row;
}
nav.nav.justify-content-center {
  display: inline-flex;
  margin-top: 1ch;
}
nav.nav.justify-content-center a {
  font-weight: bold;
  font-size: larger;
  color: black;
}
nav.nav.justify-content-center a.active.router-link-exact-active.nav-link {
  text-decoration-thickness: 4px;
  text-decoration-line: underline;
  display: flex;
  justify-content: center;
}
div .d-grid.gap-2.d-md-flex.justify-content-md-end{
  display: inline-block!important;
  position: absolute;
  margin-left: 50px;
}
div .d-grid.gap-2.d-md-flex.justify-content-md-end .btn.btn-dark.btn-lg {
  height: 4vh;
  width: 13vh;
  background-color: rgb(0, 0, 0);
  border-width: 2px;
  border-radius: 70px;
  text-align: center;
  font-weight: 700;
  line-height: normal;
  margin-left: 0;
  margin-right: 0;
  margin-top: 1.1ch;
}
</style>
