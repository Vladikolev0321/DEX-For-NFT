<template>
  <div>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
    <NavBar></NavBar>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';

const Web3 = require('web3');

export default {
  name: 'App',
  components: {
    NavBar,
  },
  created() {
    this.ethEnabled();
  },
  methods: {
    async ethEnabled() {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        this.web3 = new Web3(window.ethereum);
        this.accounts = await this.web3.eth.getAccounts();
        // console.log(this.accounts[0].getBalance());
        // get user account balance
        this.web3.eth.getBalance(this.accounts[0]).then((balance) => {
          console.log(balance);
        });
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
