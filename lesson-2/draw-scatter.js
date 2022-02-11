async function drawScatter() {
  const dataset = await d3.json("./assets/my_weather_data.json");
  
  const xAccessor = dp => dp.dewPoint;
  const yAccessor = dp => dp.humidity;

  const width = d3.min([
    window.innerWidth * 0.9,
    window.innerHeight * 0.9,
  ])

  const dimensions = {
    width: width,
    height: width,
    margin: {
      top: 10,
      right: 10,
      bottom: 50,
      left: 50,
    },
  }

  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  const wrapper = d3.select("#wrapper")
    .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
    
  const bounds = wrapper.append("g")
    .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)

  const xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])
    .nice();
  
  const yScale = d3.scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice();

  function drawDots(dataset, color) {
    const dots = bounds.selectAll("circle")
      .data(dataset)

    dots.enter().append("circle")

    bounds.selectAll("circle")
        .attr("cx", dataPoint => xScale(xAccessor(dataPoint)))
        .attr("cy", dataPoint => yScale(yAccessor(dataPoint)))
        .attr("r", 3)
        .attr("fill", color);
  }

  drawDots(dataset.slice(0, 200), "cornflowerblue");

  setTimeout(() => {
    drawDots(dataset, "darkred");
  }, 3000)
}


drawScatter();