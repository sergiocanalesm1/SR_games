let max = 1000;
let svg = d3.select("#canvas").append("svg") 
    .attr("width",max)
    .attr("height",max)
    ;
let lost = false;
let level = 3;
//while(!lost){
let coordinates_buffer = [];
let x = Math.ceil(Math.random()*max + 100)
let y = Math.ceil(Math.random()*max + 100)
for(let i=0; i<level;i++){
    flag = true;
    while(flag){ //so that no two coordinates are repeated
        x = Math.ceil(Math.random()*max + 100)
        y = Math.ceil(Math.random()*max + 100)
        flag = false;
        for(let j=0;j<coordinates_buffer.length;j++){
            if( coordinates_buffer[j] == [x,y]){
                flag = true;
                break;
            }
        }
    }
    coordinates_buffer.push([x,y]);
    console.log(coordinates_buffer);
    svg.append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 60)
        .attr("fill","white")
        .style("stroke","black")
        .attr("stroke-width","10")
        ;
    svg.append("text")
        .attr("x",x)
        .attr("y",y)
        .text(i+1)
        .style("font-size", "70px")
        .attr("text-anchor","middle")
        .attr("alignment-baseline","central")
        ;
}

    

setTimeout(function(){//hide numbers after 2 seconds
    let numbers = d3.selectAll("text")
        .style("display","none")
        ;
},2000);
//}


