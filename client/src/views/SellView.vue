<template>
    <UploadComponent @export-data="getData" :message="'Upload'"/>
</template>

<script>
import UploadComponent from '../components/UploadNft.vue';
import dexAbi from '../utils/dexAbi.json';
import nftAbi from '../utils/nftAbi.json';
const Web3 = require("web3");
const ethers = require('ethers');
export default {
    components: {
        UploadComponent
    },
    methods: {
        async getData(formData) {
            await this.setUpNft(formData);
        },
        async setUpNft(formData) {
            console.log(formData)
            let web3 = new Web3(window.ethereum);
            let marketplace = new web3.eth.Contract(dexAbi, "0xfAcF0b24B5c243dA2d3F67F5bcDf4fD856284079");
            let nft = new web3.eth.Contract(nftAbi, "0x700a44b03F702EF397Ac2e58C6320044b7dF3171");
            // get tokenId of new nft 
            const id = await formData.tokenId;
            // approve marketplace to spend nft
            // VERY SUSPICIOUS
            await nft.methods.setApprovalForAll("0xfAcF0b24B5c243dA2d3F67F5bcDf4fD856284079", true).send({from: formData.address});
            // add nft to marketplace
            const listingPrice = ethers.utils.parseEther(formData.price.toString());
            await marketplace.methods.listToken("0x700a44b03F702EF397Ac2e58C6320044b7dF3171", id, listingPrice).send({from: formData.address});
        }
    }
}
</script>