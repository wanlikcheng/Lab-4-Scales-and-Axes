d3.csv('wealth-health-2014.csv', d=>{
    return {
        ...d,
        LifeExpectancy: +d.LifeExpectancy,
        Income: +d.Income,
        Population: +d.Population,
    }
  }).then(data=>{
        healthData = data;
        console.log('health data', data);

        // margin
        const margin = ({top: 20, right: 20, bottom: 20, left: 20})

        const width = 650 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

        const svg = d3.select(".chart")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        const xScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.Income))
            .range([0, width]) 
        
        const yScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.LifeExpectancy))
            .range([height, 0])
        
        const popScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.Population))
            .range([4, 20])
        
        svg.selectAll("circle")
            .data(healthData)
            .enter()
            .append("circle")
            .attr("cx", d=>xScale(d.Income))
            .attr("cy", d=>yScale(d.LifeExpectancy))
            .attr("r", d => popScale(d.Population))
            .attr("fill", function(d) {
                if(d.Region === "East Asia & Pacific") {
                    return "blue";
                }
                else if(d.Region === "South Asia") {
                    return "orange";
                }
                else if(d.Region === "America") {
                    return "red";
                }
                else if(d.Region === "Sub-Saharan Africa") {
                    return "lightcyan";
                }
                else if(d.Region === "Europe & Central Asia") {
                    return "green";
                }
                else if(d.Region === "Middle East & North Africa") {
                    return "gold";
                }
            })
            .attr("opacity", 0.6)
            .attr("stroke", "black")
            .on("mouseenter", (event, d) => {
                const pos = d3.pointer(event, window); // pos = [x,y]
                console.log(d.Country, pos);
                d3.select(".tooltip")
                .style("display", "block")
                .style("top", (pos[1] + 5) + "px")
                .style("left", (pos[0] + 5) + "px").html(`
                    <div>Country: ${d.Country} </div>
                    <div>Region: ${d.Region} </div>
                    <div>Population: ${d3.format(",")(d.Population)} </div>
                    <div>Income: ${d3.format(",")(d.Income)} </div>
                    <div>Life Expectancy: ${d.LifeExpectancy} </div>
                    `
                    );
            })
            .on("mouseleave", (event, d) => {
                d3.select(".tooltip").style("display", "none");
            });

        
        // using axis
        const xAxis = d3.axisBottom()
	        .scale(xScale)
            .ticks(5, "s")
        const yAxis = d3.axisLeft()
	        .scale(yScale)

        // Draw the axis
        svg.append("g")
            .attr("class", "axis x-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);
        svg.append("g")
            .attr("class", "axis y-axis")
            .attr("transform", `translate(0, ${0})`)
            .call(yAxis);
        
        // adding labels
        svg.append("text")
            .attr("class", "xlabel")
            .attr('x', width - 65)
            .attr('y', height - 10)
            .attr("alignment-baseline", "baseline")
            .text("Income")

        svg.append("text")
            .attr("class", "ylabel")
            .attr('x', 10)
            .attr('y', 0)
            .attr("alignment-baseline", "baseline")
            .text("Life Expectancy")
        
        // encoding region
        
        const color = d3.scaleOrdinal(d3.schemeTableau10);

        // tooltip
        const legend = svg.append("g")

        legend.selectAll("rect")
            .data(healthData)
            .enter()
            .append("rect")
            .attr("x", 600)
            .attr("y", 500)
            .width(10)
            .height(10)
            


    })
