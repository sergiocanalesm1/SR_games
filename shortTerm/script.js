


d3.select("#start-btn").on("click",renderGame);
let currentBest = 3;
let radius = 25;
let width = 600;
let height = 250;

function renderGame(){
    
    d3.select("#instructions").style("display","none");
    d3.select("body").append("p").text("Get Ready!");
    setTimeout(display_buttons,1000);
}
let level = 3;
function display_buttons(){  
    d3.select("body").selectAll("p").remove();
    
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
    
   
    
    let x = Math.ceil(Math.random()*(width-radius))+radius;
    let y = Math.ceil(Math.random()*(height-radius))+radius;
    let coordinates_buffer = [[x,y]];
    let current_id = Math.ceil(Math.random()*8);
    let ordered_ids = [current_id];
    let k =0;
    for(let i = 0; i<level ;i++){//setup ids first
        if(i<level-1){//skip last 
            ordered_ids.push(current_id);           
            k = i;
            flag = true;
            while(flag){//set ordered ids from 1-9 
                if(ordered_ids[k+1] < ordered_ids[k]){
                    //switch place in array
                    let swap_temp = ordered_ids[k+1];
                    ordered_ids[k+1] = ordered_ids[k];
                    ordered_ids[k] = swap_temp;

                }
                else if(ordered_ids[k+1] == ordered_ids[k]){
                    ordered_ids.splice(k+1,1);//remove current_id
                    current_id =  Math.ceil(Math.random()*8);//create new
                    ordered_ids.push(current_id);
                    k = i+1; //reset cicle
                }
                else{
                    flag = false;
                }
                k--;
            }
        }
    }
    for(let i=0; i<level;i++){//draw circle by circle
        flag = true;
        while(flag){ // so that no two coordinates closer than 2R
            x = Math.ceil(Math.random()*(width-2*radius))+radius;
            y = Math.ceil(Math.random()*(height-2*radius))+radius;
            flag = false;
            
            for(let j=0;j<coordinates_buffer.length;j++){
                let x1 = coordinates_buffer[j][0];
                let y1 = coordinates_buffer[j][1];
                let euclidean = Math.sqrt(Math.pow((x1-x),2)+Math.pow((y1-y),2));
                if( euclidean < 2*radius){
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
            //create a button and draw it as a circle with css
        svg.append("text")
            .attr("id",`circle_${ordered_ids[i]}`)
            .attr("x",x+"px")
            .attr("y",y+"px")
            .text(ordered_ids[i])           
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
        d3.selectAll("circle")
            .on("mouseover",function(){
                d3.select(this).style("opacity",'0.7'); 
            })
            .on("mouseout",function(){
                d3.select(this).style("opacity","1");
            })
            .on("click",function(d,i){
                if(i==order){
                    d3.select(`#circle_${ordered_ids[order++]}`).style("display","block");
                    
                    
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

                        
                        setTimeout(function(){
                            t.remove();
                            d3.select("#instructions").style("display","block");
                           
                            if(currentBest < level ){
                                d3.select("#best").node().innerHTML = `<span id="best">Level ${level}</span>`;
                            }
                            level = 3;
                        },1000);
                    },1000);
                    

                    
                }
                if(order==level){
                    level++;
                    
                    d3.select("#game-viewbox").remove();                   
                    d3.select("body").append("p").text(`get ready for level ${level}`);
                    setTimeout(display_buttons,1000);
                }
            })

    },1000);

}



