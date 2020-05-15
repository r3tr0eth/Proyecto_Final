document.addEventListener('DOMContentLoaded', function (event) {
    //Primero los datos
    createHTML();
    document.getElementById("mainContainer").addEventListener('click',function(event){
        Like(event);
    });
    document.getElementById("mainContainer").addEventListener("click",showInfo);
   
})
function createHTML() {
    $.ajax({
        url: 'http://localhost:8080/KomikilandiaV2/ApiComics',
        datetype: 'json',

        success: function (myJsonObject) {

            console.log(myJsonObject);
            var rowOpenHTML = "<div class='row justify-content-center'>"
            var colOpenHTML = "<div class='col-lg-3 m-1'>"
            var myHTMLcode = "";

            myHTMLcode = rowOpenHTML;

            for (let i = 0; i < myJsonObject.length; i++) {

                myHTMLcode += colOpenHTML;

                myHTMLcode += '<div class="card" style=" width: 18rem; ">\
            <img src="'+ myJsonObject[i].imagen + '" class="card-img-top" alt="..." height="439">\
            <div class="card-body text-center">\
                <h5 class="card-title">'+ myJsonObject[i].nombre + '</h5>\
                <p class="card-text">'+ myJsonObject[i].titulo + '</p>\
                <button type="button" class="btn text-white" style="background-color:#444444" data-toggle="modal" data-id='
                    + myJsonObject[i].id
                    + ' data-target="#myModal">Más info</button></div>\
                <a href="#" class="btn btn-secondary" data-tipo="like" data-id="' + myJsonObject[i].id + '"><img src="img/img-mg.png" class=" " width="25%"> : '+ myJsonObject[i].num_likes + '</a>\
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

function Like(event){

    console.log(event);
  
    var clickedButton = event.target;  
  
    if (clickedButton.dataset.tipo == "like") {
      if (clickedButton.dataset.id != null) {  
     
      $.ajax({
        type:'POST',  
        data : {'id': clickedButton.dataset.id},
        url: 'http://localhost:8080/KomikilandiaV2/ApiUpdateLikes',
        dataType: 'text', //specifying here the response type, there's no need to parse the response.
        
        success: function (response, status, xhr) {
          if(xhr.status==200){
            alert("Like sumado "+xhr.statusText);
            window.location.href="index.html";
          }
        },
        error: function (xhr) {
          alert("An AJAX error occured: " + xhr.status + " " + xhr.statusText);
        }
      });
  
    }
    }else if(clickedButton.dataset.tipo == "info"){
  
    }
      
  }

  function showInfo() {

	if (event.target.dataset.id != null) {
		$.ajax({
			url : 'http://localhost:8080/KomikilandiaV2/ApiComic?id=' + event.target.dataset.id,
			dataType : 'json',
			success : function(myJsonObject) {
				showmodal(myJsonObject);
			},
			error : function(xhr) {
				alert("An AJAX error occured: " + xhr.status + " "
						+ xhr.statusText);
			}
		});
	}
}

function showmodal(myJsonObject) {

	var modalHeaderHTML = "<h4 class='modal-title'>" + myJsonObject.nombre
			+ "</h4><br>  <b><p>" + myJsonObject.titulo + " | </b>"
			+ " Número "+ myJsonObject.id + "<br><p>Data: "
			+ myJsonObject.fecha_publicacion + "| Genero: "
			+ myJsonObject.genero.nombre + "</p><p><b>Numero de Likes: <br>"
			+ myJsonObject.num_likes + "</b></p>";
	var modalBodyHTML = "<img height='100%' width='100%' src='"
			+ myJsonObject.imagen + "'>";
	var modalFooterHTML = "<button class='btn btn-lg btn-danger' onclick='deleteComic("
			+ myJsonObject.id
			+ ")'> <div style='text-align:center;'><i class='fa fa-trash'></i></div>Delete</button>"
			+ "<button class='btn btn-lg btn-warning' onclick='updateComic("
			+ myJsonObject.id
			+ ")'> <div style='text-align:center;'><i class='fa fa-history'></i></div>Update</button>"
			+ "<button type='button' class='btn btn-primary btn-lg' data-dismiss='modal'>Close</button>";

	document.getElementById("modal-header").innerHTML = modalHeaderHTML;
	document.getElementById("modal-body").innerHTML = modalBodyHTML;
	document.getElementById("modal-footer").innerHTML = modalFooterHTML;
}

function deleteComic(id) {
	var result = confirm("¿Los datos se van a borrar, estas seguro?");
	if (result == true) {
		$.ajax({
			url : 'http://localhost:8080/KomikilandiaV2/ApiDeleteComic?id=' + id,
			success : function() {
                alert("Todo correcto");
			},
			error : function() {
                window.location.href="index.html";
				
			}
		});

	} else if (result == false) {
		alert("Los datos no se han borrado");
	}

};

