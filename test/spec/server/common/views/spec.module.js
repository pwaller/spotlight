define([
  'common/views/module',
  'common/modules/realtime',
],
function (ModuleView, RealtimeModule) {

  describe("ModuleView", function () {
    describe("views", function () {

      it("should return the correct visualisation view based on the module map", function () {
        module_view = new ModuleView();
        module_view['model'] = {get: function(key) {
          return {"module-type": "realtime"}[key];
        }};
        expect(module_view.module() instanceof RealtimeModule).toBe(true);
      });

    });
  });

});
