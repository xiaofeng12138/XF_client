import { getUsername  } from "@/utils/cookies";
const state = {
    collapse: JSON.parse(sessionStorage.getItem('collapse')) || false,
    token: "",
    username: "" || getUsername()
}
const getters = {}
const mutations = {
    SET_COLLAPSE(state){
        state.collapse = !state.collapse;
        sessionStorage.setItem('collapse', String(state.collapse))
    },
    SET_TOKEN(state, value){
        state.token = value;
    },
    SET_USERNAME(state, value){
        state.username = value;
    }
}
const actions = {
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
