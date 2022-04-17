<template>
  <div>
    
  </div>
</template>

<script>
const Web3 = require("web3");

export default {
  components: {
    
  },
  data() {
    return {
      accounts: null,
      
    }
  },
  created() {
    this.ethEnabled();
  },
  methods: {
    // connect with metamask
    connectMetamask() {
      // connect to metamask
      window.ethereum.enable().then(() => {
        // connect to web3
        this.web3 = new Web3(window.ethereum);
        // connect to contract
        this.contract = new this.web3.eth.Contract(this.contractABI, this.contractAddress);
        // connect to account
        this.account = this.web3.eth.accounts.privateKeyToAccount(this.privateKey);
        // connect to contract
        this.contract.methods.getBalance().call({from: this.account.address}).then(balance => {
          console.log(balance);
        });
      }).catch(error => {
        console.log(error);
      });

    },
    async ethEnabled() {
      if (window.ethereum) {
          await window.ethereum.request({method: 'eth_requestAccounts'});
          this.web3 = new Web3(window.ethereum);
          this.accounts = await this.web3.eth.getAccounts();
          // console.log(this.accounts[0].getBalance());
          // get user account balance
          this.web3.eth.getBalance(this.accounts[0]).then(balance => {
            console.log(balance);
          });
          return true;
        }
        return false;
    }
  }
}
</script>

<style scoped>

</style>
