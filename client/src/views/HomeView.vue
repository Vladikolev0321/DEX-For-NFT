<template>
    <div>
        <NftComponent 
        v-for="nft in nfts"
        :key="nft.tokenId" 
        :price="nft.price"
        :image="nft.image"
        :tokenId="nft.tokenId"
        />
    </div>
</template>

<script>
import NftComponent from '../components/NftComponent.vue';
import dexAbi from '../utils/dexAbi.json';
import nftAbi from '../utils/nftAbi.json';
const Web3 = require("web3");

export default {
    data() {
        return {
            nfts: []
        }
    },
    components: {
        NftComponent
    },
    beforeMount() {
        this.getNfts();
    },
    methods: {
        async getNfts() {
            console.log("getting nfts");
            let web3 = new Web3(window.ethereum);
            let marketplace = new web3.eth.Contract(dexAbi, "0x8Ac556773AEAE39D29E618B9Dc9C9b3b04d27451");
            let nft = new web3.eth.Contract(nftAbi, "0xb904A7D08a6C3Ba86Fa4860e86F698aC6fdf3396");
            let nftsCount = await marketplace.methods.listingCount().call();
            console.log(nftsCount);
            
            let nftData = [];
            for (let i = 1; i <= nftsCount; i++) {
                const item = await marketplace.methods.getListing(i).call();
                if (item.status == "0") {
                    // get uri url from nft contract
                    const uri = await nft.methods.tokenURI(item.tokenId).call()
                    console.log(uri);
                    let nftPrice = item.price;
                    let nftImage = await nft.methods.tokenURI(item.tokenId).call();
                    nftData.push({
                        tokenId: item.tokenId,
                        price: nftPrice,
                        image: nftImage
                    });
            }
            }
            this.nfts = nftData;
        }
    },
}
</script>