import url from "../api/url";

export const state = () => ({
  user: null,
  locales: ["ru", "uz", "en"],
  locale: "ru",
  header: null,
  footer: null,
  calc: null,
  document: null,
  payment: "",
  order_id: "",
  doc_id: "",
  URL: url,
  modal: false
});

export const mutations = {
  setToken(state, user) {
    state.user = user;
  },
  clearToken(state) {
    state.user = null;
  },
  setNavbar(state, { header, footer }) {
    state.header = header;
    state.footer = footer;
  },
  calc(state, val) {
    state.calc = val;
  },
  clearCalc(state) {
    state.calc = null;
  },
  setDocument(state, val) {
    state.document = val;
  },
  setPayment(state, val) {
    state.payment = val;
  },
  setOrder(state, val) {
    state.order_id = val;
  },
  setDocId(state, val) {
    state.doc_id = val;
  },
  showModal(state, val) {
    state.modal = val;
  }
};

export const actions = {
  async login({ commit }, user) {
    const token = await this.$axios.post(
      "https://api.msk-ishonch.uz/user/login",
      user
    );
    commit("setToken", token.data.user);
    return token.data.user;
  },
  async register({ commit }, user) {
    const token = await this.$axios.post(
      "https://api.msk-ishonch.uz/user/signup",
      user
    );
    commit("setToken", token.data.user);
    return token.data.user;
  },
  logout({ commit }) {
    commit("clearToken");
  },
  navbar({ commit }, navbar) {
    commit("setNavbar", navbar);
  }
};

export const getters = {
  hasUser: s => {
    if (process.browser) {
      return window.localStorage.getItem("user");
    }
    return !!s.user;
  },
  user: s => s.user,
  locale: s => s.locale,
  locales: s => s.locales,
  header: s => s.header,
  footer: s => s.footer,
  calc: s => s.calc,
  document: s => s.document,
  payment: s => s.payment,
  order_id: s => s.order_id,
  doc_id: s => s.doc_id,
  URL: s => s.URL,
  modal: s => s.modal
};
