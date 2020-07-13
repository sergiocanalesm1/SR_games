
d3.select("#start-btn").on("click",renderGame);

function renderGame(){
    d3.select("#instructions").style("display","none");
    d3.select("body").append("p").text("Get Ready!");
    setTimeout(display_buttons,1000);
}
let level = 3;
function display_buttons(){
    d3.select("body").selectAll("p").remove();
    let radius = 25;
    let width = 600;
    let height = 250;
    let svg = d3.select("#canvas")
        .style("display","block")
        .append("div") 
            .attr("id","game-viewbox")
            .classed("svg-container",true)
            .append("svg")
                .attr("id","svg_game")       
                .attr("preserveAspectRatio", "xMinYMin meet")
                .attr("viewBox", `0 0 ${width} ${height}`)
                .classed("svg-content-responsive", true)
        ;
    let lost = false;
    //while(!lost){

    let x = Math.ceil(Math.random()*(width-radius))+radius;
    let y = Math.ceil(Math.random()*(height-radius))+radius;
    let coordinates_buffer = [[x,y]];
    for(let i=0; i<level;i++){
        flag = true;
        while(flag){ //so that no two coordinates are repeated
            x = Math.ceil(Math.random()*(width-2*radius))+radius;
            y = Math.ceil(Math.random()*(height-2*radius))+radius;
            flag = false;
            for(let j=0;j<coordinates_buffer.length;j++){
                let x1 = coordinates_buffer[j][0];
                let y1 = coordinates_buffer[j][1];
                let euclidean = Math.sqrt(Math.pow((x1-x),2)+Math.pow((y1-y),2));
                if( euclidean < 2*radius){//if there exists another set of coordinates closeby
                    flag = true;
                    break;
                }
            }
        }
        coordinates_buffer.push([x,y]);
        
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
            .attr("id",`circle_${i}`)
            .attr("x",x+"px")
            .attr("y",y+"px")
            .text(i+1)
            .style("font-size", "40px")
            .attr("text-anchor","middle")
            .attr("alignment-baseline","central")
            ;
    }

    

    setTimeout(function(){//hide numbers and make circles clickable
        let numbers = d3.selectAll("text")
            .style("display","none")
            ;
        let order = 0;
        let circles = d3.selectAll("circle")
            .on("mouseover",function(){
                d3.select(this).style("opacity",'0.7'); 
            })
            .on("mouseout",function(){
                d3.select(this).style("opacity","1");
            })
            .on("click",function(d,i){
                if(i==order){
                    d3.select(`#circle_${i}`).style("display","block");
                    order++;
                    
                }
                else{
                    numbers.style("display","block");
                    d3.select(this)
                        .style("opacity","1")
                        .style("stroke","red")
                        ;
                    setTimeout(function(){
                        d3.select("#game-viewbox").remove();
                        let t = d3.select("body").append("p").text(`you LOST at level ${level}`);
                        level = 3;
                        setTimeout(function(){
                            t.remove();
                            d3.select("#instructions").style("display","block");
                        },1000);
                    },1000);
                    

                    
                }
                if(order==level){
                    level++;
                    console.log("ganaste perri");
                    d3.select("#game-viewbox").remove();                   
                    d3.select("body").append("p").text(`get ready for level ${level}`);
                    setTimeout(display_buttons,1000);
                }
            })

    },1000);
//}
}



