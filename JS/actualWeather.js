$(document).ready(function(){
	
    $('button#update').click(function(){
        
        let location = $('input#location').val();

        getActualData(location);
        console.log('ciao');
    })
    
    
    // do an HTTP request with Get method to get actual weather data
    function getActualData($location){
        const url = ' https://api.weatherapi.com/v1/current.json';
        const apiKey = 'key=3e43d9d33ab64815bb793726240404';
        const myLocation = '&q='+$location;
        const field = '&aqi=no'

        $.ajax({
            'url' : url+'?'+apiKey+myLocation+field,
            'type' : 'GET',
            'success' : function(response){
                console.log(response);
                drowSection(response)
            },
            'error' : function( xhr,status,error){
                console.log(status,error)
            }
        })

        console.log(url+apiKey+myLocation+field)
    }

    //drow section actual weather
    function drowSection(data){
        $('section#actualWeather div.row').remove();
        $('section#actualWeather').children().append("<div class='row'></div>");

        $('section#actualWeather div.row').append("<div class='col-12 col-md-6 col-sx'></div>")
        $('section#actualWeather .col-sx').append('<p>' + data.location.name+' - '+ data.location.region + ' - '+ data.location.country +'</p>');
        $('section#actualWeather .col-sx').append('<p> °C : ' + data.current.temp_c + '</p>')
        $('section#actualWeather .col-sx').append('<p> Umidità : ' + data.current.humidity + ' %</p>')

        $('section#actualWeather div.row').append("<div class='col-12 col-md-6 col-dx'></div>")
        $('section#actualWeather .col-dx').append('<p>' + data.current.condition.text +'</p>')
        $('section#actualWeather .col-dx').append("<img src='https://" + data.current.condition.icon + "'>"); 

    
        
        
    }

})