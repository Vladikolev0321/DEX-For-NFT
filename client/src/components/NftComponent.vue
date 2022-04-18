<template>
    <div>
        <DialogComponent @close="close" :show="isActive" :heading="getMessage"/>
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="" alt="Card image cap">
            <div class="card-body">
                <p class="card-text text-right">{{ price }}</p>
                <button-component @click="showModalValue = true" message="Buy"></button-component>
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
    dsata() {
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
    nethods: {
        async buyNft() {
            let web3 = new Web3(window.ethereum);
            let marketplace = new web3.eth.Contract(dexAbi, "0xfAcF0b24B5c243dA2d3F67F5bcDf4fD856284079");
            let currentAccount = await this.web3.eth.getAccounts()[0];
            if (currentAccount.getBalance() < this.price * 10 ** 18) {
                this.message = "You don't have enough ethereunm to buy this nft!";
                this.show = true;
                return;
            }
            await marketplace.buyToken(this.tokenId).send({ from: currentAccount });
        },
        close() {
            this.show = false;
        }
    },
    components: { DialogComponent }
}
</script>