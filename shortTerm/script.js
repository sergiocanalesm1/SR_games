
d3.select("#start-btn").on("click",renderGame);

function renderGame(){
    d3.select("#instructions").style("display","none");
    d3.select("body").append("text").text("get ready!");
    setTimeout(function(){
        let radius = 25;
        let width = 600;
        let height = 300;
        let svg = d3.select("#canvas")
            .style("display","block")
            .append("div") 
            .classed("svg-container",true)
            .append("svg")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", `0 0 ${width} ${height}`)
            .classed("svg-content-responsive", true)
            ;
        let lost = false;
        let level = 3;
        //while(!lost){

        let x = Math.ceil(Math.random()*width )
        let y = Math.ceil(Math.random()*height)
        let coordinates_buffer = [[x,y]];
        for(let i=0; i<level;i++){
            flag = true;
            while(flag){ //so that no two coordinates are repeated
                x = Math.ceil(Math.random()*width )
                y = Math.ceil(Math.random()*height )
                flag = false;
                for(let j=0;j<coordinates_buffer.length;j++){
                    let x1 = coordinates_buffer[j][0];
                    let y1 = coordinates_buffer[j][1];
                    let euclidean = Math.sqrt(Math.pow((x1-x),2)+Math.pow((y1-y),2));
                    console.log(`current ${x},${y} buffer ${x1},${y1} distance ${euclidean}`);
                    if( euclidean < 2*radius){
                        flag = true;
                        break;//next set of coordinates
                    }//la hipotenusa tiene que ser >= 2R 
                }
            }
            coordinates_buffer.push([x,y]);
            console.log(coordinates_buffer);
            svg.append("circle")
                .attr("cx", x+"px")
                .attr("cy", y+"px")
                .attr("r", radius)
                .attr("fill","white")
                .style("stroke","black")
                .attr("stroke-width","5")
                ;
                //create a button a draw it as a circle with css
            svg.append("text")
                .attr("x",x+"px")
                .attr("y",y+"px")
                .text(i+1)
                .style("font-size", "40px")
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
        },1000);
}



