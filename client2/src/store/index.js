/* eslint-disable */
import { createStore } from 'vuex';

const config = addresses;
import dexAbi from '../utils/dexAbi.json';
import nftAbi from '../utils/nftAbi.json';

export default createStore({
  state: {
    config: config,
  },
  getters: {
    getDexAbi(state) {;
      return dexAbi;
    },
    getNftAbi(state) {
      return nftAbi;
    },
    getNftAddress() {
      return "0x700a44b03F702EF397Ac2e58C6320044b7dF3171";
    },
    getMarketplaceAddress(state) {
      return "0xfAcF0b24B5c243dA2d3F67F5bcDf4fD856284079";
    },
  },
  mutations: {
  },
  actions: {
  },
});
