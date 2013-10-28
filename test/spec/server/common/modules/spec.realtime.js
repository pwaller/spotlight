define([
  'common/modules/realtime',
],
function (RealtimeModule) {

  describe("RealtimeModule", function () {
    it("should return some HTML containing a number", function () {
      var realtime = new RealtimeModule();
      realtime.render();
      expect(realtime.html()).toEqual('12');
    });
  });

});
