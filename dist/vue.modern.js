function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

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

const _excluded = ["data", "mounted"];
const component = (file, params = {}) => {
  const {
      data = {},
      mounted
    } = params,
    rest = _objectWithoutPropertiesLoose(params, _excluded);
  return _extends({
    data() {
      return _extends({
        html: ''
      }, typeof data === 'function' ? data() : data);
    },
    async mounted() {
      this.html = await include(file, this.$data);
      mounted == null ? void 0 : mounted();
    },
    template: '<div v-html="html" />'
  }, rest);
};

export { component, include };
//# sourceMappingURL=vue.modern.js.map
