var db = firebase.apps[0].firestore();
const projectList = document.querySelector('#projectList');

// Event listener para los clics en el proyecto
projectList.addEventListener('click', function (event) {
    const target = event.target;
    if (target.tagName === 'A' && target.getAttribute('data-id')) {
        // Obtenemos el ID del proyecto desde el atributo data-id
        const projectId = target.getAttribute('data-id');

        // Obtenemos los datos del proyecto desde Firestore
        db.collection("projects").doc(projectId).get().then(function (doc) {
            if (doc.exists) {
                // Almacenamos los datos en localStorage
                localStorage.setItem('selectedProject', JSON.stringify(doc.data()));

                // Redirigimos a la página de visualización
                window.location.href = 'VisualizarProject.html';
            } else {
                console.log("No existe el documento del proyecto");
            }
        }).catch(function (error) {
            console.error("Error al obtener datos del proyecto:", error);
        });
    }
});

// Obtener y mostrar la lista de proyectos
db.collection("projects").orderBy("title").get().then(function (querySnapshot) {
    projectList.innerHTML = ""; // Limpiar la lista

    var uniqueAreas = new Set(); // Usaremos un Set para evitar áreas duplicadas

    var table = "<table class=\"table table-striped\">" +
        "    <thead>" +
        "        <tr>" +
        "            <td><strong>Título</strong></td>" +
        "            <td><strong>Área</strong></td>" +
        "            <td colspan='2' align='center'><strong>Acciones</strong></td>" +
        "        </tr>" +
        "    </thead><tbody>";

    querySnapshot.forEach(function (doc) {
        // Agregar el área al Set de áreas únicas
        uniqueAreas.add(doc.data().area);

        table += '<tr>'
        table += '<td>' + doc.data().title + '</td>';
        table += '<td>' + doc.data().area + '</td>';
        table += '<td align="center"><a href="#" data-id="' + doc.id + '">Visualizar<a/></td>';
        table += '</tr>';
    });

    table += "</tbody></table>";
    projectList.innerHTML = table;

    // Llenar el dropdown con las áreas únicas
    const areaFilter = document.getElementById('areaFilter');
    uniqueAreas.forEach(function (area) {
        const option = document.createElement('option');
        option.value = area;
        option.text = area;
        areaFilter.add(option);
    });

    // Agregar un evento de cambio al dropdown para filtrar por área
    areaFilter.addEventListener('change', function () {
        const selectedArea = areaFilter.value;
        // Filtrar proyectos por área y actualizar la lista
        filterProjectsByArea(selectedArea);
    });
});

function filterProjectsByArea(area) {
    // Obtener y mostrar la lista de proyectos filtrada por área
    db.collection("projects")
        .orderBy("title")
        .get()
        .then(function (querySnapshot) {
            projectList.innerHTML = ""; // Limpiar la lista

            var table = "<table class=\"table table-striped\">" +
                "    <thead>" +
                "        <tr>" +
                "            <td><strong>Título</strong></td>" +
                "            <td><strong>Área</strong></td>" +
                "            <td colspan='2' align='center'><strong>Acciones</strong></td>" +
                "        </tr>" +
                "    </thead><tbody>";

            querySnapshot.forEach(function (doc) {
                if (!area || doc.data().area === area) {
                    table += '<tr>'
                    table += '<td>' + doc.data().title + '</td>';
                    table += '<td>' + doc.data().area + '</td>';
                    table += '<td align="center"><a href="#" data-id="' + doc.id + '">Visualizar<a/></td>';
                    table += '</tr>';
                }
            });

            table += "</tbody></table>";
            projectList.innerHTML = table;
        });
}
