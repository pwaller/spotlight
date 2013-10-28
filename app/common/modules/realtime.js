define([
  'extensions/controllers/module_controller',
  'stache!common/templates/visualisation'
],
function (ModuleController, template) {
  var Realtime = ModuleController.extend({

    render: function () {
      this.trigger('postrender');
    },

    html: function () {
      return "12";
    }

//    var visitorsRealtimeCollection = new VisitorsRealtimeCollection([],{
//    serviceName: "licensing"
//    });
//
//    var visitorsRealtimeView = new VisitorsRealtimeView({
//    el: $('#number-of-visitors-realtime'),
//    collection: visitorsRealtimeCollection
//    });
//
//    visitorsRealtimeCollection.fetch();
//
  });

  return Realtime;
});
