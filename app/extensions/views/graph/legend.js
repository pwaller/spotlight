define([
  'extensions/views/graph/component'
],
function (Component) {

  var LineLabel = Component.extend({

    initialize: function () {
      //passed in and added with options
      Component.prototype.initialize.apply(this, arguments);
      this.calcXScale();
    },

    render: function () {
      Component.prototype.render.apply(this, arguments);
      steps = _.reduce(this.scale.ticks(20), function (memo, step_value){
        return memo += "<td style=\"background-color:"+this.getHsl(step_value)+";\">"+step_value+"</td>";
      }, "", this);
      //get min and max
      //get scale from main visualisation
      //step to create legend - background colour of a table row
      console.log("the steps");
      console.log(steps);
      console.log("the steps");
      $("<table><tr>"+ steps +"</tr></table>").appendTo(this.$el);
    }

  });

  return LineLabel;
});
