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

            var rowOpenHTML = "<div class = 'row justify-content-center'>"
            var colOpenHTML = "<div class ='col-lg-3 m-1'>"
            var myHTMLcode = "";
            myHTMLcode = rowOpenHTML;

            for (let i = 0; i < myJsonObject.lenght; i++) {

                myHTMLcode += colOpenHTML;


                myHTMLcode += "<div class='card h-100 text-center'> <div class='card-body'><h4 class='card-title'>" + myJsonObject[i].nombre + "</h4>";

                //añadimos el nombre de la comic          
                myHTMLcode += "<img class='card-img-bottom' src='" + myJsonObject[i].imagen + "'></div>";
                myHTMLcode += "</div>";
                myHTMLcode += "</div>";
                //añadimos la imagen del comic "que es un url"
            }
            myHTMLcode += "</div>";
            document.getElementById("main").innerHTML + - myHTMLcode;
        },
        error: function (xhr) {
            alert("AJAX error : " + xhr.status + " " + xhr.statusText);
        }



    });
}