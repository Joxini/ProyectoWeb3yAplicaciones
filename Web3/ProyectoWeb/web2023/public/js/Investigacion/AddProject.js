// JavaScript Document
// create local database firestore variable
var db = firebase.firestore();
var auth = firebase.auth();
var storage = firebase.storage();

// create local from webpage inputs
const txtTitle = document.querySelector('#title');
const txtArea = document.querySelector('#area');
const txtDescription = document.querySelector('#description');
const txtConclusions = document.querySelector('#conclusions');
const txtRecommendations = document.querySelector('#recommendations');
const pdfUpload = document.querySelector('#pdfUpload');
const imageUpload = document.querySelector('#imageUpload');

// create local insert button
const btnSubmitProject = document.querySelector('#btnSubmitProject');

// assign button listener
btnSubmitProject.addEventListener('click', function () {
    // Validación de Bootstrap
    if (txtTitle.checkValidity() && txtArea.checkValidity() && txtDescription.checkValidity() && 
        txtConclusions.checkValidity() && txtRecommendations.checkValidity()) {
        
        // Crear un objeto para almacenar los datos del proyecto
        const projectData = {
            title: txtTitle.value,
            area: txtArea.value,
            description: txtDescription.value,
            conclusions: txtConclusions.value,
            recommendations: txtRecommendations.value,
        };

        // Subir el archivo PDF a Storage
        const storageRef = storage.ref();
        const pdfRef = storageRef.child(`projectPDFs/${auth.currentUser.uid}`);
        pdfRef.put(pdfUpload.files[0]).then((pdfSnapshot) => {
            // Obtener la URL del PDF después de subirlo
            pdfSnapshot.ref.getDownloadURL().then((pdfUrl) => {
                // Agregar la URL del PDF al objeto de datos del proyecto
                projectData.pdfUrl = pdfUrl;

                // Subir las imágenes a Storage
                const imageUrls = [];
                const imagesRef = storageRef.child(`projectImages/${auth.currentUser.uid}`);
                const imageFiles = imageUpload.files;

                // Promesa para subir cada imagen y obtener su URL
                const uploadPromises = Array.from(imageFiles).map((imageFile) => {
                    return imagesRef.child(imageFile.name).put(imageFile).then((imageSnapshot) => {
                        return imageSnapshot.ref.getDownloadURL();
                    });
                });

                // Esperar a que se completen todas las promesas
                Promise.all(uploadPromises).then((imageUrls) => {
                    // Agregar las URLs de las imágenes al objeto de datos del proyecto
                    projectData.imageUrls = imageUrls;

                    // Guardar los datos en Firestore
                    db.collection("projects").add(projectData)
                        .then(function (docRef) {
                            alert("Project added successfully");
                            // Redirigir a la página de inicio u otra página deseada
                            window.location.href = 'index.html';
                        })
                        .catch(function (error) {
                            alert("Error al registrar datos del proyecto: " + error.message);
                        });
                });
            });
        });
    } else {
        // Mostrar mensajes de error de Bootstrap
        txtTitle.reportValidity();
        txtArea.reportValidity();
        txtDescription.reportValidity();
        txtConclusions.reportValidity();
        txtRecommendations.reportValidity();
    }
});
