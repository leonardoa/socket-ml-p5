
let classifier;
let imageModelURL = "https://teachablemachine.withgoogle.com/models/2MJqEs31F/";

let video;
let flippedVideo;
let label = "";
let value = "";
let ready = false;
let socket;
let confidence = 0;

let server = 'https://192.168.1.100:3000/'
// let server = 'localhost:3000'

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(320, 260);
  
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  classifyVideo();


  //setup
  // Start the socket connection
	socket = io.connect(server)

	// // Callback function
	// socket.on('mouse', data => {
	// 	stroke(data.color)
	// 	strokeWeight(data.strokeWidth)
	// 	line(data.x, data.y, data.px, data.py)
	// })

}

function draw() {
  ready = true;
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);

  //socket emit label value
  if (ready) {
    socket.emit('label', {label : label, confidence : confidence})
    console.log(label)
  }

}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  confidence = results[0].confidence;
  classifyVideo();
}
