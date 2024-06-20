$(document).ready(function(){

    $('button#search').click(function(){

        const forcastLocation = $('input#search-location').val();

        getForcastWeather(forcastLocation);
    })

    // do an HTTP request with Get method to get forcast weather data
    function getForcastWeather(location){
        const url = 'https://api.weatherapi.com/v1/forecast.json';
        const apiKey = 'key=3e43d9d33ab64815bb793726240404';
        const forcastLocation = '&q='+ location;
        const days = '&days='+2;
        const field = ['&aqi=no','&alerts=no'];

        let fieldString = field.join('');

        //console.log(url+'?'+apiKey+forcastLocation+days+fieldString);

        $.ajax({
            'url' : url+'?'+apiKey+forcastLocation+days+fieldString,
            'type' : 'GET',
            'success' : function(response){
                //console.log(response);
                drowSection(response)
            },
            'error' : function(xhr,status,error){
                console.log(status,error)
            }
        })

    }

    //drow section forecast weather
    function drowSection(data){
        $('section#search-weather div#result').remove();
        $('section#search-weather').children().append("<div class='row justify-content-center' id='result'></div>");

        $('section#search-weather div#result').append('<p class="text-center">' + data.location.name+' - '+ data.location.region + ' - '+ data.location.country +'</p>');


        let forecasts = data.forecast.forecastday;
        console.log(forecasts)

        $(forecasts).each(function(index){
            $('section#search-weather div#result').append('<div class=" col-12 col-lg-4">  <div class="forecast-card text-center"> </div> </div>');
        })

        $('section#search-weather .forecast-card').each(function( index ){
            $(this).html(`
                <table class="mx-auto table">
                    <tr> 
                        <td class="px-2"> Mattina </td> 
                        <td class="px-2"> ${forecasts[index].hour[9].condition.text} </td> 
                        <td class="px-2"> ${forecasts[index].hour[9].temp_c} °C</td> 
                    <tr>
                    <tr> 
                        <td class="px-2"> Pomeriggio </td> 
                        <td class="px-2"> ${forecasts[index].hour[16].condition.text} </td> 
                        <td class="px-2"> ${forecasts[index].hour[16].temp_c} °C</td> 
                    <tr>
                    <tr> 
                        <td class="px-2"> Sera </td> 
                        <td class="px-2"> ${forecasts[index].hour[21].condition.text} </td> 
                        <td class="px-2"> ${forecasts[index].hour[21].temp_c} °C</td> 
                    <tr>
                </table>
            `
            );
            $(this).prepend('<p> MIN °C : '+ forecasts[index].day.mintemp_c +' // MAX °C : '+ forecasts[index].day.maxtemp_c +'</p>');
            $(this).prepend('<p>'+ forecasts[index].date+'</p>')
        })  
    }

})