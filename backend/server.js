var bonescript = require('bonescript');
var Firebase = require('firebase');
// var greenBean = require("green-bean");

var led = "P8_13";
var currentAnalogVal = 0;

function main(){
	var ref = new Firebase('https://iot-firebase.firebaseio.com');
	var lightRef = ref.child('led');
	var ambientRef = ref.child('ambient');
	var fridgeRef = ref.child('appliances/refrigerator');
	var rangeRef = ref.child('appliances/range');

	// LED Firebase Callback
	lightRef.on('value', function(snapshot){
		// Update the LED value 
		var state = snapshot.val();

		// Set the LED value via bonescript
		bonescript.pinMode(led, bonescript.OUTPUT);
		bonescript.digitalWrite(led, state);

		// Log the output
		console.log('Updating the state of the LED to ' + state);
	});

	// Read analog measurement every second
	var timer = setInterval(function(){
		bonescript.analogRead('P9_36', function(analogVal){
			if (currentAnalogVal !== analogVal.value) {
				ambientRef.push({value:analogVal.value, timestamp:Firebase.ServerValue.TIMESTAMP});
				currentAnalogVal = analogVal.value;
			}
		});
	}, 1000);

	// Fridge Greenbean Callback
	// greenBean.connect("refrigerator", function (refrigerator) {
	// 	// Subscribe to the temp alert
	// 	refrigerator.temperatureAlert.subscribe(function (value) {
	// 		fridgeRef.child('temperatureAlert').set(value);
	// 		console.log("temperature alert:", value);
	// 	});

	// 	// Subscribe to the door state alert
	// 	refrigerator.doorState.subscribe(function (value) {
	// 		fridgeRef.child('doorState').set(value);
	// 		console.log("door state changed:", value);
	// 	});
	// });

	// Range Greenbean Callback
	// greenBean.connect("range", function(range) {
	// 	range.lightBar.read(function(value) {
	// 		console.log("light bar is:", value);
	// 	});

	// 	range.lightBar.subscribe(function(value) {
	// 		console.log("light bar changed:", value);
	// 	});
	// });

	//Range Firebase Callback
	// rangeRef.on('value', function(snapshot){
	// 	greenBean.connect("range", function(range) {
	// 		range.lightBar.write(snapshot.val());
	// 	});
	// });
}

main();