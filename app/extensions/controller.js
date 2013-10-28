define([
  'backbone',
  'underscore'
], function (backbone, _) {

  var Controller = function () {
  };

  _.extend(Controller.prototype, backbone.Events);

  Controller.extend = backbone.Model.extend;

  return Controller;

});
