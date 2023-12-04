document.addEventListener('DOMContentLoaded', function () {
    const projectList = document.getElementById('projectList');
    const searchInput = document.getElementById('searchInput');

    // Initialize Firebase
    firebase.initializeApp({
        // Your Firebase configuration
    });

    const database = firebase.database();
    const projectsRef = database.ref('projects');

    // Event listener for search input
    searchInput.addEventListener('input', function () {
        renderProjects();
    });

    // Initial rendering
    renderProjects();

    function renderProjects() {
        projectsRef.once('value', function (snapshot) {
            const projects = snapshot.val();

            // Clear previous projects
            projectList.innerHTML = '';

            // Filter projects based on search input
            const filteredProjects = filterProjects(projects);

            // Render filtered projects
            filteredProjects.forEach(project => {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.textContent = `${project.name} - ${project.subject}`;
                projectList.appendChild(listItem);
            });
        });
    }

    function filterProjects(projects) {
        const searchTerm = searchInput.value.toLowerCase();
        return Object.values(projects || {})
            .filter(project => project.name.toLowerCase().includes(searchTerm));
    }
});
