define([
  'extensions/controllers/module',
  'common/collections/journey',
  'common/views/visualisations/conversion-graph/conversion-graph',
  'common/views/visualisations/matrix_point_in_time_table'
],
function (ModuleController, JourneyCollection, ConversionGraph, TableView) {
  var JourneyModule = ModuleController.extend({
    className: 'journey',
    visualisationClass: ConversionGraph,
    collectionClass: JourneyCollection,
    clientRenderOnInit: true,
    requiresSvg: true,
    tableClass: TableView, 

    collectionOptions: function () {
      return {
        steps: this.model.get('steps'),
        matchingAttribute: this.model.get('matching-attribute')
      };
    }
  });

  return JourneyModule;
});
