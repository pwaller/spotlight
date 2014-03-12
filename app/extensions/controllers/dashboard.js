define([
  'extensions/controllers/controller',
  'common/views/dashboard',
  'extensions/models/model'
], function (Controller, DashboardView, Model) {

  var DashboardController = Controller.extend({

    viewClass: DashboardView,

    initialize: function () {
      this.modules = this.model.get('modules') || [];
      this.remaining = this.modules.length;
      this.moduleInstances = [];
    },

    viewOptions: function () {
      return {
        moduleInstances: this.moduleInstances
      };
    },

    render: function (options) {
      options = options || {};

      if (this.remaining === 0) {
        Controller.prototype.render.call(this, options);
        return;
      }

      _.each(this.modules, function (definition) {
        var model = new Model(definition);
        model.set('parent', this.model);

        var module = new definition.controller({
          model: model,
          dashboard: true,
          url: this.url
        });

        this.moduleInstances.push(module);

        module.once('ready', _.bind(function () {
          this.remaining = this.remaining - 1;

          if (this.remaining === 0) {
            Controller.prototype.render.call(this, options);
          }
        }, this));

        module.render({ init: options.init });
      }, this);
    }
  });

  return DashboardController;

});
