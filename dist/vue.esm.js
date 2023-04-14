const include = (file, data = {}) => {
  return fetch(`http://localhost:${import.meta.env.VITE_PLUGIN_SMARTY_SERVER_PORT || 2222}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      file,
      data
    })
  }).then(res => res.text());
};

const component = (file, params = {}) => {
  const {
    data = {},
    mounted,
    ...rest
  } = params;
  return {
    data() {
      return {
        html: '',
        ...(typeof data === 'function' ? data() : data)
      };
    },
    async mounted() {
      this.html = await include(file, this.$data);
      mounted == null ? void 0 : mounted();
    },
    template: '<div v-html="html" />',
    ...rest
  };
};

export { component, include };
//# sourceMappingURL=vue.esm.js.map
