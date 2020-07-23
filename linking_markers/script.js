

function load_game(){
    let raw = new XMLHttpRequest();
    raw.open("GET","FH.pdf",false);
    raw.onreadystatechange = function (){
        if(raw.readyState === 4){
            if(raw.status === 200 || raw.status === 0){
                let allText = raw.responseText;

                //clean
                allText = allText.replace(/[ \t]*<h[1-6]{1}.*>(.*)<\/h[1-6]{1}>[\n\r]/ig,"");
                allText = allText.replace(/Tj/g,"");
                allText = allText.replace(/Tf/g,"");
                allText = allText.replace(/BT/g,"");
                allText = allText.replace(/R Resources/g,"");
                allText = allText.replace(/R Content/g,"");
                allText = allText.replace(/endobj/g,"");
                allText = allText.replace(/R stream/g,"");
                allText = allText.replace(/obj/g,"");
                allText = allText.replace(/ET endstream/g,"");
                allText = allText.replace(/Page/g,"");
                allText = allText.replace(/"/g,"");
                allText = allText.replace(/-/g,"");
                allText = allText.replace(/[/]/g,"");
                allText = allText.replace(/[?!]/g,"");
                allText = allText.replace(/>/g,"");
                allText = allText.replace(/</g,"");
                allText = allText.replace(/TL/g,"");
                allText = allText.replace(/[:;]/g,"");
                allText = allText.replace(/[,.]/g,"");
                allText = allText.replace(/[0-9]/g,"");               
                allText = allText.replace(/[{()}]/g,"");               
                let cleanText = allText.split(" ");
                let nlines = document.getElementById("lines").value;
                let nwords = document.getElementById("words").value;
                console.log(nlines,nwords);
                let html = "";
                for(let i=0; i < nlines ; i++){
                    html += "<p>";
                    for(let j=0; j < nwords ; j++){
                        let random = Math.ceil(Math.random()*cleanText.length);                                              
                        let word = cleanText[random];
                        while(word.length <= 3 ){
                            random = Math.ceil(Math.random()*cleanText.length);
                            word = cleanText[random];
                        }
                        html += `${word}  `;
                    }
                    html += "</p>";
                }
                console.log(html)
                document.getElementById("game").innerHTML = html;
                
                
            }
        }
    };
    raw.send(null);
}