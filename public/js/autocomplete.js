window.onload = function() {
  $(function() {
    $( "#search" ).autocomplete({
   minLength: 0,
   source: function( request, response ) {
        $.ajax({
          url: window.location.pathname+"/search",
          dataType: "json",
          data: {
            q: request.term
          },
          success: function( data ) {
            response( data );
          }
        });
      },
   focus: function( event, ui ) {
      $( "#search" ).val( ui.item.name );
         return false;
      },
   select: function( event, ui ) {
      $( "#search" ).val( ui.item.name );
      return false;
   }
})
.data( "ui-autocomplete" )._renderItem = function( ul, item ) {
   return $( "<li>" )
   .append( "<a href='"+window.location.pathname+"/characters/"+item.name+"'>" + item.name +"</a>" )
   .appendTo( ul );
};
});


}