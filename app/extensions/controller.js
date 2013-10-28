define([
  'backbone',
  'underscore'
], function (backbone, _) {

  var Controller = backbone.Model.extend({
    initialize: function (options) {
      _.extend(this, options);
      backbone.Model.prototype.initialize.apply(this, arguments);
    },
  });

  _.extend(Controller.prototype, backbone.Events);

  return Controller;

});
