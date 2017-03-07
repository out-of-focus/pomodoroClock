$(document).ready(function() {
  var session = 25;
  var rest = 5;
  var sec = 0;
  var mins = 25;
  var period = true;
  var countdown;
  var vocal = new Audio("picSnd/vocal__stephooo2.wav");
  var img = new Image();//document.createElement("img");
  img.src = 'picSnd/pomidor_blady.png';
  var canvas = document.getElementById("circle");
  var heightPortion = 200/session/60;
  var ctx = canvas.getContext("2d");
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#DE2C23";
  //imgL.onload=function(){ctx.drawImage(img,0,0);};
  document.getElementById("breakLeng").oninput = check;
  document.getElementById("sessionLeng").oninput = check;

  function check() {
    var checkNum = /\D/.test(this.value);
    if(checkNum){
    alert ("Specify the session length and break length in whole minutes, using numbers only.");
     if(this==document.getElementById("breakLeng")){this.value=5};
     if(this==document.getElementById("sessionLeng")){this.value=25};
     this.focus()} 
    else {
    session = document.getElementById("sessionLeng").value;
    rest = document.getElementById("breakLeng").value;
    document.getElementById("time").innerText = session.toString()+":00";
    heightPortion = 200/(session*60);
    sec = 0; mins = session; period = true; ctx.clearRect(0, 0, 195, 200);
    }
  };
  var timerDiv = document.getElementById("clock");
  var timeDisp = document.getElementById("time");
  timerDiv.onclick = timer;

  function timer() {
    if ($("#clock").hasClass("paused")) {
      timerCount();
      $("#clock").removeClass("paused");
    } else {
      stop();
      $("#clock").addClass("paused");
    }
  }

  function timerCount() {
    countdown = setInterval(function() {
      if (mins == 0&&sec==0) {
        vocal.play();
        changePeriods();
      }
      if (sec == 0) {
          mins -= 1;
          sec = 60
      };
      sec -= 1;
        if (sec > 9) {
          timeDisp.innerText = mins + ":" + sec;
        } else {
          timeDisp.innerText = mins + ":0" + sec;
        };
       draw();
    }, 1000)
  }

  function stop() {
    clearInterval(countdown);
  };
function draw() {
  if(period){
  var wholeTime = session*60;
  ctx.clearRect(0, 0, 195, 200);
  var high=200-(wholeTime-sec-mins*60)*heightPortion;
  ctx.drawImage(img,0,0,195,high,0,0,195,high);}
  else{
    var wholeTime = rest*60;
    ctx.clearRect(0, 0, 195, 200);
    var high=(wholeTime-sec-mins*60)*heightPortion;
    ctx.drawImage(img,0,0,195,high,0,0,195,high); }
};
 function changePeriods() {
   if(period){
   document.getElementById("period").innerText="Break:";
   period = false;
   mins = rest;
   sec = 0;
   heightPortion = 200/rest/60;
   } else {
     document.getElementById("period").innerText="Session:";
     period = true;
     heightPortion = 200/session/60;
     mins = session; sec = 0; }
 } 
  })