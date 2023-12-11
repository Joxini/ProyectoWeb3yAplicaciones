document.addEventListener('DOMContentLoaded', function () {
    // Obtener los datos del proyecto almacenados en localStorage
    const selectedProjectData = localStorage.getItem('selectedProject');

    if (selectedProjectData) {
        // Convertir los datos del proyecto de formato JSON a un objeto JavaScript
        const projectData = JSON.parse(selectedProjectData);

        // Mostrar los datos del proyecto en la consola
        console.log("Datos del proyecto:", projectData);

        // Setear los valores en los elementos HTML
        document.getElementById('title').value = projectData.title;
        document.getElementById('area').value = projectData.area;
        document.getElementById('description').value = projectData.description;
        document.getElementById('conclusions').value = projectData.conclusions;
        document.getElementById('recommendations').value = projectData.recommendations;

        // Setear el PDF en el iframe
        const pdfViewer = document.getElementById('pdfViewer');
        if (projectData.pdfUrl) {
            pdfViewer.src = projectData.pdfUrl;
        } else {
            // Handle the case where there is no PDF URL
            pdfViewer.src = ''; // or set a default PDF URL
        }

    } else {
        console.log("No se encontraron datos del proyecto en localStorage");
    }
});





