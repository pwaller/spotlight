define(function (require) {
  var Requester = {

    get: function(path, callback) {
      return request("http://localhost:3000" + path, callback);
    },

    post: function(path, body, callback) {
      return request.post({
        url: "http://localhost:3000" + path,
        body: body
      }, callback);
    }

  }

  return Requester;
});
