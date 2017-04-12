$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('#input1');
      var username = $('#input2');
      var todoDate =$('#set-date');
      var todo = {item: item.val(), username: username.val(),todoDate: todoDate.val()};

      $.ajax({
        type: 'POST',
        url: '/todo',
        data: todo,
        success: function(data){

          location.reload();
        }
      });

      return false;

  });

  $('li').on('click', function(){
      var item = $(this).text().replace(/ /g, "-");
      console.log(item);
      $.ajax({
        type: 'DELETE',
        url: '/todo/' + item,
        success: function(data){

          location.reload();
        }
      });
  });

});
