define([
  'common/modules/realtime',
],
function (RealtimeModule) {

  describe("RealtimeModule", function () {
    it("should return some HTML containing a number", function (done) {
      var realtime = new RealtimeModule();

      realtime.on('postrender', function () {
        expect(realtime.html()).toEqual('<p class="impact-number"><strong>11</strong></p> <p class="stat-description">users online now</p>');
        done();
      });

      realtime.render();
    });
  });

});
