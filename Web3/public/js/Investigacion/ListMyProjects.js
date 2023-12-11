// Asegúrate de tener una referencia a firebase.auth()
const auth = firebase.auth();

// Asegúrate de tener una referencia a firebase.firestore()
var db = firebase.apps[0].firestore();

document.addEventListener('DOMContentLoaded', function () {
    // Obtener el usuario autenticado actualmente
    const user = auth.currentUser;

    if (user) {
        // Filtrar proyectos por el ID del usuario autenticado
        db.collection('projects')
            .where('userId', '==', user.idemp)
            .get()
            .then(function (querySnapshot) {
                const projectList = document.getElementById('projectList');

                // Limpiar la lista
                projectList.innerHTML = '';

                // Verificar si hay proyectos asociados al usuario
                if (querySnapshot.size > 0) {
                    querySnapshot.forEach(function (doc) {
                        const projectData = doc.data();

                        // Crear un elemento para mostrar el proyecto
                        const projectElement = document.createElement('li');
                        projectElement.className = 'list-group-item';
                        projectElement.textContent = projectData.title;

                        // Agregar el proyecto a la lista
                        projectList.appendChild(projectElement);
                    });
                } else {
                    // No se encontraron proyectos asociados al usuario
                    const noProjectsMessage = document.createElement('p');
                    noProjectsMessage.textContent = 'No se encontraron proyectos asociados.';
                    projectList.appendChild(noProjectsMessage);
                }
            })
            .catch(function (error) {
                console.error('Error al obtener proyectos:', error);
            });
    } else {
        // El usuario no está autenticado
        console.log('Usuario no autenticado');
    }
});
