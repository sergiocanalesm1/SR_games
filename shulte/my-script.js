let plays_buffer = [];
let plays = 0;
let average = 0;
let best = 200;
function draw (){
    let div = document.getElementById("shulte");
    div.innerHTML = "";
    let x = document.getElementById("x");
    let y = document.getElementById("y");
    let X = parseInt(x.value);
    let Y = parseInt(y.value);
    let checked = 0;
    let total = X*Y;

    //set random values

        // http://stackoverflow.com/questions/962802#962890
        function shuffle(array) {
            var tmp, current, top = array.length;
            if(top) while(--top) {
              current = Math.floor(Math.random() * (top + 1));
              tmp = array[current];
              array[current] = array[top];
              array[top] = tmp;
            }
            return array;
          }

    let ordered=[];
    let shuffled=[];
    for (i=0;i<total;++i) {
        ordered[i]=i+1 ;shuffled[i]=i+1;
    }
    shuffled = shuffle(shuffled);

    //append nodes to html
    for(let i=0 ; i < Y ; i++){
      for(let j=0 ; j < X ; j++){
        let number = shuffled[(X*i)+j];
        let input = document.createElement("INPUT");
        input.setAttribute("type", "button");
        input.setAttribute("value", number);
        input.setAttribute("id", number);
        input.onclick = function (){
            if(ordered[checked] == number){
                checked++;
                input.setAttribute("disabled","true");
                //disable it
            }
            document.getElementById("checked").innerHTML = `${checked}/${total}`;
            if (checked == total){
                let endTime = new Date().getTime();
                let time = (endTime - startTime)/1000;
                plays++;
                plays_buffer.push(time);
                average = 0;
                for (let p = 0; p < plays_buffer.length ; p++){
                  average += plays_buffer[p];
                }
                average= Math.round(((average/plays)+Number.EPSILON)*100)/100
                if(time < best){
                  best = time;  
                }
                document.getElementById("time").style.display = "block";
                document.getElementById("time").innerHTML =  `<p> <strong> time </strong>: ${time} </p>
                                                              <p> <strong> session average</strong>: ${average} </p>
                                                              <p> <strong> best </strong> : ${best} </p>`;
            }
        }
        
        input.style.height = "100px";
        input.style.width = "100px";
        div.appendChild(input);
      }

      div.appendChild(document.createElement("br"));
    }

    //start timer and game
    let startTime = new Date().getTime();
    
    }


      


