define([
  'common/views/module',
  'common/modules/realtime',
],
function (ModuleView, RealtimeModule) {

  describe("ModuleView", function () {
    describe("module", function () {
      it("should return the correct visualisation view based on the module map", function () {
        module_view = new ModuleView();
        module_view['model'] = {
          get: function(key) {
            return {
              "module-type": "realtime",
              "data-group": "licensing",
              "data-type": ["realtime"]
            }[key];
          }
        };
        var module = module_view.module();
        expect(module instanceof RealtimeModule).toBe(true);
        expect(module['serviceName']).toEqual('licensing');
        expect(module['dataType']).toEqual(['realtime']);
      });
    });
  });

});
