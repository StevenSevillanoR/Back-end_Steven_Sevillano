//Funciones para inicializar la actividad en el servidor y comunicación con el cliente

$(function(){
  let Assets = {
    formulario: $("#formulario"),
    $btnMostrarTodos: $('#mostrarTodos'),
    contAssets: $('#assets'),

    Init: function(){
      let self = this
      self.mostrarTodos()
      self.cargarSelect()
      self.formulario.submit(e=>{
        e.preventDefault()
        self.buscarAssets()
      })
    },
    cargarSelect: function(){
      $('select').material_select()
    },
    //Esta funcion se activa al presionar el boton de Mostrar Todos y 
    mostrarTodos: function(){
      let self = this
      self.$btnMostrarTodos.on('click', function(e){
        let datos = {todos: ""}
        self.ajaxRequest(datos)
      })
    },
    //Funcion para buscar los bienes filtrados
    buscarAssets: function(){
      let self = this
      let ciudad = $('form').find('select[id="selectCiudad"]').val();
      let tipo = $('form').find('select[id="selectTipo"]').val();
      let from = self.numCompleto($('.irs-from').text())
      let to = self.numCompleto($('.irs-to').text())

      let datos = {ciudad: ciudad, tipo: tipo, from: from, to: to}
      self.ajaxRequest(datos)
    },
    //Funcion que envía la peticion al servidor para obtener los datos
    ajaxRequest: function (datos){
      let self = this
      $.ajax({
        url: 'buscador.php',
        data: datos,
        type: 'POST',
      }).done(function(data){
        let newData = JSON.parse(data)
        //console.log(newData)
        self.renderizarAssets(newData)
      })
    },
    numCompleto: function(num){
      let numero = num
      let nuevoNum = Number(numero.replace('$','').replace(',','').replace(' ',''))
      return nuevoNum
    },
    //Funcion que muestra los datos en pantalla
    renderizarAssets: function(assets){
      console.log(assets)
      let self = this
      let asset = assets 
  
      let assetModelo = []
      asset.forEach(element => {
        
        assetModelo += `
        <div class="itemMostrado card">
          <img src="img/home.jpg">
          <div class="col s6">
            <p><b>Dirección: </b>${element.Direccion}</p>
            <p><b>Ciudad: </b>${element.Ciudad}</p>
            <p><b>Teléfono: </b>${element.Telefono}</p>
            <p><b>Código Postal: </b>${element.Codigo_Postal}</p>
            <p><b>Tipo:</b> ${element.Tipo}</p>
            <p><b>Precio: </b>${element.Precio}</p>  
          </div>
          <div class="divider col s12"></div> 
          <div class="card-action right-align col s12">
            <a href="#" class="right-align">Ver más</a>
          </div>                    
        </div>`;
      });
      
      //console.log(assetModelo)
      self.contAssets.html('')
      self.contAssets.append(assetModelo)
    },

  }
  Assets.Init()
})