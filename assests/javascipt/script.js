var firebaseConfig = {
    apiKey: "AIzaSyDvSILNq25cnVHVYK4WAbXC-Db0_LLO7As",
    authDomain: "train-scheduler-128b8.firebaseapp.com",
    databaseURL: "https://train-scheduler-128b8.firebaseio.com",
    projectId: "train-scheduler-128b8",
    storageBucket: "train-scheduler-128b8.appspot.com",
    messagingSenderId: "108453264245",
    appId: "1:108453264245:web:875188898efa019ed0b13c"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

 //variable to store database name reference to firebase
 var trainData = firebase.database();

 $("#addTrainBtn").on("click",function(){
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("x");
    var frequency = $("#frequencyInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency

    }
    trainData.ref().push(newTrain);

    alert("Train Added!");
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    return false;
 })

 trainData.ref().on("child_added",function(snapshot){
     var name = snapshot.val().name;
     var destination = snapshot.val().destination;
     var frequency = snapshot.val().frequency;
     var firstTrain = snapshot.val().firstTrain;

     var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
     var minutes = frequency - remainder;
     var arrival = moment().add(minutes,"m").format("hh:mm A");

     console.log(remainder);
     console.log(minutes);
     console.log(arrival);

     $("#trainTable > tBody").append("<tr><td>"+name+"<tr><td>"+destination+"<tr><td>"+frequency+"<tr><td>"+arrival+"<tr><td>"+minutes+"<tr><td>");

 })

