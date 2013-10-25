define([
  'extensions/views/view',
  'stache!common/templates/visualisation'
],
function (View, template) {
  var VisualisationView = View.extend({
    template: template,

    html: function () { return "some html"; }

//    var updateInterval = 120 * 1000;
//    var visitorsRealtimeCollection = new VisitorsRealtimeCollection([],{
//    serviceName: "licensing"
//    });
//
//    var visitorsRealtimeView = new VisitorsRealtimeView({
//    el: $('#number-of-visitors-realtime'),
//    collection: visitorsRealtimeCollection,
//    collectionUpdateInterval: updateInterval
//    });
//
//    visitorsRealtimeCollection.fetch();
//
//    setInterval(function () {
//    visitorsRealtimeCollection.fetch();
//    }, updateInterval);
  });

  return VisualisationView;
});
