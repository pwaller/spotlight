define([
  'extensions/controllers/module_controller'//,
  // 'extensions/collections/visitors-realtime',
  // 'extensions/views/visitors-realtime'
],
function (ModuleController) {
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
