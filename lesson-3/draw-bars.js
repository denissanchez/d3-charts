async function drawBars() {
  const dataset = await d3.json("./assets/my_weather_data.json");

  const metricAccessor = dp => dp.humidity;

  const width = 600;

  const dimensions = {
    width: width,
    height: width * 0.6,
    margin: {
      top: 30,
      right: 10,
      bottom: 50,
      left: 50,
    },
  };

  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  const wrapper = d3.select("#wrapper")
    .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height);
    
  const bounds = wrapper.append("g")
    .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`);

  const xScale = d3.scaleLinear()
    .domain(d3.extent(dataset, metricAccessor))
    .range([0, dimensions.boundedWidth])
    .nice();
  
  const binsGenerator = d3.histogram()
    .domain(xScale.domain())
    .value(metricAccessor)
    .thresholds(12);
  
  const bins = binsGenerator(dataset);

  const yAccessor = dp => dp.length;

  const yScale = d3.scaleLinear()
    .domain([0, d3.max[bins, yAccessor]])
    .range([dimensions.boundedHeight, 0])
    .nice();
}

drawBars();