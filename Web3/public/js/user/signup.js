// JavaScript Document
// create local database firestore variable
var db = firebase.firestore();
var auth = firebase.auth();
var storage = firebase.storage(); // Corregir la inicialización del servicio de almacenamiento

// create local from webpage inputs
const txtNombre = document.querySelector('#txtNombre');
const txtEmail = document.querySelector('#txtEmail');
const txtContra = document.querySelector('#txtContra');
const schoolGrade = document.querySelector('#schoolGrade'); 
const txtDescription = document.querySelector('#txtDescription');
const txtUrlImage = document.querySelector('#txtUrlImage');

// create local insert button
const btnInsUser = document.querySelector('#btnInsUser');
const btnLogin = document.querySelector('#btnLogin');

// Validation the are inputs
const emailInput = document.getElementById('txtEmail');
const passwordInput = document.getElementById('txtContra');
const nombreInput = document.getElementById('txtNombre');

// assign button listener
btnInsUser.addEventListener('click', function () {
    // Validacion de boostrap
    if (nombreInput.checkValidity() && emailInput.checkValidity() && passwordInput.checkValidity()) {
        // En caso de estar los dos datos en los input, entra al metodo
        // Crear usuario en Authentication
        auth.createUserWithEmailAndPassword(txtEmail.value, txtContra.value)
            .then((userCredential) => {
                const user = userCredential.user;

                // Subir la imagen a Storage
                const storageRef = storage.ref();
                const imageRef = storageRef.child(`userImages/${user.uid}`);
                imageRef.put(txtUrlImage.files[0]).then((snapshot) => {
                    // Obtener la URL de la imagen después de subirla
                    snapshot.ref.getDownloadURL().then((url) => {
                        // Guardar los datos en Firestore
                        db.collection("datosUsuarios").add({
                            "idemp": user.uid,
                            "usuario": txtNombre.value,
                            "gradoEscolar": schoolGrade.value, 
                            "descripcion": txtDescription.value, 
                            "email": user.email,
                            "imagenURL": url 
                        }).then(function (docRef) {
                            alert("User added successfully");
                            window.location.href = 'login.html';
                        }).catch(function (FirebaseError) {
                            alert("Error al registrar datos del usuario." + FirebaseError);
                        });
                    });
                });
            })
            .catch((error) => {
                alert("Error al agregar el nuevo usuario: " + error.message);
            });

        // En caso de que los datos no estén introducidos en los input
    } else {
        // Mostrar mensajes de error de Bootstrap
        emailInput.reportValidity();
        passwordInput.reportValidity();
        nombreInput.reportValidity();

    }
});

// Manejo del botón de registro
btnLogin.addEventListener('click', function () {
    document.location.href = 'login.html';
});
