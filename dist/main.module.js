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
const story = (file, data = {}, params = {}) => ({
  data() {
    return {
      html: ''
    };
  },
  async mounted() {
    this.html = await include(file, data);
  },
  template: '<div v-html="html" />',
  ...params
});

export { include, story };
//# sourceMappingURL=main.module.js.map
