define([
  'extensions/views/view',
  'common/views/header',
  'common/views/visualisation',
  'stache!common/templates/module'
],
function (View, HeaderView, VisualisationView, template) {
  var ModuleView = View.extend({
    template: template,

    views: {
      header: HeaderView,
      visualisation: VisualisationView
    }
  });

  return ModuleView;
});
