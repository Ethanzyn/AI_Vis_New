var img;
var imgNum;
var frame;
var state;
var frameC;
var hex;
var gridSize;
var grid =[]; 
var humanPrediction; 
var commonP;
var commonColor;
var buttonState;
var mlPrediction = "false"
var mask;
var genderNote;
var genderJSON;
var emotionJSON;
var genderMask;
var MLgrid = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
,[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
,[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
,[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
,[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
,[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
,[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
,[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]
,[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
,[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
,[0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
,[0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
,[0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
,[0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0]
,[0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
,[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
,[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
,[0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
,[0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
,[0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]


function setup(){
    gridSize = 26;
    buttonState = 0;
    common = 0; 
    var canvas = createCanvas(600, 600);
    canvas.parent('p5js');
    background(255,255,255,100);
    
    for(let i=0; i < gridSize; i++){
        grid.push([])
        for(let j=0; j < gridSize; j++){
         grid[i].push(0)
        }
      }
    
    var num = "1002";
    img = loadImage("Dataset/img_align_celeba/1002.jpg")
    imgNum = num + ".jpg"
    genderJSON = loadJSON("face_classification/src/gender_results_1000.json")
    emotionJSON = loadJSON("face_classification/src/emotion_results_1000.json")
    getMask(num) 
  }


function getMask(imgName){
    var jn ="lime_masks/" + imgName + ".json"
    mask = loadJSON(jn)
}

function changeImage(){
    if(state == undefined){
        var rNum = String(round(random(1000,2000)))
        var url = "Dataset/img_align_celeba/" + rNum + ".jpg"
        imgNum = rNum + ".jpg"
        img = loadImage(url)
        getMask(rNum)
    }

}


function getGenderResult(imgName) {
    var percentM = genderJSON[imgName].man 
    var percentF = genderJSON[imgName].woman
    if (percentM > percentF) {
        return "man"
    } else {
        return "woman"
    }
}


function draw(){
    image(img,0,0,600,600)
    let c2 = color(238,67,21,140)
   
    if(state == undefined){
        if(frame){
            if(frame == "woman"){
                var c = color ('#3BA4D6')
                humanPrediction = "false"
            } else {
                var c = color('#F5A623')
                humanPrediction = "true"
            }
        drawFrame(c,frame)
        } 
    } else if (state == "draw"){
        var blockC = color(hex)
        blockC.setAlpha(140)
        drawFrame(frameC,frame)
        for(let i=0; i < gridSize; i++){
            for(let j=0; j < gridSize; j++){
                var n = grid[i][j]
                if(n === 1){

                    fill(blockC)
                    noStroke();
                    var s = width/gridSize
                    var y = i*s 
                    var x = j*s
                    rect(x,y,s,s)
                  }
            }
          }
    } else if (state == "done"){
        var blockC = color(hex)
        blockC.setAlpha(140)
        drawFrame(frameC,frame)
        var common = 0; 
        var human = 0;
        var ML = 0; 
        var gender = getGenderResult(imgNum)
        MLgrid = mask[gender]
        for(let i=0; i < gridSize; i++){
            for(let j=0; j < gridSize; j++){
                var n = grid[i][j]
                var m = MLgrid[i][j]
                if(n == 1){
                    human ++ 
                    fill(blockC)
                    noStroke();
                    var s = width/gridSize
                    var y = i*s 
                    var x = j*s
                    rect(x,y,s,s)
                    if(n==m){
                        common++ 
                    }
                  } 
                if(m == 1){
                    ML ++ 
                }
            }
          }
        
          commonP = common*2/ (human + ML)

    } else if (state == "compare") {


        var gender = getGenderResult(imgNum)
        MLgrid = mask[gender]
        var blockC = color(hex)
        blockC.setAlpha(140)

        for(let i=0; i < gridSize; i++){
            for(let j=0; j < gridSize; j++){
                var n = grid[i][j]
                var m = MLgrid[i][j]
                var s = width/gridSize
                var y = i*s 
                var x = j*s
                noStroke();
                if(n == 1){
                    fill(blockC);
                    rect(x,y,s,s)
                    if(n==m){
                        blendMode(DIFFERENCE)
                    } 

                  } 
                if(m == 1){
                    fill(c2);
                    rect(x,y,s,s)  

                }
                blendMode(BLEND)
            }
          }

        drawFrame(frameC,frame)
        noStroke();
        
        if(humanPrediction == mlPrediction){
            commonColor = "#5F54BD"
        } else {
        }

        var percent = document.getElementById("percent")
        if (percent!= null){
            percent.style.color = commonColor
            

        }

          fill(238,67,21)
          rect(100,5,100,40); 
          fill(255);
          if(gender == 'woman'){
              text("woman",150,30)
          } else {
              text("man",150,30)
          }

    } 

}

function showInstruction(){
    var parent = document.getElementById("genderSection")
    var text = document.createElement("h6");
    var icon = document.createElement("h1")
    text.setAttribute("id","instruction");
    icon.setAttribute("id","drawMoji")
    text.innerHTML = "Shade in the area with your mouse";
    icon.innerHTML = "✏️";
    parent.appendChild(text);
    parent.appendChild(icon);
    text.style.transition = "opacity 0.5s"
}




function changeButton(x1,x2,y1,y2){
    
    if(buttonState  == 0 ){
        var buttonSection = document.getElementById("buttonSection");
        while (buttonSection.firstChild) {
            buttonSection.removeChild(buttonSection.firstChild);
          }

        addElement("buttonSection","div","button",x1,x2)
        addElement("buttonSection","div","button",y1,y2)
        buttonState = 1
    } else if(buttonState == 2 ){
        var buttonSection = document.getElementById("buttonSection");
        while (buttonSection.firstChild) {
            buttonSection.removeChild(buttonSection.firstChild);
          }
        addElement("buttonSection","div","button",x1,x2)
        document.getElementById("compare").style.width = "580px"
        document.getElementById("compare").onclick = function(){
            if(state == "done"){
                addLegend();
                state = "compare"
                var tag1 = "<span id ='percent'>"
                var tag2 = "</span>"
                var str = ['Look, based on referenced area, you "think" ' + tag1+String(round(commonP*100))+"% "+tag2+"like this AI"]
                addNewType()
                typestuff(commonP,str)
                var compare = document.getElementById("compare")
                var text = document.querySelector('#compare h5')
                text.innerHTML = "Try Again"
                
                var emolink = document.createElement("div"); //Create left div
                emolink.id = "link"; //Assign div id
                var a = document.createElement('a');
                a.href =  "emotion/index.html"; // Insted of calling setAttribute 
                a.innerHTML = "Explore Emotion Recognition ->" // <a>INNER_TEXT</a>
                emolink.appendChild(a); // Append the link to the div
                var parent = document.getElementById("genderSection")
                parent.appendChild(emolink)

            } else {
                restart();
                changeImage()
            }
        
        }
        
    } 
}


function addElement(parentId, elementTag, elementClass, html,id) {
    // Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('class', elementClass);
    newElement.setAttribute("id",id);
    newElement.onclick = function(){changeGrid(this.id)}
    var h5 =  document.createElement('h5');
    h5.innerHTML = html;
    newElement.appendChild(h5);
    p.appendChild(newElement);
}
function changeGrid(id){
    if(id == "reset") {
        for(let i=0; i < gridSize; i++){
            for(let j=0; j < gridSize; j++){
                grid[i][j] = 0 
            }
          }
    } else if(id == "done"){
        state = "done"
        var icon = document.getElementById("drawMoji")
        var text = document.getElementById("instruction")
        icon.parentNode.removeChild(icon);
        text.parentNode.removeChild(text);

        
        buttonState = 2 
        changeButton("Compare with AI","compare")
        

    } 
}

function restart(){
    state = undefined
    buttonState = 0; 
    common = 0; 
    for(let i=0; i < gridSize; i++){
        for(let j=0; j < gridSize; j++){
         grid[i][j] = 0; 
        }
      }
    var tag1 = "<span class ='man'>"
    var text1 = "Man"
    var tag2  = "</span>"
    var tag3 = "<span class = 'woman'>"
    var text2 = "woman"
    var tag4 = "</span>"
    var str = ['Pretend that you are an AI system,does the celebrity looks more like a ' + tag1 + text1 + tag2 + " or " + " a " + tag3+text2+tag4]
    addNewType()
    typestuff(commonP,str)
    var legend = document.getElementById("legend")
    legend.parentNode.removeChild(legend);
    frameC = undefined;
    frame = undefined;
    var buttonSection = document.getElementById("buttonSection");
    while (buttonSection.firstChild) {
        buttonSection.removeChild(buttonSection.firstChild);
      }
    addElement("buttonSection","div","button","Woman👱🏼‍♀️","woman")
    addElement("buttonSection","div","button","Man👱🏼‍♀️","man")
    var woman = document.getElementById("woman")
    var man = document.getElementById("man")
    woman.setAttribute('onclick',"selection('woman',this)")
    man.setAttribute('onclick',"selection('man',this)")
    woman.setAttribute('onmouseover',"buttonHover('woman',this)")
    man.setAttribute('onmouseover',"buttonHover('man',this)")
    woman.setAttribute('onmouseout',"buttonNormal(this)")
    man.setAttribute('onmouseout',"buttonNormal(this)")
 
}

function addLegend(){
    var elem = document.createElement("img")
    if(humanPrediction == "false"){
        elem.setAttribute("src", "legend1.png");

    } else {
        elem.setAttribute("src", "legend2.png");
    }
    elem.setAttribute("id","legend")
    var parent = document.getElementById("genderSection")
    parent.appendChild(elem)

}



function mouseDragged(){

    if(state == "draw"){

        changeButton("Reset","reset","Done","done");
        for(let i=0; i < gridSize; i++){
            for(let j=0; j < gridSize; j++){
                var s = width/gridSize
                var y = i*s 
                var x = j*s
                if ((j*s < mouseX) && (mouseX < s*(j+1)) && (i*s < mouseY) && (mouseY < s*(i+1))){
                    grid[i][j] = 1;
                }
    
            }
        }

    }
   
}



function typestuff(t,string){

    var tag1 = "<span class =" +t + ">"  
    var tag2 = "</span>"

    document.getElementById("typed2").innerHTML = null
    
    if(string){
        var typing= string
    } else {
        var typing = ['Hopefully that’s not hard.So, what parts of the face make you think this is a ' +tag1+t+tag2+"?"]
    }

    var options = {
        strings: typing,
        typeSpeed: 10,
        backSpeed: 10,
        loop: false,}
        // showCursor: false,}
    var typed = new Typed("#typed2", options);
}

function addNewType(){
    var title2 = document.getElementsByClassName("title2")[0]
    while (title2.firstChild) {
        title2.removeChild(title2.firstChild);
      }
    var newT = document.createElement("span")
    newT.setAttribute("id", "typed2")
    title2.appendChild(newT)

}

function drawFrame(c,t) {
    noFill();
    stroke(c);
    strokeWeight(10);
    rect(0,0,600,600)
    fill(c)
    rect(0,0,100,40)
    fill(255);
    textAlign(CENTER);
    textSize(24)
    
    text(t,50,30)

}

function buttonHover(x,y){

    if(genderNote == undefined){
        var note = document.createElement('img')
        note.setAttribute("src","genderNote.png")
        var parent = document.getElementById("genderSection")
        note.setAttribute("id","genderNote")
        parent.appendChild(note);
        genderNote = 0;


    }

    
    if(state == undefined){

        if(x == 'woman'){
            frame = "woman"
            y.style.backgroundColor = "#3BA4D6"

        } else {
            frame = 'man'
            y.style.backgroundColor = "#F5A623"
        }

    }



}

function buttonNormal(x){
    if(state == undefined){
        frame = null;
        x.style.backgroundColor = 'transparent';

    }

}

function selection(x,y){
    document.getElementById('genderNote').style.display = "none";


    var all = document.getElementsByClassName("button");
    for (var i = 0; i < all.length; i++) {
        all[i].style.backgroundColor = 'transparent';
      }
    y.style.borderWidth = "2px"
    if(state != "draw"){
        showInstruction()

    }
    state = "draw"

    
    frame = x
    if(x == 'woman'){
        frameC = color("#3BA4D6")
        hex ="#3BA4D6" 
        y.style.backgroundColor = "#3BA4D6"
    } else {
        frameC = color('#F5A623')
        hex ="#F5A623" 
        y.style.backgroundColor = "#F5A623"
    }


    // var cursor = document.getElementsByClassName("typed-cursor typed-cursor--blink")[0]
    // cursor.parentNode.removeChild(cursor)
    addNewType()
    typestuff(x)
    

}


// function selection1(x){
//     document.getElementById('genderNote').style.display = "none";
//     var buttons = document.getElementById('buttonSection')
//     var all = document.getElementsByClassName("button");
//     for (var i = 0; i < all.length; i++) {
//         all[i].style.backgroundColor = 'transparent';
//       }
 
//     if(state != "draw"){
//         showInstruction()

//     }
//     state = "draw"

    
//     frame = x
//     if(x == 'woman'){
//         var y = buttons.firstChild
//         frameC = color("#3BA4D6")
//         hex ="#3BA4D6" 
//         y.style.backgroundColor = "#3BA4D6"
//     } else {
//         frameC = color('#F5A623')
//         hex ="#F5A623" 
//         var y = buttons.lastChild
//         y.style.backgroundColor = "#F5A623"
//     }
//     y.style.borderWidth = "2px"

//     // var cursor = document.getElementsByClassName("typed-cursor typed-cursor--blink")[0]
//     // cursor.parentNode.removeChild(cursor)
//     addNewType()
//     typestuff(x)
    

// }







 