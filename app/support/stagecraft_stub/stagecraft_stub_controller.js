define(function () {
  var fs = requirejs('fs');
  var Mustache = requirejs('vendor/mustache');

  return function (req, res) {
    var paramPath = req.params[0],
        filePath = 'app/support/stagecraft_stub/responses/' + paramPath + '.json',
        content;
    if (fs.existsSync(filePath)) {
      content = fs.readFileSync(filePath);
      res.send(JSON.parse(content));
    } else {
      filePath = 'app/support/stagecraft_stub/configs/' + paramPath + '.json';
      templatePath = 'app/support/stagecraft_stub/templates/mvp-service-dashboard.json';
      if (fs.existsSync(filePath)) {
        var config_json = JSON.parse(fs.readFileSync(filePath));
        content = Mustache.render(fs.realpathSync(templatePath), config_json);
        console.log(content);
        res.send(JSON.parse(content.toString()));
      }else{
        res.status(404);
        res.send({error: "No such stub exists: " + filePath});
      }
    }
  };
});
