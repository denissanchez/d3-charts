async function createEvent() {
  const rectColors = [
    "yellowgreen",
    "cornflowerblue",
    "seagreen",
    "slateblue",
  ]

  const rects = d3.select("#svg")
    .selectAll(".rect")
    .data(rectColors)
    .enter().append("rect")
      .attr("height", 100)
      .attr("width", 100)
      .attr("x", (d,i) => i * 110)
      .attr("fill", "lightgrey")

  rects.on("mouseenter", function(datum, index, nodes) {
    d3.select(this).style("fill", index);
  }).on("mouseout", function(datum, index, nodes) {
    d3.select(this).style("fill", "lightgrey");
  });

  setTimeout(() => {
    rects
      .dispatch("mouseout")
      .on("mouseenter", null)
      .on("mouseout", null);
  }, 3000);
}
createEvent()