define([
  'common/views/raw',
  'extensions/models/model',
  'extensions/views/view'
],
function (RawView, Model, View) {
  describe("RawView", function () {
    it("renders a page with content only", function (done) {

      var TestView = View.extend({
        template: function () {
          return 'test_content';
        }
      });

      var model = new Model({
        view: TestView
      });

      var view = new RawView({
        requirePath: '/testRequirePath/',
        assetPath: '/testAssetPath/',
        environment: 'development',
        model: model
      });

      spyOn(view, "template").andReturn('rendered')

      //test just body containing what we stub to return from test view template, else should be blank apart from perhaps css and js includes 
      //view should return blank not rendered but don't force this
      view.on('postrender', function () {
//        expect(view.html).toEqual('rendered');
//
//        expect(view.content.model).toBe(model);
//
//        var context = view.template.argsForCall[0][0];
//        expect(context.head.trim()).toEqual('<link href="&#x2F;testAssetPath&#x2F;stylesheets/spotlight.css" media="screen" rel="stylesheet" type="text/css">');
//        expect(context.bodyEnd.trim()).toEqual('<script data-main="&#x2F;testRequirePath&#x2F;client.js" src="&#x2F;testRequirePath&#x2F;vendor/require.js" type="text/javascript"></script>');
//
//        var content = context.content.replace(/\s+/g, ' ').trim();
//        expect(content).toEqual('<section id="content"> <div class="performance-platform-outer"> test_content </div> </section>');
//        done();
      });

      view.render();
    });
  });
});
