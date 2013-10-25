define([
  'extensions/views/view',
  'common/views/header',
  'common/views/visualisation',
  'stache!common/templates/module'
],
function (View, HeaderView, VisualisationView, template) {
  var ModuleView = View.extend({
    template: template,

    render: function () {
      var context = this.templateContext();
      var visualisation = this.visualisation = new VisualisationView({
        module_type: this['module-type'],
        data_group: this['module-group'],
        data_type: this['module-type']
      });
      visualisation.once('postrender', function () {
        context.visualisation = this.visualisation.$el.html();
        this.html = this.template(context);
        this.trigger('postrender');
      }, this);
      visualisation.render();
    },

    templateContext: function () {
      return View.prototype.templateContext.apply(this, arguments);
    }
  });

  return ModuleView;
});
