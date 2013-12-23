define([
  'tpl!common/templates/visualisations/uk_map.html',
  'extensions/views/view',
  'common/views/visualisations/uk_map'
],
function (template, View, UkMap) {
  //possible unecessary intermediary
  var CategoriesView = View.extend({
    template: template,

    views: function () {
      return {
        '.uk-map': { view: UkMap }
      };
    }
  });

  return CategoriesView;
});
