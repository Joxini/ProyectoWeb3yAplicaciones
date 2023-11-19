// JavaScript Document
// create local database firestore variable
var db = firebase.apps[0].firestore();
var auth = firebase.apps[0].auth();

// create local from webpage inputs
const txtNombre = document.querySelector('#txtNombre');
const txtEmail = document.querySelector('#txtEmail');
const txtContra = document.querySelector('#txtContra');

// create local insert button
const btnInsUser = document.querySelector('#btnInsUser');
const btnLogin = document.querySelector('#btnLogin');


// Validation the are inputs
const emailInput = document.getElementById('txtEmail');
const passwordInput = document.getElementById('txtContra');
const nombreInput = document.getElementById('txtNombre');

// assign button listener
btnInsUser.addEventListener('click', function () {

    //Validacion de boostrap
    if (nombreInput.checkValidity() && emailInput.checkValidity() && passwordInput.checkValidity()) {
        //En caso de estar los dos datos en los input, entra al metodo
        auth.createUserWithEmailAndPassword(txtEmail.value, txtContra.value)
            .then((userCredential) => {
                const user = userCredential.user;
                db.collection("datosUsuarios").add({
                    "idemp": user.uid,
                    "usuario": txtNombre.value,
                    "email": user.email
                }).then(function (docRef) {
                    alert("User added successfully");
                }).catch(function (FirebaseError) {
                    alert("Error al registrar datos del usuario." + FirebaseError);
                });
            })
            .catch((error) => {
                alert("Error al agregar el nuevo usuario: " + error.message);
            });

        //En caso de que los datos no esten introducidos en los input
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