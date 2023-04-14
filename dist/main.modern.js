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

export { include };
//# sourceMappingURL=main.modern.js.map
