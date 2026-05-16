let score = 0;
let currentLevel = "";
let index = 0;
let isDragging = false;
let selected = null;

const questions = {
easy: [
{q:"What is output of print(2+3)?", o:["5","23","6","Error"], a:"5"},
{q:"Keyword for function?", o:["def","func","function","define"], a:"def"}
],
medium: [
{q:"Output of len('Python')?", o:["6","5","7","Error"], a:"6"}
],
hard: [
{q:"OOP concept for multiple forms?", o:["Polymorphism","Encapsulation","Loop","None"], a:"Polymorphism"}
]
};

const layouts = {
easy:[
["red","","","blue","","","","","","green","","yellow","red","green","blue","yellow"]
],
medium:[
["red","","blue","","","green","","yellow","","","","","red","green","blue","yellow"]
],
hard:[
["red","","","blue","","green","","","","","","","yellow","green","blue","red"]
]
};

function startLevel(l){
currentLevel=l;
index=0;
loadQ();
}

function loadQ(){
let q = questions[currentLevel][index];

document.getElementById("question").innerText=q.q;

let optDiv=document.getElementById("options");
optDiv.innerHTML="";

q.o.forEach(op=>{
let b=document.createElement("button");
b.innerText=op;
b.onclick=()=>check(op);
optDiv.appendChild(b);
});
}

function check(ans){
let correct=questions[currentLevel][index].a;

if(ans===correct){
score++;
document.getElementById("score").innerText=score;
document.getElementById("msg").innerText="Correct!";
document.querySelector(".puzzle").classList.remove("hidden");
generatePuzzle();
}else{
document.getElementById("msg").innerText="Try Again!";
}
}

function generatePuzzle(){
let grid=document.getElementById("grid");
grid.innerHTML="";

let layout=layouts[currentLevel][Math.floor(Math.random()*layouts[currentLevel].length)];

layout.forEach(c=>{
let d=document.createElement("div");
d.classList.add("cell");
if(c)d.classList.add(c);
grid.appendChild(d);
});

addDrag();
}

function addDrag(){
let cells=document.querySelectorAll(".cell");

cells.forEach(c=>{
c.onmousedown=()=>{selected=getColor(c);isDragging=true;paint(c);};
c.onmouseover=()=>{if(isDragging)paint(c);};
c.onmouseup=()=>{isDragging=false;checkWin();};
});
}

function getColor(c){
if(c.classList.contains("red"))return"red";
if(c.classList.contains("blue"))return"blue";
if(c.classList.contains("green"))return"green";
if(c.classList.contains("yellow"))return"yellow";
return null;
}

function paint(c){
if(selected)c.style.boxShadow="0 0 20px "+selected;
}

function checkWin(){
document.getElementById("msg").innerText="Puzzle Done!";
document.getElementById("nextBtn").classList.remove("hidden");
}

document.getElementById("nextBtn").onclick=()=>{
index++;
document.querySelector(".puzzle").classList.add("hidden");
loadQ();
};