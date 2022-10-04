import { Timer } from "./js/timer.js";

let count = 0;
let timer = new Timer();



let canvas2d = document.getElementById("myCanvas").getContext("2d");

canvas2d.beginPath();
canvas2d.arc(300,200,70,0,2 * Math.PI );
canvas2d.fillStyle = "blue";
canvas2d.fill();
canvas2d.stroke();

let x = document.getElementById("myCanvas").getContext("2d");
x.arc(300,200,100,0,2 * Math.PI );
x.stroke();




