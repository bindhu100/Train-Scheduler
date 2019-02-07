
$(document).ready(function(){
var config = {
    apiKey: "AIzaSyBdB_0wLRPwMmrVUuAME1aBWJgl213jQxU",
    authDomain: "train-scheduler-3a6cf.firebaseapp.com",
    databaseURL: "https://train-scheduler-3a6cf.firebaseio.com",
    projectId: "train-scheduler-3a6cf",
    storageBucket: "train-scheduler-3a6cf.appspot.com",
    messagingSenderId: "143833682197"
  };
  firebase.initializeApp(config);

  // variable to referacnce the firebase database
  var database = firebase.database();

  // variable for click event
  // var name;
  // var destination;
  // var firstTrain;
  // var frequency = 0;

  //  button for adding train
  $("#add-train-btn").on("click", function(){
    event.preventDefault();
  

    // for storing and retrieving the most recent data .
    var name = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain  = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();

    // Uploads employee data to the database
    database.ref().push({
      name: name,
      destination: destination,
      firstTrain:firstTrain,
      frequency,frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP

    });
    $("form")[0].reset();


    // to clear the user input text box after click"Submit button
    function ClearFields() {

      document.getElementById("train-name").value = "";
      
  }
  ClearFields();
  });

  // Create Firebase event for adding traiin to the database and a row in the html when  adds an entry
  // 9999999999999999999999999999
  // clock
  var datetime = null,
        date = null;

var update = function () {
    date = moment(new Date())
    datetime.html(date.format('h:mm:ss a'));
};

$(document).ready(function(){
    datetime = $('#time')
    update();
    setInterval(update, 1000);
})
  // 999999999999999999999999

  database.ref().on("child_added", function(childSnapshot) {




    // add data to tbody in html "<tbody id="add-newRow"> </tbody>"
    $("#add-newRow").append("<tr><td>" + childSnapshot.val().name+
    "</td><td>" + childSnapshot.val().destination +
    "</td><td>" + childSnapshot.val().frequency +"</td><td>");

    
     // Handle the errors
    },function(errorObject){
      console.log("Errors handled: " + errorObject.code);
     
    });
    
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // Change the HTML to reflect
      $("#train-name").html(snapshot.val().name);
      $("#destination").html(snapshot.val().destination);
      $("#first-train").html(snapshot.val().firstTrain);
      $("#frequency").html(snapshot.val().frequency);
      
  });

  
});
    
  

  




