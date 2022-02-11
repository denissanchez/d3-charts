async function drawLineChart() {
    const dataset = await d3.json('./assets/my_weather_data.json');

    // dp => datapoint

    const yAccessor = dp => dp.temperatureMax;

    const dateParser = d3.timeParse("%Y-%m-%d");
    const xAccessor = dp => dateParser(dp.date);

    let dimensions = {
        width: window.innerWidth * 0.9,
        height: 400,
        margin: {
            top: 15,
            right: 40,
            bottom: 15,
            left: 60,
        },
    }

    dimensions = {
        ...dimensions,
        boundedWidth: dimensions.width - dimensions.margin.left,
        boundedHeight: dimensions.height - dimensions.margin.top - dimensions.margin.bottom,
    }

    const wrapper = d3.select('#wrapper')
        .append('svg')
            .attr("width", dimensions.width)
            .attr("height", dimensions.height);

    const bounds = wrapper.append("g")
        .style("transform", `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`)

    const yScale = d3.scaleLinear()
        .domain(d3.extent(dataset, yAccessor))
        .range([dimensions.boundedHeight, 0]);

    const freeeingTemperaturePlacement = yScale(32);
    const freezingTemperatures = bounds.append("rect")
        .attr("x", 0)
        .attr("width", dimensions.boundedWidth)
        .attr("y", freeeingTemperaturePlacement)
        .attr("height", dimensions.boundedHeight - freeeingTemperaturePlacement)
        .attr("fill", "#33f4c2");

    const xScale = d3.scaleTime()
        .domain(d3.extent(dataset, xAccessor))
        .range([0, dimensions.boundedWidth]);
    
    const lineGenerator = d3.line()
        .x(dataPoint => xScale(xAccessor(dataPoint)))
        .y(dataPoint => yScale(yAccessor(dataPoint)));
    
    const line = bounds.append("path")
        .attr("d", lineGenerator(dataset))
        .attr("fill", "none")
        .attr("stroke", "#c3aac1")
        .attr("stroke-width", 2);

    const yAxisGenerator = d3.axisLeft()
        .scale(yScale)
    
    const yAxis = bounds.append("g")
        .call(yAxisGenerator)

    const xAxisGenerator = d3.axisBottom()
        .scale(xScale)
    
    const xAxis = bounds.append("g")
        .call(xAxisGenerator)
            .style("transform", `translateY(${dimensions.boundedHeight}px)`)
}

drawLineChart();
