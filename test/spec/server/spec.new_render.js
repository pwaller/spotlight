define([
  'render',
  'common/views/govuk',
  'common/views/raw',
  'common/views/visualisations/visitors-realtime'
],
function (render, GovUkView, RawView, VisitorsRealtimeModule) {
  describe("render middleware", function () {
    describe("render", function () {
      var request, params;
      beforeEach(function() {
        params = {
          'service': 'licensing',
          'api_name': 'realtime',
          'raw': true
        };
        request = {
          param: function(key) {
            return params[key];
          }
        };
      });
      it("should call render on the controller", function () {
      });
      describe("when raw is true", function () {
        it("should call render on the controller", function () {
          //create constructor methods in class testing
          //spy on context
          /*GovUkView.constructor = function () { return "123" };*/
          /*GovUkView.initialize = function () { return "123"};*/
          /*x = GovUkView();*/
          console.log("afore");
          console.log(GovUkView);
          console.log("afore");
          //never going to work unless we can hook into define
          var spy = spyOn(govUKView, 'newOne').andReturn({});
          console.log("aft");
          expect(render.newone()).toEqual(123);
        });
      });
      describe("when raw is false", function () {
      });
    });
  });
});
