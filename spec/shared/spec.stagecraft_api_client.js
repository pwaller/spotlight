define([
  'stagecraft_api_client'
],
function (StagecraftApiClient) {
  describe('StagecraftApiClient', function () {

    beforeEach(function () {
      spyOn(StagecraftApiClient.prototype, 'fetch');
    });

    it('retrieves data for the current path', function () {
      var client = new StagecraftApiClient();
      client.urlRoot = 'http://testdomain/';
      client.setPath('foo/bar');
      expect(client.url()).toEqual('http://testdomain/foo/bar');
    });

    it('re-retrieves data when the path changes', function () {
      var client = new StagecraftApiClient({
        path: 'foo'
      });
      expect(client.fetch.callCount).toEqual(0);
      client.setPath('foo/bar');
      expect(client.fetch.callCount).toEqual(1);
      client.setPath('foo/bar');
      expect(client.fetch.callCount).toEqual(2);
    });

    describe('parse', function () {

      var client;
      beforeEach(function () {
        client = new StagecraftApiClient();
      });

      it('maps page-type "dashboard" to DashboardController', function () {
        var data = client.parse({'page-type': 'dashboard'});
        expect(data.controller).toBe(client.controllers.dashboard);
      });

      it('maps all modules for page-type "dashboard"', function () {
        var data = client.parse({
          'page-type': 'dashboard',
          'some-metadata': 'should be preserved',
          modules: [
            {
              'module-type': 'realtime',
              'metadata-for-module': 'preserved'
            }
          ]
        });
        expect(data.controller).toBe(client.controllers.dashboard);
        expect(data['some-metadata']).toEqual('should be preserved');
        expect(data.modules[0].controller).toBe(client.controllers.modules.realtime);
        expect(data.modules[0]['metadata-for-module']).toEqual('preserved');
      });

      it('maps to ErrorController when the page type is unknown', function () {
        var data = client.parse({'page-type': 'not-implemented'});
        expect(data.controller).toBe(client.controllers.error);
      });

      it('maps page-type "module" with a module-type "realtime" to Realtime module', function () {
        var data = client.parse({
          'page-type': 'module',
          'module-type': 'realtime'
        });
        expect(data.controller).toBe(client.controllers.modules.realtime);
      });

      it('maps to ErrorController when the module type is unknown', function () {
        var data = client.parse({
          'page-type': 'module',
          'module-type': 'not-implemented'
        });
        expect(data.controller).toBe(client.controllers.error);
      });
    });
  });
});
