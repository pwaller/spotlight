define([
  'extensions/views/view',
  'common/views/header',
  'stache!common/templates/module',
  'module_map'
],
function (View, HeaderView, template, ModuleMap) {
  var ModuleView = View.extend({
    template: template,

    modules: ModuleMap,

    views: {
      header: HeaderView
    },

    render: function (options) {
      var context = this.templateContext();
      var visualisation = this.visualisation = this.module();
      visualisation.once('postrender', function () {
        context.visualisation = this.visualisation.html();
        this.the_html = this.template(context);
        this.trigger('postrender');
      }, this);
      visualisation.render();
    },

    html: function () {
      return this.the_html;
    },

    module: function() {
      moduleClass = this.modules[this.model.get('module-type')];
      return new moduleClass({
        serviceName: this.model.get('data-group'),
        dataType: this.model.get('data-type') // data-type could be an array
      });
    },

    templateContext: function () {
      return View.prototype.templateContext.apply(this, arguments);
    }
  });

  return ModuleView;
});
