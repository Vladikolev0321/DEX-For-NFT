<template>
    <div>
        <DialogComponent @close="close" :show="isActive" :heading="getMessage"/>
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="" alt="Card image cap">
            <div class="card-body">
                <p class="card-text text-right">{{ price }}</p>
                <!-- <button-component @click="showModalValue = true" message="Buy"></button-component> -->
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
const Web3 = require("web3");
export default {
    data() {
        return {
            show: false,
            message: "",
            showModalValue: false
        };
    },
    props: {
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        tokenId: {
            type: Number,
            required: true
        }
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
        }
    },
    methods: {
        async buyNft() {
            let web3 = new Web3(window.ethereum);
            let marketplace = new web3.eth.Contract(dexAbi, "0x8Ac556773AEAE39D29E618B9Dc9C9b3b04d27451");
            let accounts = await web3.eth.getAccounts();

            let currentAccount = accounts[0];
            console.log(currentAccount);
            let balance = await web3.eth.getBalance(currentAccount);
            console.log(balance);
            // the check doesn't work
            if (balance < this.price) {
                this.message = "You don't have enough ethereum to buy this nft!";
                this.show = true;
                return;
            }
            console.log(this.tokenId)
            console.log(this.price)
            await marketplace.methods.buyToken(this.tokenId).send({ from: currentAccount, value: this.price });
        },
        close() {
            this.show = false;
        }
    },
    components: { DialogComponent }
}
</script>