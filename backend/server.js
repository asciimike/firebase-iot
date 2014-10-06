var bonescript = require('bonescript');
var Firebase = require('firebase');
// var greenBean = require("green-bean");

var led = "P8_13";

function main(){
	console.log('hello, world!');

	var ref = new Firebase('https://iot-firebase.firebaseio.com');
	var lightRef = ref.child('led');
	var tempRef = ref.child('temperature');
	var fridgeRef = ref.child('appliances/refrigerator');
	var rangeRef = ref.child('appliances/range');

	// LED Firebase Callback
	lightRef.on('value', function(snapshot){
		// Update the LED value 
		var state = snapshot.val();
		console.log('Updating the state of the LED to ' + state);
		bonescript.pinMode(led, bonescript.OUTPUT);
		bonescript.digitalWrite(led, state);
	});

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