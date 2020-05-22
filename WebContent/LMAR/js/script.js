document.addEventListener('DOMContentLoaded', function (event) {
  //Primero los datos
  createHTML();
  document.getElementById("mainContainer").addEventListener('click', function (event) {
    Like(event);
  });
  document.getElementById("mainContainer").addEventListener("click", showInfo);
  

})
function createHTML() {
  $.ajax({
    url: 'http://localhost:8080/KomikilandiaV2/ApiComics',
    datetype: 'json',

    success: function (myJsonObject) {

      console.log(myJsonObject);
      var rowOpenHTML = "<div class='row justify-content-center'>"
      var colOpenHTML = "<div class='col-m-3 m-1' >"
      var myHTMLcode = "";

      myHTMLcode = rowOpenHTML;

      for (let i = 0; i < myJsonObject.length; i++) {

        myHTMLcode += colOpenHTML;

        myHTMLcode += '<div class="card" style=" width: 18rem; ">\
            <img src="'+ myJsonObject[i].imagen + '" class="card-img-top" alt="..." height="400">\
            <div class="card-body text-center">\
                <h5 class="card-title">'+ myJsonObject[i].nombre + '</h5>\
                <p class="card-text">'+ myJsonObject[i].titulo + '</p>\
                <button type="button" class="btn btn-primary"  data-toggle="modal" data-id='
          + myJsonObject[i].id
          + ' data-target="#myModal">Más info</button></div>\
                <a href="#" class="btn btn-white" data-tipo="like" data-id="' + myJsonObject[i].id + '"><img src="img/img-mg.png" class=" " width="25%"> : ' + myJsonObject[i].num_likes + '</a>\
            </div></div>';
      }

      myHTMLcode += "</div>";
      document.getElementById("mainContainer").innerHTML += myHTMLcode;
    },
    error: function (xhr) {
      alert("AJAX error : " + xhr.status + " " + xhr.statusText);
    }
  });

}

function Like(event) {

  console.log(event);

  var clickedButton = event.target;

  if (clickedButton.dataset.tipo == "like") {
    if (clickedButton.dataset.id != null) {

      $.ajax({
        type: 'POST',
        data: { 'id': clickedButton.dataset.id },
        url: 'http://localhost:8080/KomikilandiaV2/ApiUpdateLikes',
        dataType: 'text', //specifying here the response type, there's no need to parse the response.

        success: function (response, status, xhr) {
          if (xhr.status == 200) {
            alert("Like sumado " + xhr.statusText);
            window.location.href = "index.html";
          }
        },
        error: function (xhr) {
          alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
        }
      });

    }
  } else if (clickedButton.dataset.tipo == "info") {
    alert("No se han sumado los likes");
  }

}

function showInfo() {

  if (event.target.dataset.id != null) {
    $.ajax({
      url: 'http://localhost:8080/KomikilandiaV2/ApiComic?id=' + event.target.dataset.id,
      dataType: 'json',
      success: function (myJsonObject) {

        showmodal(myJsonObject);
      },
      error: function (xhr) {
        alert("An AJAX error occured: " + xhr.status + " "
          + xhr.statusText);
      }
    });
  }
}
function showmodal(myJsonObject) {

  var modalHeaderHTML = "<h4 class='modal-title'>" + myJsonObject.nombre
    + "</h4><br>  <b><p>" + myJsonObject.titulo + " | </b>"
    + myJsonObject.id + " Número</p><br><p>Data: "
    + myJsonObject.fecha_publicacion + "| Genero: "
    + myJsonObject.genero.nombre + "</p><br><p><b>Número de likes: "
    + myJsonObject.num_likes + "</b></p>";
  var modalBodyHTML = "<img height='100%' width='100%' src='"
    + myJsonObject.imagen + "'>";
  var modalFooterHTML = "<button class='btn btn-lg btn-danger' onclick='deleteComic("+ myJsonObject.id+ ")'> <div style='text-align:center;'><i class='fa fa-trash'></i></div> Delete</button>"

    + "<button class='btn btn-lg btn-warning' data-target='#myModal2' data-toggle='modal' data-dismiss='modal' onclick='fillModal(" + myJsonObject.id + ")'><i class='fa fa-ban'></i>Update</button>"

    + "<button type='button' class='btn btn-primary btn-lg' data-dismiss='modal'>Close</button>";


  document.getElementById("modal-header").innerHTML = modalHeaderHTML;
  document.getElementById("modal-body").innerHTML = modalBodyHTML;
  document.getElementById("modal-footer").innerHTML = modalFooterHTML;
}

function deleteComic(id) {
  var result = confirm("¿Los datos se van a borrar, estas seguro?");
  if (result == true) {
    $.ajax({
      url: 'http://localhost:8080/KomikilandiaV2/ApiDeleteComic?id=' + id,
      success: function () {
        alert("Todo correcto");
      },
      error: function () {
        window.location.href = "index.html";

      }
    });

  } else if (result == false) {
    alert("Los datos no se han borrado");
  }

};

function fillSelect(generoid) {
  console.log("generos");
  $.ajax({
    url: 'http://localhost:8080/KomikilandiaV2/ApiGeneros',
    dataType: 'json',
    success: function (myJsonObject) {
      var myHtml = "";
      for (let i = 0; i < myJsonObject.length; i++) {
        console.log("funciona")
        myHtml = "<option value='" + myJsonObject[i].id + "'>" + myJsonObject[i].nombre + " " + myJsonObject[i].id + "</option>"

        document.getElementById("genero_id").innerHTML += myHtml;
      }
      document.querySelector('option[value="'+generoid+'"]').selected=true;
    },
    error: function (xhr) {
      alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
    }
  });
};
function fillModal(id) {


  $.ajax({

    url: 'http://localhost:8080/KomikilandiaV2/ApiComic?id=' + id,
    dataType: 'json',

    success: function (myJsonObject) {

      console.log(myJsonObject.id);

      var modalBodyHTML2 = "";

      var modalBodyHTML2 = "<div class='row justify-content-center'>\
        <div class='col-6 mt-3'>\
          <form method='POST'>\
            <div class='form-group'>\
              <label for='id' class='text-black'>Id Comic</label> <input type='number'\
                class='form-control' id='id' name='id' readonly='true 'value="+ myJsonObject.id + ">\
            </div>\
            <div class='form-group'>\
              <label for='nombre' class='text-black'>Nombre</label> <input type='text'\
                class='form-control' id='nombre' name='nombre'  value='"+ myJsonObject.nombre + "'>\
            </div>\
            <div class='form-group'>\
              <label for='titulo' class='text-black'>Titulo</label> <input type='text'\
                class='form-control' id='titulo' name='titulo' value='"+ myJsonObject.titulo + "'>\
            </div>\
            <div class='form-group'>\
              <label for='num' class='text-black'>Num</label> <input type='number'\
                class='form-control' id='num' name='num' value="+ myJsonObject.num + ">\
            </div>\
            <div class='form-group'>\
              <label for='fecha_publicacion' class='text-black'>Fecha_publicacion</label> <input\
                type='date' class='form-control' id='fecha_publicacion'\
                name='fecha_publicacion'  value="+ myJsonObject.fecha_publicacion + ">\
            </div>\
            <div class='form-group'>\
              <label for='imagen' class='text-black'>Imagen</label> <input type='text'\
                class='form-control' id='imagen' name='imagen' value="+ myJsonObject.imagen + ">\
            </div>\
            <div class='form-group'>\
              <label for='num_likes' class='text-black'>Num_likes</label> <input type='number'\
                class='form-control' id='num_likes' name='num_likes' value="+ myJsonObject.num_likes + ">\
            </div>\
            <div class='form-group'>\
                              <label >Select Generos:</label>\
                                 <select id='genero_id' value="+ myJsonObject.nombre + '' + myJsonObject.id + "></select>\
                         </div>\
            <button type='button' class='btn btn-lg btn-danger' onclick='updateComic("+ myJsonObject.id+ ")' >Guardar</button>\
            <button type='button' class='btn btn-primary btn-lg' data-dismiss='modal'>Close</button>\
          </form>\
        </div>\
      </div>";

      document.getElementById("modal-header2").innerHTML = "<h3>Comic bat aldatzeko formulario</h3>";
      document.getElementById("modal-body2").innerHTML = modalBodyHTML2;


      fillSelect(myJsonObject.genero.id);


    },
    error: function (xhr) {
      alert("An AJAX error occured: " + xhr.status + " "
        + xhr.statusText);
    }
  });
}

function updateComic(id) {
  var result = confirm("¿Los datos se van a borrar, estas seguro?");
  if (result == true) {
    $.ajax({
      url: 'http://localhost:8080/KomikilandiaV2/ApiUpdateComic?id=' + id,
      success: function () {
        alert("Todo correcto");
      },
      error: function () {
        window.location.href = "index.html";

      }
    });

  } else if (result == false) {
    alert("Los datos no se han borrado");
  }

};
