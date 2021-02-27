// Task 1
for (let i = 0; i < 5; i++) {
    $("body").append(`<div data-counter="0">0</div>`);
    $("div").css({"backgroundColor": "yellow", "width": "100px", "height": "100px", "text-align": "center"});
    $("body").append('<button class="plus" type="button">+</button>');
    $("body").append('<button class="minus" type="button">-</button>');
    $("button").css({"margin-bottom": "20px", "text-align": "center"});

}
$(".plus").on("click", function () {
    let counter = $(this).prev().attr('data-counter');
    $(this).prev().text(++counter);
    $(this).prev().attr('data-counter',counter);

});

$(".minus").on("click", function () {
    let counter = $(this).prev().prev().attr('data-counter');
    if (counter > 0) {
        $(this).prev().prev().text(--counter);
        $(this).prev().prev().attr('data-counter',counter);
    }
});