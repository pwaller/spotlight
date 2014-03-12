define([
  'common/views/govuk',
  'tpl!common/templates/error.html'
],
function (GovUkView, contentTemplate) {
  var ErrorView = GovUkView.extend({

    contentTemplate: contentTemplate,

    getContent: function () {
      var status = this.model.get('status');
      var context = this.errors[status] || this.errors['500'];
      context.model = this.model;
      return this.contentTemplate(context);
    },

    errors: {
      '404': {
        title: 'This page cannot be found',
        description: 'Please check that you have entered the correct web address.'
      },
      '500': {
        title: 'This page could not be loaded',
        description: 'Please try again later.'
      },
      '501': {
        title: 'This page is not available',
        description: 'Please try again next year.'
      }
    }
  });

  return ErrorView;
});
