define([
  'common/views/dashboard',
  'common/views/module',
  'common/views/error404',
  'common/views/error500'
],
function (DashboardView, ModuleView, Error404View, Error500View) {

  var ViewMap = {
    'error404': Error404View,
    'error500': Error500View,
    'dashboard': DashboardView,
    'module': ModuleView
  };

  return ViewMap;
});
