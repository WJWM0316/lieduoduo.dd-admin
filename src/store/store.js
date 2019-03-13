import Vue from 'vue';
import Vuex from 'vuex';

//import { saveAccessToken, removeAccessToken, getAccessToken, getUserInfo, saveUserInfo } from 'API/cacheService'
//import {
//loginApi,
//logoutApi
//} from 'API/auth'
import userInfo from './userInfo/index.js'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userInfo
  }
})
