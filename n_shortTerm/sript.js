let number=0;
let correct = 0;
let level = 4;
function random(){
    document.getElementById("numbers").style.display = "none";
    
    
    number = Math.ceil(Math.random()*Math.pow(10,level));
    document.body.innerHTML = `<p id="number" align='center'> ${number} </p>`;
    setTimeout(function(){
        document.getElementById("number").style.display = "none";
        document.body.innerHTML = "<div id='in' align='center'> <p id='message'> Type the number </p> <br>  <input type='number' id='guess'><br><button onclick='setup()'>Go</button></div>";
        
    },1000);
    
}

function setup(){
    console.log(document.getElementById("guess").value);
    if(document.getElementById("guess").value == number){
        document.body.innerHTML = "<div id='numbers' align='center'>correct!</div>";
        correct++;
        if (correct == 3){
            level++; 
            document.body.innerHTML = `<div id='numbers' align = 'center'>Nice! get ready for level ${level}</div>`;
            setTimeout(function(){
                random();
            },1500);
            
        }
        else{
            random();
        }
        
    }
    else{
        
        correct = 0; 
        document.body.innerHTML =  `<div id='numbers' align = 'center'>wrong, you lost at level ${level}</div>`;
        setTimeout(function(){
            level=4;
            document.body.innerHTML = '<div id="numbers" align="center" ><h3>Welcome!</h3><p>memorize the number</p><button onclick="random()">Start!</button></div>';
        },2000)
        
        
        
    }
}
