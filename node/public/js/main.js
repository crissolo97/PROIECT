$(document).ready(function(){
  #('.delete-utilizator').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type : 'DELETE',
      url : '/registers/'+id,
      succes : function(response){
        alert('Deleting Utilizator');
        window.location.href = '/';
      },
      error : function(err){
        console.log(err);
      }
    });
  });
});
