<template>
  <div>
    <DialogComponent @close="close" :show="isActive" :heading="getMessage" />
    <div class="card">
      <img class="card-img-top" :src="image" alt="Card image cap" />
      <div class="card-body">
        <p class="card-text text-right"> Price: {{ price }}</p>
        <button-component @click="buyNft" message="Buy"></button-component>
      </div>
    </div>
    <div>
      <Teleport to="body">
        <Modal :show="showModal" @close="showModalValue = false" @ok="listItem">
          <template #header>
            <h3>Buy Nft</h3>
          </template>
        </Modal>
      </Teleport>
    </div>
  </div>
</template>

<script>
import DialogComponent from './DialogComponent.vue';
import dexAbi from '../utils/dexAbi.json';

const dexAddress = '0xfAcF0b24B5c243dA2d3F67F5bcDf4fD856284079';

const Web3 = require('web3');

export default {
  data() {
    return {
      show: false,
      message: '',
      showModalValue: false,
    };
  },
  props: {
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    tokenId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    isActive() {
      return this.show;
    },
    getMessage() {
      return this.message;
    },
    showModal() {
      return this.showModal;
    },
  },
  methods: {
    async buyNft() {
      const web3 = new Web3(window.ethereum);
      const marketplace = new web3.eth.Contract(
        dexAbi,
        dexAddress,
      );
      const accounts = await web3.eth.getAccounts();

      const currentAccount = accounts[0];
      console.log(currentAccount);
      const balance = await web3.eth.getBalance(currentAccount);
      console.log(balance);
      // the check doesn't work
      const userBalance = balance / 10 ** 18;
      const neededBalance = this.price / 10 ** 18;
      if (userBalance < neededBalance) {
        this.message = "You don't have enough ethereum to buy this nft!";
        this.show = true;
        return;
      }
      await marketplace.methods
        .buyToken(this.tokenId)
        .send({ from: currentAccount, value: this.price });
    },
    close() {
      this.show = false;
    },
  },
  components: { DialogComponent },
};
</script>

<style scoped>
.card-img-top {
  height: 25vh;
  width: 20vw;
}
.card {
  width: 20vw;;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 20px;
  border: 1px solid black;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}
</style>
