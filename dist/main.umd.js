(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.vitePluginSmarty = {}));
})(this, (function (exports) {
    const include = (file, data = {}) => {
      return fetch(`http://localhost:${undefined.VITE_PLUGIN_SMARTY_SERVER_PORT || 2222}`, {
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

    exports.include = include;

}));
//# sourceMappingURL=main.umd.js.map
