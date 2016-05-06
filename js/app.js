function showDishes() {
  $.ajax({
    url: 'http://localhost:3000/api/dishes'
  }).done(function(dishes) {

    _.each(dishes, function(dish) {

      var template = $('#dishes-template').html();
      var templateFunction = Handlebars.compile(template);

      var html = templateFunction({
        name: dish.name,
        id: dish.id,
        image_url: dish.image_url,
        like_count: dish.like_count
      });

      var $newDiv = $(html);
      $('.list').append($newDiv);

    });
  });
}

showDishes();

$('.list').on('click', '.item', function(event) {

    $('.list').empty();
    var $item = $(event.target).closest('.item');
    var dishId = $item.data('dish-id');
    console.log(dishId);

    $.ajax({
      url: 'http://localhost:3000/api/dishes/' + dishId
    }).done(function(dish) {
      console.log(dish);

      var template = $('#show-dish-template').html();
      var templateFunction = Handlebars.compile(template);

      var html = templateFunction({
        name: dish.name,
        id: dish.id,
        image_url: dish.image_url,
        like_count: dish.like_count
      });

      var $newDiv = $(html);
      $('.list').append($newDiv);

  })

  console.log(this);

})

$('.back').on('click', function() {
  $('.list').empty();
  showDishes();
})
