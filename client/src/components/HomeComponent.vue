<template>
  <div>
    <button id="show-modal" @click="showModalValue = true">Show Modal</button>
    <Teleport to="body">
      <Modal :show="showModal" @close="showModalValue = false" @ok="listItem">
        <template #header>
          <h3>Header</h3>
        </template>
      </Modal>
    </Teleport>
  </div>
</template>

<script>
const Web3 = require("web3");
import Modal from './ModalComponent.vue'
import dexAbi from '../utils/dexAbi.json'
//import { nftAbi } from '../utils/nftAbi.json'

export default {
  components: {
    Modal
  },
  computed: {
    showModal() {
      return this.showModalValue
    }
  },
  data() {
    return {
      accounts: null,
      showModalValue: false,
      
    }
  },
  created() {
    this.ethEnabled();
  },
  methods: {
    async listItem() {

      
      this.contract = new this.web3.eth.Contract(dexAbi, '0x8Ac556773AEAE39D29E618B9Dc9C9b3b04d27451');
      // access contract method from account
      this.contract.methods.getBalance().call({from: this.accounts[0]}).then(balance => {
        console.log(balance);
      });




    }
  }
}
</script>

<style scoped>

</style>
