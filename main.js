
var objects = [];
var estatus = "";

function preload() 
{
  video = createVideo('video.mp4');

}
function setup() 
{
  canvas = createCanvas(640, 420);
  canvas.position(523,270)
    video.hide();
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("estatus").innerHTML = "El modelo se esta cargando";
}

function modelLoaded()
{
   console.log("modelo cargado espero... ._. ");
   estatus = true;
   video.loop();
   video.speed(1);
   video.volume(0);
}

function gotResults(error,results)
{
   if(error)
   {
     console.log(error);
   }
   else
   {
     console.log(results);
     objects = results;
   }
}

function draw() 
{
  //background("gray");
  image(video,0,0,640,420);
  if(estatus != "")
  {
    objectDetector.detect(video, gotResults);
    for (i = 0; i < objects.length; i++) {
      document.getElementById("estatus").innerHTML = "Estado: objeto detectado";
      document.getElementById("num_objetos").innerHTML = "Número de objetos detectados: "+ objects.length;

      fill("#FF0000");
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
      noFill();
      stroke("#FF0000");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
  }
}


