<template>
    <div class="nft-container">
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
/* eslint-disable */

import dexAbi from '../utils/dexAbi.json';
import nftAbi from '../utils/nftAbi.json';

const dexAddress = '0xfAcF0b24B5c243dA2d3F67F5bcDf4fD856284079';
const nftAddress = '0x700a44b03F702EF397Ac2e58C6320044b7dF3171';

const Web3 = require('web3');

export default {
  data() {
    return {
      nfts: [],
    };
  },
  components: {
    NftComponent,
  },
  beforeMount() {
    this.getNfts();
  },
  methods: {
    async getNfts() {
      const web3 = new Web3(window.ethereum);
      const marketplace = new web3.eth.Contract(
        dexAbi,
        dexAddress,
      );
      const nft = new web3.eth.Contract(
        nftAbi,
        nftAddress,
      );
      const nftsCount = await marketplace.methods.listingCount().call();
      console.log(nftsCount);

      const nftData = [];
      for (let i = 1; i <= nftsCount; i++) {
        const item = await marketplace.methods.getListing(i).call();
        if (item.status === '0') {
          const nftPrice = item.price;
          const nftImage = await nft.methods.tokenURI(item.tokenId).call();
          console.log(nftImage)
          nftData.push({
            tokenId: item.tokenId,
            price: nftPrice,
            image: nftImage,
          });
        }
      }
      this.nfts = nftData;
    },
  },
};
</script>

<style scoped>
.nft-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
</style>
