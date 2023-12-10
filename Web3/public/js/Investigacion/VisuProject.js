document.addEventListener('DOMContentLoaded', function () {
    // Obtener los datos del proyecto almacenados en localStorage
    const selectedProjectData = localStorage.getItem('selectedProject');

    if (selectedProjectData) {
        // Convertir los datos del proyecto de formato JSON a un objeto JavaScript
        const projectData = JSON.parse(selectedProjectData);

        // Mostrar los datos del proyecto en la consola
        console.log("Datos del proyecto:", projectData);
    } else {
        console.log("No se encontraron datos del proyecto en localStorage");
    }
});

