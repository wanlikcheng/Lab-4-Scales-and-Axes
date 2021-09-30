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

        // // Create SVG element
        // const width = 650;
        // const height = 500;

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
        
        svg.selectAll("circle")
            .data(healthData)
            .enter()
            .append("circle")
            .attr("cx", d=>xScale(d.Income))
            .attr("cy", d=>yScale(d.LifeExpectancy))
            .attr("r", 4)
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
            .attr("opacity", 65)
            .attr("stroke", "black");

        
        // using axis
        const xAxis = d3.axisBottom()
	        .scale(xScale)
        const yAxis = d3.axisLeft()
	        .scale(yScale)

        // Draw the axis
        svg.append("g")
            .attr("class", "axis x-axis")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis);
        svg.append("g")
            .attr("class", "axis y-axis")
            .attr("transform", `translate(0, ${width})`)
            .call(yAxis);
    

    })
