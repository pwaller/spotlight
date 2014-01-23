define([
  'extensions/controllers/module',
  'common/views/visualisations/availability',
  'common/collections/availability'
],
function (ModuleController, AvailabilityView, AvailabilityCollection) {
  var AvailabilityModule = ModuleController.extend({
    className: 'availability',
    tableClassName: 'availability_table',
    visualisationClass: AvailabilityView,
    collectionClass: AvailabilityCollection,
    clientRenderOnInit: true,
    requiresSvg: true
  });

  return AvailabilityModule;
});
