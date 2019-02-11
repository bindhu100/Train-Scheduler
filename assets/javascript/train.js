
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

 

  //  button for adding train
  $("#add-train-btn").on("click", function(){
    event.preventDefault();
  

    // for storing and retrieving the most recent data .
    var name = $("#train-name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain  = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();
    
    // input validation form- if any of the input field are missing give an alert
    if (!name || !destination || !firstTrain || !frequency) {
      alert("Please enter a valid response in all fields!");
    } else {
  
      // Uploads employee data to the database
      database.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
        

      });
      $("form")[0].reset();
      
      // 
      // popup message
      $(".popmessage").text("Train Added Successfully!!!")
      var fade_out = function() {
        $(".popmessage").empty();
        }
      
        setTimeout(fade_out, 4000);

      renderButtons();

      ClearFields();
    }
    // 

    // to clear the user input text box after click"Submit button
    function ClearFields() {

      document.getElementById("train-name").value = "";
      
  }
  // ClearFields();
  });

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
    
    var minAway;

     // First Time (pushed back 1 year to make sure it comes before current time)
     var firstTimeConverted = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");

     // Difference between the times
     var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

     // Time apart (remainder)
     var remainder = diffTime %  childSnapshot.val().frequency;

     // Minute Until Train
    var minAway = childSnapshot.val ().frequency - remainder;

    // Next Train
    var nextTrain = moment().add(minAway, "minutes");
    nextTrain = moment(nextTrain).format("hh:mm");


    // add data to tbody in html "<tbody id="add-newRow"> </tbody>"
    $("#add-newRow").append("<tr><td>" + childSnapshot.val().name+
    "</td><td>" + childSnapshot.val().destination +
    "</td><td>" + childSnapshot.val().frequency +
    "</td><td>"+ nextTrain +
    "</td><td>" + minAway + "</td></tr>")

    // 
  //   $('#add-newRow1').on('click', 'input[type="button"]', function () {
  //     $(this).closest('tr').remove();
  // })
  // $('p input[type="button"]').click(function () {
  //     $('#myTable').append('<tr><td><input type="text" class="fname" />/td><td><input type="button" value="Delete" /></td></tr>')
  // });
    // 


    
     // Handle the errors
    },function(errorObject){
      console.log("Errors handled: " + errorObject.code);
     
    });


    // 3333333333333333333333333333333
 
    // 3333333333333333333333333333
    
    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // Change the HTML to reflect
      $("#train-name").html(snapshot.val().name);
      $("#destination").html(snapshot.val().destination);
      $("#first-train").html(snapshot.val().firstTrain);
      $("#frequency").html(snapshot.val().frequency);
      
  });

  
});
    
  

  




