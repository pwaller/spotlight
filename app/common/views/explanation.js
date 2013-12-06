define([
  'extensions/views/view',
  'stache!common/templates/explanation'
],
function (View, template) {
  var ExplanationView = View.extend({

    //half width, raw
    template: template,

    templateContext: function () {
      return this.model.toJSON();
    }
    
  });
  return ExplanationView;
});
