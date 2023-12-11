// Crear variables locales para la base de datos Firestore, autenticación y almacenamiento

var auth = firebase.auth();
var db = firebase.firestore();
var storage = firebase.storage();




// Resto del código sin cambios
const txtTitle = document.querySelector('#title');
const txtArea = document.querySelector('#area');
const txtDescription = document.querySelector('#description');
const txtConclusions = document.querySelector('#conclusions');
const txtRecommendations = document.querySelector('#recommendations');
const pdfUpload = document.querySelector('#pdfUpload');
const imageUpload = document.querySelector('#imageUpload');
const btnSubmitProject = document.querySelector('#btnSubmitProject');



btnSubmitProject.addEventListener('click', async () => {
    // Validar los campos utilizando la validación nativa de HTML5
    if (txtTitle.checkValidity() && txtArea.checkValidity() && txtDescription.checkValidity() &&
        txtConclusions.checkValidity() && txtRecommendations.checkValidity()) {
        try {
            // Crear un objeto para almacenar los datos del proyecto
            const UserAuth = auth.currentUser.uid
            const projectId = generateUniqueId()

            const projectData = {
                id: projectId,
                title: txtTitle.value,
                area: txtArea.value,
                description: txtDescription.value,
                conclusions: txtConclusions.value,
                recommendations: txtRecommendations.value,
                userId: UserAuth,
            };

            // Subir el archivo PDF a Storage
            const pdfRef = storage.ref(`projectPDFs`).child(generateUniqueId()); // Use a function to generate a unique ID
            const pdfSnapshot = await pdfRef.put(pdfUpload.files[0]);

            // Obtener la URL del PDF después de subirlo
            const pdfUrl = await pdfSnapshot.ref.getDownloadURL();

            // Agregar la URL del PDF al objeto de datos del proyecto
            projectData.pdfUrl = pdfUrl;

            // Function to generate a unique ID
            function generateUniqueId() {
                // Use a library or a custom logic to generate a unique ID
                // Here's a simple example using the current timestamp
                return Date.now().toString();
            }

            // Subir las imágenes a Storage
            const imagesRef = storage.ref(`projectImages/${auth.currentUser.uid}`);
            const imageFiles = imageUpload.files;

            // Promesa para subir cada imagen y obtener su URL
            const uploadPromises = Array.from(imageFiles).map(async (imageFile) => {
                const imageSnapshot = await imagesRef.child(imageFile.name).put(imageFile);
                return imageSnapshot.ref.getDownloadURL();
            });

            // Esperar a que se completen todas las promesas
            projectData.imageUrls = await Promise.all(uploadPromises);

            // Guardar los datos en Firestore
            const docRef = await db.collection("projects").add(projectData);
            alert("Proyecto agregado exitosamente");
            // Redirigir a la página de inicio u otra página deseada
            window.location.href = 'index.html';
        } catch (error) {
            console.error("Error al registrar datos del proyecto:", error.message);
            alert("Error al registrar datos del proyecto. Consulta la consola para más detalles.");
        }

    } else {
        // Mostrar mensajes de error de Bootstrap
        txtTitle.reportValidity();
        txtArea.reportValidity();
        txtDescription.reportValidity();
        txtConclusions.reportValidity();
        txtRecommendations.reportValidity();
    }
});
