import { createStore } from 'vuex';
const config = require('../config/config.js');
export default createStore({
  state: {
    config: config
  },
  getters: {
    getDexAbi (state) {
      return state.config.dexAbi;
    },
    getNftAbi (state) {
      return state.config.nftAbi;
    },
    getNftAddress (state) {
      return state.config.nftAddress;
    },
    getMarketplaceAddress (state) {
      return state.config.marketplaceAddress;
    }
  },
  mutations: {
  },
  actions: {
  }
});