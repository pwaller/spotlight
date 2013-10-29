
set_context:function (backdrop_data){
  this.context = _.extend({

  }, backdrop_data.relevant_stuff);
}

render: function {
  backdrop_data.once('sync', function () {
    set_context()
    res.send(render_template())
  } 
}

render_template: function {
  super.render_template(this.context)
}
