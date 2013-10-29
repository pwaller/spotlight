define([
  'stagecraft_api_client',
  'common/views/govuk',
  'common/views/raw'
],
function (StagecraftApiClient, GovUkView, RawView) {

  var getLayout = function (req) {
    if (req.param('raw')) {
      return new RawView({
        requirePath: req.app.get('requirePath'),
        assetPath: req.app.get('assetPath'),
        environment: req.app.get('environment'),
      });
    } else {
      return new GovUkView({
        requirePath: req.app.get('requirePath'),
        assetPath: req.app.get('assetPath'),
        environment: req.app.get('environment'),
      });
    }
  };

  var render = function (req, res, next) {
    layout = getLayout(req);
    /*model = setupStagecraftApiClient();*/
    /*model.once("sync", function () {*/
    /*controller = new api.controller(res, model.view_params, this.view_params, layout);*/
    /*controller.render();*/
    /*};*/
  };

  /*var setupStagecraftApiClient = function () {*/
  /*var model = new StagecraftApiClient();*/

  /*model.set('development', req.app.get('environment') === 'development');*/
  /*model.urlRoot = 'http://localhost:' + req.app.get('port') + '/stagecraft-stub';*/

  /*model.on('sync', function () {*/
  /*model.off();*/
  /*setup.renderContent(req, res, model);*/
  /*});*/

  /*model.on('error', function (model, xhr, options) {*/
  /*model.off();*/
  /*res.status(xhr.status);*/
  /*setup.renderContent(req, res, model);*/
  /*});*/

  /*model.on('unknown', function (model) {*/
  /*res.status(501);*/
  /*});*/

  /*model.setPath(req.url);*/
  /*return model;*/
  /*};*/

  return render;
});
