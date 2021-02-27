// Task 2
for (let i = 0; i < 5; i++) {
    $('body').append('<div>');
    $('div').css({'width': '100px', 'height': '100px', 'border' : '1px solid black'});
}

$('div').on('click', function (){
    switch ($(this).css('backgroundColor')){
        case ('rgb(0, 0, 255)'):
            $(this).css('background-color', 'green');
            $('body').append($(this));
            break;
        case ('rgb(0, 128, 0)'):
            $(this).css('background-color', 'yellow');
            $('body').append($(this));
            break;
        case ('rgb(255, 255, 0)'):
            $(this).css('background-color', '');
            $('body').append($(this));
            break;
        default:
            $(this).css('background-color', 'blue');
            $('body').append($(this));
    }
})
