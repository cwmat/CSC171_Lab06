var width = 1000,
    height = 600;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width)
    .attr("height", height);

// var proj = d3.geo.orthographic()
//       .scale(200);
var proj = d3.geo.mercator()
      .scale(200);

var path = d3.geo.path()
      .projection(proj);

queue()
    .defer(d3.json, "data/us.json")
    .defer(d3.json, "data/airports.json")
    .await(generate);


function generate(error, data, airports) {
  if (error) {
    consoloe.log("Error");
  } else {
  var usa = topojson.feature(data, data.objects.countries).features;
  console.log(usa);
  console.log(airports);

  svg.selectAll("path")
      .data(usa)
    .enter().append("path")
      .attr("d", path);

  // svg.selectAll("line")
  //     .data(airports.links)
  //   .enter().append("line")
  //     .attr({
  //       x1: function(d) { return proj(); },
  //       y1: ,
  //       x2: ,
  //       y2:
  //     });

  svg.selectAll("circle")
      .data(airports.nodes)
    .enter().append("circle")
      .attr("r", 10)
      .attr("transform", function(d) {
        return "translate(" + proj([d.longitude, d.latitude]) + ")";
      });

  }
}
