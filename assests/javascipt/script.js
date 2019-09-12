// Initialize Firebase
var config = 
{
    apiKey: "AIzaSyDvSILNq25cnVHVYK4WAbXC-Db0_LLO7As",
    authDomain: "train-scheduler-128b8.firebaseapp.com",
    databaseURL: "https://train-scheduler-128b8.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "108453264245"
};
  
 firebase.initializeApp(config);

 //variable to store database name
 var database = firebase.database();

 //Object to store entire firebase database as JSON object 
 var firebaseDataObject = null;

 //variable to store key of object to update.
 var updateKey;

 //variable to hold input values
 var name;
 var destination;
 var time;
 var frequency;

// train object constructor
 function Train(name, destination, firstTrainTime, frequency)
 {

    this.name = name;
    this.destination = destination;
    this.firstTrainTime = firstTrainTime;
    this.frequency = frequency;

 };//END Train object constructor

//===================================================================================================

$(document).ready(function(){

    //When page loads diplays initial current time
    $("#current-time").text(moment().format("MMM DD hh:mm A"));

    //Updates 'current time', 'next arrival' and 'minutes away' on page every 1 minute
    setInterval(function(){

        $("#current-time").text(moment().format("MMM DD hh:mm A"));
        displayTrainSchedule();

    },60000);

    //Firebase database 'event handler' triggered when change in database "value".
    database.ref().on("value",function(data){
        
        firebaseDataObject = data.val();
        displayTrainSchedule();         
    }, 
    //Function executes on error
    function(objectError)
    {
        console.log("error:" + objectError.code);
    });

});//END $(document).ready;

//==========================================================================================

$("#submit-btn").on("click", function(event){

    event.preventDefault();

    //gets inputs. if valid creates newTrain object using values and pushes to firebase database.
    if(getInputValues())
    {

        //Creates a string with todays date and time of 'time';
        var firstTrainTime = firstTimeString(time);

        //Creates a new 'train' object from the user input values 
        var newTrain = new Train(name, destination, firstTrainTime, frequency);
            
        //Pushes "newTrain" object to firebase database.
        database.ref().push( newTrain );        

    }

});//END #submit-btn on."click"

//====================================================================================

//on."click" for remove icon
//Document .on("click" event handler for .remove buttons
$(document).on("click", ".remove", function()
{
    //confirmation box shown before train is removed.
    var con = confirm("Are you sure you want to remove train?");  
    
    //if user clicks 'OK' on confirmation box, train is removed.
    if(con == true)
    {
        //Gets "key" attribute of button which is trains "key";
        var key = $(this).attr("key");

        //removes 'train' object with "key" from firebase database.
        database.ref().child(key).remove();
    }

});//END document.on"click", ".remove"

//====================================================================================

//on."click" for update icon
$(document).on("click", ".update", function()
{
    //Gets "key" attribute of button which is trains "key";
    updateKey = $(this).attr("key");
    displayUpdate()

});//END document.on"click", ".update"
