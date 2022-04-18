<template>
    <div>
        <NftComponent 
        v-for="nft in nfts"
        :key="nft.tokenId" 
        :price="nft.price"
        :image="nft.image"
        />
    </div>
</template>

<script>
import NftComponent from '../components/NftComponent.vue';
// import dexAbi from '../utils/dexAbi.json';
// import nftAbi from '../utils/nftAbi.json';
//const Web3 = require("web3");

export default {
    data() {
        return {
            nfts: []
        }
    },
    components: {
        NftComponent
    },
}
</script>