var db = firebase.apps[0].firestore();
const projectList = document.querySelector('#projectList');

// Event listener para los clics en el proyecto
projectList.addEventListener('click', function (event) {
    const target = event.target;
    if (target.tagName === 'A' && target.getAttribute('data-id')) {
        // Obtenemos el ID del proyecto desde el atributo data-id
        const projectId = target.getAttribute('data-id');
        
        // Obtenemos los datos del proyecto desde Firestore
        db.collection("projects").doc(projectId).get().then(function(doc) {
            if (doc.exists) {
                // Almacenamos los datos en localStorage
                localStorage.setItem('selectedProject', JSON.stringify(doc.data()));
                
                // Redirigimos a la página de visualización
                window.location.href = 'VisualizarProject.html';
            } else {
                console.log("No existe el documento del proyecto");
            }
        }).catch(function(error) {
            console.error("Error al obtener datos del proyecto:", error);
        });
    }
});

// Obtener y mostrar la lista de proyectos
db.collection("projects").orderBy("title").get().then(function(querySnapshot){ 
    projectList.innerHTML = ""; // Limpiar la lista

    var table = "<table class=\"table table-striped\">" +
                "    <thead>" +
                "        <tr>" +
                "            <td><strong>Título</strong></td>" +
                "            <td><strong>Área</strong></td>" +
                "            <td colspan='2' align='center'><strong>Acciones</strong></td>" +
                "        </tr>" +
                "    </thead><tbody>";

    querySnapshot.forEach(function(doc){
        table += '<tr>'
        table += '<td>'+ doc.data().title +'</td>';
        table += '<td>'+ doc.data().area  +'</td>';
        table += '<td align="center"><a href="#" data-id="' + doc.id + '">Visualizar<a/></td>';
        table += '</tr>';
    });

    table += "</tbody></table>";
    projectList.innerHTML = table;
});


