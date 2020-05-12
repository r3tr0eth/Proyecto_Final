document.addEventListener('DOMContentLoaded', function (event) {
    //Primero los datos
    createHTML();
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
                <a href="#" class="btn btn-info" data-toggle="modal" data-target="#id'+ myJsonObject[i].id + '">Más info</a>\
            </div>\
            <a href="#" class="btn btn-secondary"><img src="img/img-mg.png" class="" width="27%"> : '+ myJsonObject[i].num_likes + '</a>\
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
