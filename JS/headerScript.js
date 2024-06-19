$(document).ready(function(){
	
    // Header accordion on click of the hamburger
    $('i#my-icon-collapse').click(function(){
        $('#my-nav-collapse').slideToggle();
    })

    // My header active element
    $( "header nav li" ).each(function() {
        $(this).click(function(){

            $( "header nav li" ).each(function(){
                $(this).children().removeClass('active');
            })

            $(this).children().addClass('active');
            let textActiveContent = $(this).children().text()

            $( "header nav li" ).each(function(){
                if( $(this).children().text() == textActiveContent){
                    $(this).children().addClass('active');
                }
            })    
        })

        

      });
})

