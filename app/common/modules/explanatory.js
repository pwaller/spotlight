define([
  'extensions/controllers/module',
  'common/views/explanation'
],
function (ModuleController, ExplanationView) {
  var ExplanatoryModule = ModuleController.extend({
    className: 'explanation',
    visualisationClass: ExplanationView,
    clientRenderOnInit: false
  });

  return ExplanatoryModule;
});
