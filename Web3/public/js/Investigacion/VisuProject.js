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

            const commentForm = document.getElementById('commentForm');
            const commentInput = document.getElementById('commentInput');
            const commentsList = document.getElementById('commentsList');

            // Extrae el email del usuario que esta autenticado
            const auth = firebase.auth();
            let EmailUser = "";
            
            auth.onAuthStateChanged((user) => {
                if (user) {
                    EmailUser = user.email;
                } else {
                    // El usuario no está autenticado
                    console.log("Usuario no autenticado");
                }
            });

            // Manejar el envío del comentario
            commentForm.addEventListener('submit', function (event) {
                event.preventDefault();

                // Obtener el contenido del comentario
                const commentContent = commentInput.value;

                // Añadir el comentario al Firestore
                db.collection('comments').add({
                    content: commentContent,
                    projectId: projectData.id, // Agregar el ID del proyecto al comentario
                    emailUser: EmailUser,
                })
                    .then(() => {
                        // Limpiar el campo de entrada después de agregar el comentario
                        commentInput.value = '';
                    })
                    .catch((error) => {
                        console.error("Error al agregar el comentario:", error);
                    });
            });




            // Mostrar los comentarios automáticamente
            db.collection('comments')
                .where('projectId', '==', projectData.id) // Filtrar comentarios por el ID del proyecto
                .orderBy('projectId', 'desc') // Ordenar por el campo 'id' en orden descendente
                .onSnapshot((snapshot) => {
                    commentsList.innerHTML = ''; // Limpiar la lista de comentarios antes de agregar los nuevos

                    snapshot.forEach((doc) => {
                        const commentData = doc.data();

                        // Crear un elemento para mostrar el comentario
                        const commentElement = document.createElement('div');
                        commentElement.innerHTML = `<strong>USUARIO: ${commentData.emailUser}</strong><br>COMENTARIO: ${commentData.content}<hr>`;
                        commentsList.appendChild(commentElement);
                    });
                });





        } else {
            console.error('La propiedad imageUrls no es un array o no está definida en selectedProjectData.');
        }

    } else {
        console.log("No se encontraron datos del proyecto en localStorage");
    }


    const btnHome = document.getElementById('btnHome');

    if (btnHome) {
        btnHome.addEventListener('click', function () {
            // Redirigir a la página principal
            window.location.href = 'index.html';
        });
    }
});




