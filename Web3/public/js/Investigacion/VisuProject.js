const db = firebase.firestore();
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

        const imgSalida = document.querySelector('.imgSalida');

        if (projectData.imageUrls && Array.isArray(projectData.imageUrls)) {

            // Crear un contenedor para las imágenes
            const imgContainer = document.createElement('div');
            imgContainer.classList.add('img-container');

            projectData.imageUrls.forEach(imageUrl => {
                const imgElement = document.createElement('img');
                imgElement.src = imageUrl;
                // Ajustar el tamaño de la imagen y agregar estilos
                imgElement.style.width = '100px'; // Puedes ajustar el tamaño según tus necesidades
                imgElement.style.margin = '5px'; // Margen entre imágenes
                imgSalida.appendChild(imgElement);
            });
        } else {
            console.error('La propiedad imageUrls no es un array o no está definida en selectedProjectData.');
        }

    } else {
        console.log("No se encontraron datos del proyecto en localStorage");
    }
    

    document.addEventListener('DOMContentLoaded', function () {
        const commentForm = document.getElementById('commentForm');
        const commentInput = document.getElementById('commentInput');
        const commentsList = document.getElementById('commentsList');
    
        function renderComment(comment) {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment', 'mb-2', 'p-2');
            commentElement.innerHTML = `
                <p>${comment.text}</p>
                <small>${comment.timestamp.toDate().toLocaleString()}</small>
            `;
            commentsList.appendChild(commentElement);
        }
    
        function submitComment() {
            const commentText = commentInput.value.trim();
    
            if (commentText !== "") {
                const timestamp = new Date();
    
                // Asumiendo que ya tienes inicializado Firebase y Firestore
                const db = firebase.firestore();
                const projectID = 'tu_project_id'; // Reemplaza con el ID de tu proyecto
                const commentsRef = db.collection('projects').doc(projectID).collection('comments');
    
                commentsRef.add({
                    text: commentText,
                    timestamp: firebase.firestore.Timestamp.fromDate(timestamp)
                })
                .then(docRef => {
                    console.log('Comentario añadido con ID:', docRef.id);
                    // Limpia el área de entrada de comentarios
                    commentInput.value = "";
                })
                .catch(error => {
                    console.error('Error al añadir el comentario:', error);
                });
            }
        }
    
        commentForm.addEventListener('submit', function (event) {
            event.preventDefault();
            submitComment();
        });
    
        // Escuchar cambios en la colección de comentarios y actualizar la interfaz de usuario
        const projectID = 'tu_project_id'; // Reemplaza con el ID de tu proyecto
        const commentsRef = firebase.firestore().collection('projects').doc(projectID).collection('comments');
    
        commentsRef.orderBy('timestamp', 'asc').onSnapshot(snapshot => {
            commentsList.innerHTML = ''; // Limpiar la lista antes de renderizar los nuevos comentarios
            snapshot.forEach(doc => {
                const commentData = doc.data();
                renderComment(commentData);
            });
        });
    });
    







    const btnHome = document.getElementById('btnHome');

    if (btnHome) {
        btnHome.addEventListener('click', function () {
            // Redirigir a la página principal
            window.location.href = 'index.html';
        });
    }
});





