define([
  'extensions/views/view',
  'stache!common/templates/visualisation'
],
function (View, template) {
  var VisualisationView = View.extend({
    template: template
  });

  return VisualisationView;
});
