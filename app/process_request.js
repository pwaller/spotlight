define([
  'page_config',
  'stagecraft_api_client'
],
function (PageConfig, StagecraftApiClient) {

  var renderContent = function (req, res, model) {
    model.set(PageConfig.commonConfig(req));

    var ControllerClass = model.get('controller');
    var controller = new ControllerClass({
      model: model,
      raw: req.query.raw,
      url: req.originalUrl
    });

    controller.once('ready', function () {
      res.send(controller.html);
    });

    controller.render({ init: true });

    return controller;
  };

  var setup = function (req, res) {
    var model = setup.getStagecraftApiClient();

    model.urlRoot = 'http://localhost:' + req.app.get('port') + '/stagecraft-stub';

    model.on('sync error', function () {
      model.off();
      res.status(model.get('status'));
      setup.renderContent(req, res, model);
    });

    model.setPath(req.url);
  };

  setup.getStagecraftApiClient = function () {
    return new StagecraftApiClient();
  };

  setup.renderContent = renderContent;

  return setup;
});
