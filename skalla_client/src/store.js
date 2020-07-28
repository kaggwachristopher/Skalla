import Vue from "vue";
import Vuex, { Store } from "vuex";
import Axios from "axios";
import createPersistedState from "vuex-persistedstate";


Vue.use(Vuex);

const getDefaultState = () => {
  return {
    token: "",
    user: {},
    estimateTotals: {
      developerEstimate:{sum:0,adjustedSum:0},
      pmEstimate:{sum:0,adjustedSum:0},
      consultantEstimate:{sum:0,adjustedSum:0},
      totalHours:{totalSum:0,adjustedTotal:0},
      totalAmount:{totalSum:0,adjustedTotal:0}
    }
  };
};
export default new Vuex.Store({
  strict: true,
  //intergrating vuex-persistedstate to get data even after reloading the page
  plugins: [createPersistedState()],
  state: getDefaultState(),
  getters: {
    isLoggedIn: state => {
      return state.token;
    },
    getUser: state => {
      return state.user;
    },
    getEstimateTotals: state => {
      return state.estimateTotals
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USER: (state, user) => {
      state.user = user;
    },
    SET_DEV_TOTALS: (state,value) =>{
      state.estimateTotals.developerEstimate.sum = value.sum;
      state.estimateTotals.developerEstimate.adjustedSum = value.adjustedSum
    },
    SET_PM_TOTALS:(state, totals) =>{
      state.estimateTotals.pmEstimate = totals
    },
    SET_CONSULTANT_TOTALS:(state, totals) =>{
      state.estimateTotals.consultantEstimate = totals
    },
    RESET: state => {
      Object.assign(state, getDefaultState);
    },
    RESET_TOTALS: state => {
      state.estimateTotals =  {
        developerEstimate:{sum:0,adjustedSum:0},
        pmEstimate:{sum:0,adjustedSum:0},
        consultantEstimate:{sum:0,adjustedSum:0},
        totalHours:{totalSum:0,adjustedTotal:0},
        totalAmount:{totalSum:0,adjustedTotal:0}
      }
    },
    ADD_TOTALS: state => {
      state.estimateTotals.totalHours.totalSum = state.estimateTotals.developerEstimate.sum+state.estimateTotals.pmEstimate.sum+state.estimateTotals.consultantEstimate.sum;
      state.estimateTotals.totalHours.adjustedTotal = state.estimateTotals.developerEstimate.adjustedSum+state.estimateTotals.pmEstimate.adjustedSum+state.estimateTotals.consultantEstimate.adjustedSum;
      const hourlyRate = 40;
      state.estimateTotals.totalAmount.totalSum = hourlyRate*state.estimateTotals.totalHours.totalSum;
      state.estimateTotals.totalAmount.adjustedTotal = hourlyRate*state.estimateTotals.totalHours.adjustedTotal;
    }
  },
  // creating login and logout actions
  actions: {
    login: ({ commit }, { token, user }) => {
      commit("SET_TOKEN", token);
      commit("SET_USER", user);

      //setting Auth header
      Axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    },
    logout: ({ commit }) => {
      commit("RESET", "");
    },
    setDevTotal: ({ commit },value) => {
      commit("SET_DEV_TOTALS",value);
      commit("ADD_TOTALS")
    },
    setPmTotal:({ commit },totals) => {
      commit("SET_PM_TOTALS",totals)
      commit("ADD_TOTALS")
    },
    setConsultantTotal:({ commit },totals) => {
      commit("SET_CONSULTANT_TOTALS",totals)
      commit("ADD_TOTALS")
    },
    resetTotals: ({commit})=>{
      commit("RESET_TOTALS","")
    }
  },
});