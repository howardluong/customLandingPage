$(document).ready(function(){

  var weatherAPI = "http://api.openweathermap.org/data/2.5/forecast?id=6066513&units=metric&APPID=78f2c67d744c78bc0d36c249506ee56c&units=metric";

  $.getJSON(weatherAPI, function(weatherJSON){
    //weatherJSON is pretty much the JSON object.
    var roundedTemp = Math.round(weatherJSON.list[0].main.temp);
    //Access the data from the JSON like this. Keep note that JSON is normally an array of Objects
    $("#weatherDisplay").append("Today's Weather:");
    $("#mainForecast").append(weatherJSON.list[0].weather[0].description.toUpperCase());
    $("#city").append(weatherJSON.city.name);
    $("#tempToday").append(roundedTemp + '<b>&#8451</b>');
    $("#weatherIcon").append('<img src =' + "http://openweathermap.org/img/w/" + weatherJSON.list[0].weather[0].icon + ".png" + '>');
  });

  var quoteAPI = "https://random-quote-generator.herokuapp.com/api/quotes/";

  $.getJSON(quoteAPI, function(quoteJSON) {
    var randomQ = Math.floor(Math.random() * quoteJSON.length);
    $("#randomQuote").append(quoteJSON[randomQ].quote);
  });

});

//Vue Data

var userGreeting = new Vue({
  el: '#userGreeting',
  data: {
    message: 'Good day, Howard',
  }
});

var dateAndAgenda = new Vue({
  el: '#dateAndAgenda',
  data: {
    plans: 'What is your agenda for today?'
  }
})

var quoteAndToDos = new Vue({
  el:'#quoteAndToDos',
  data: {
    title: 'Goals for today',
    lists: [],
    //Example: When the addItem method gets called, this lists array above would contain {id:id, item: 'Whatever that was entered in the input field'}
    newItem: '',
  },
  methods: {
    addItem: function(){
      //generate and ID
      let id = this.lists.length + 1
      if(this.newItem !== ''){
        //create a new list of instances
        const newList = {id:id,item:this.newItem}
        //add this to the array
        this.lists.push(newList)
        //turn the newItem back to an empty string
        this.newItem =''
      }
    },
    removeItem: function(index){
      this.lists.splice(index, 1)
    }
  }
})
//Wunderground API Key is - e7bc662dab2b44f1
//https://www.wunderground.com/weather/ca/markham

//OpenWeatherMapApi Key/Url is - http://api.openweathermap.org/data/2.5/forecast?id=6066513&APPID=78f2c67d744c78bc0d36c249506ee56c

//Date Section//

function currentFullDate(){

  var daylist = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  var currentDate = new Date();

  var currentYear = currentDate.getFullYear();

  var currentDay = currentDate.getDate();

  var currentDayIndex = currentDate.getDay();

  var Today = daylist[currentDayIndex];

  var monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var monthIndex = currentDate.getMonth();

  var currentMonth = monthList[monthIndex];
  
  return Today + ', ' + currentMonth + ', ' + currentDay + ', ' + currentYear;
}

document.getElementById('today').innerHTML = currentFullDate();