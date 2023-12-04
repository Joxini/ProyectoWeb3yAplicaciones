document.addEventListener('DOMContentLoaded', function () {
    const projectList = document.getElementById('projectList');

    // Initialize Firebase
    firebase.initializeApp({
        // Your Firebase configuration
    });

    const auth = firebase.auth();
    const database = firebase.database();
    const projectsRef = database.ref('projects');

    // Event listener for authentication state changes
    auth.onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in
            renderUserProjects(user.uid);
        } else {
            // User is signed out
            console.log('User is signed out');
        }
    });

    function renderUserProjects(userId) {
        projectsRef.orderByChild('userId').equalTo(userId).once('value', function (snapshot) {
            const userProjects = snapshot.val();

            // Clear previous projects
            projectList.innerHTML = '';

            // Render user projects
            if (userProjects) {
                Object.values(userProjects).forEach(project => {
                    const listItem = document.createElement('li');
                    listItem.className = 'list-group-item';
                    listItem.textContent = `${project.name} - ${project.subject}`;
                    projectList.appendChild(listItem);
                });
            } else {
                console.log('No projects found for the user');
            }
        });
    }
});
