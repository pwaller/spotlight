define([
  'extensions/controllers/module',
  'common/views/visualisations/user-satisfaction',
  'common/collections/list'
],
function (ModuleController, UserSatisfactionView, ListCollection) {
  var UserSatisfactionModule = ModuleController.extend({
    className: function () {
      var classes = this.model.get('classes');

      return ['user_satisfaction'].concat(classes || []).join(' ');
    },
    visualisationClass: UserSatisfactionView,
    collectionClass: ListCollection,
    clientRenderOnInit: true,
    collectionOptions: function () {
      return {
        id: 'user_satisfaction',
        title: 'User satisfaction',
        sortBy: '_timestamp:ascending',
        limit: 0,
        valueAttr: this.model.get('value-attribute')
      };
    }
  });

  return UserSatisfactionModule;
});
