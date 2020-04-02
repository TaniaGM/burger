// The API object contains methods for each kind of request we'll make
export default {
  saveBurger: function(burger) {
    return fetch("/api/burgers", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(burger)
    }).then(res => res.json());
  },
  getBurgers: function() {
    return fetch("/api/burgers").then(res => res.json());
  },
  // getExample: function(id) {
  //   return fetch(`/api/examples/${id}`).then(res => res.json());
  // },
  devourBurger: function(id) {
    return fetch("/api/burgers/" + id, {
      method: "PUT"
    }).then(res => res.json);
  },
  deleteBurger: function(id) {
    return fetch("/api/burgers/" + id, {
      method: "DELETE"
    }).then(res => res.json);
  }
};