/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

inicializarSlider();
playVideoOnScroll();

$("#mostrarTodos").click(function(){
  showAllInfo();
})

function showAllInfo(data){
  //event.preventDefault();
  $.ajax({
    url: './index.php',
    dataType: 'json',
    cache: false,
    contentType: false,
    processData: false,
    data: data,
    type: 'post',
    success: function(data){
      if (data!="") {
        mostrarTodo(data);
      }else {
        window.location.href = 'index.html';
      }
    },
    error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }
  })
}

function mostrarTodo(data){
  for (var i = 1; i<data.length; i++) {
    $(".colContenido").append(`
    <div class="itemMostrado card">
        <img src="img/home.jpg">
        <div class="col">
          <p><b>Dirección:</b>${data.Direccion}</p>
          <p><b>Ciudad:</b>${data.Ciudad}</p>
          <p><b>Teléfono:</b></p>
          <p><b>Código Postal:</b></p>
          <p><b>Tipo:</b></p>
          <p><b>Precio:</b></p>  
          <div class="divider"></div>
        </div>                     
      </div>`);
  }  
}