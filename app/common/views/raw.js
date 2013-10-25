define([
  'extensions/views/view',
  'stache!common/templates/raw_template',
  'stache!common/templates/head',
  'stache!common/templates/body-end'
],
function (View, rawTemplate, headTemplate, bodyEndTemplate) {

  var RawView = View.extend({
    template: rawTemplate,

    render: function () {
      var context = this.templateContext();
      var content = this.content = new (this.model.get('view'))({
        model: this.model
      });
      content.once('postrender', function () {
        //this doesn't work here as rendering to mustache, not to element, fix this
        //context.content = this.content.$el.html();
        context.content = this.content.html;
        this.html = this.template(context);
        this.trigger('postrender');
      }, this);
      content.render();
    },

    templateContext: function () {
      var baseContext = {
        requirePath: this.requirePath,
        assetPath: this.assetPath,
        development: this.environment === 'development',
        not_raw: false
      };

      return _.extend(
        View.prototype.templateContext.apply(this, arguments),
        baseContext,
        {
          head: headTemplate(baseContext),
          bodyEnd: bodyEndTemplate(baseContext),
          topOfPage: "",
          pageTitle: "",
          bodyClasses: "",
          insideHeader: "",
          cookieMessage: "",
          footerTop: "",
          footerSupportLinks: ""
        }
      );
    }

  });

  return RawView;
});
