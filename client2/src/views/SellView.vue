<template>
  <UploadComponent @export-data="getData" :message="'Upload'" />
</template>

<script>
import UploadComponent from '../components/UploadNft.vue';
import dexAbi from '../utils/dexAbi.json';
import nftAbi from '../utils/nftAbi.json';

const dexAddress = '0xfAcF0b24B5c243dA2d3F67F5bcDf4fD856284079';
const nftAddress = '0x700a44b03F702EF397Ac2e58C6320044b7dF3171';

const Web3 = require('web3');
const ethers = require('ethers');
/* eslint-disable */
export default {
  components: {
    UploadComponent,
  },
  methods: {
    async getData(formData) {
      await this.setUpNft(formData);
    },
    async setUpNft(formData) {
      const web3 = new Web3(window.ethereum);
      const marketplace = new web3.eth.Contract(
        dexAbi,
        dexAddress,
      );
      const nft = new web3.eth.Contract(
        nftAbi,
        nftAddress,
      );

      // get current account
      const accounts = await web3.eth.getAccounts();
      // get tokenId of new nft
      const id = await formData.tokenId;
      // approve marketplace to spend nft
      // VERY SUSPICIOUS
      await nft.methods
        .setApprovalForAll(this.$store.getters.getMarketplaceAddress, true)
        .send({ from: accounts[0] });
      // add nft to marketplace
      const listingPrice = ethers.utils.parseEther(formData.price.toString());
      await marketplace.methods
        .listToken(this.$store.getters.getNftAddress, id, listingPrice)
        .send({ from: accounts[0] });
    },
  },
};
</script>
