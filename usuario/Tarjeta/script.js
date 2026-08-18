const url = "https://randomuser.me/api/";

function obtenerUsuarioSeleccionado() {
    const usuarioGuardado = localStorage.getItem("usuarioSeleccionado");

    if (!usuarioGuardado) {
        return null;
    }

    try {
        const usuario = JSON.parse(usuarioGuardado);
        return usuario && usuario.name ? usuario : null;
    } catch (error) {
        console.error("No se pudo leer el usuario guardado:", error);
        return null;
    }
}

async function obtenerUsuario() {

    const usuarioSeleccionado = obtenerUsuarioSeleccionado();

    if (usuarioSeleccionado) {
        mostrarUsuario(usuarioSeleccionado);
        return;
    }

    try {

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("No se pudo obtener el usuario");
        }

        const datos = await respuesta.json();

        const usuario = datos.results[0];

        mostrarUsuario(usuario);

    } catch (error) {

        console.error("Error:", error);

        document.getElementById("nombre").textContent =
            "Error al cargar";

    }
}


function mostrarUsuario(usuario) {

    // FOTO
    document.getElementById("foto").src =
        usuario.picture.large;

    // NOMBRE
    const nombreCompleto =
        `${usuario.name.first} ${usuario.name.last}`;

    document.getElementById("nombre").textContent =
        nombreCompleto;

    // PROFESIÓN
    document.getElementById("profesion").textContent =
        "Usuario Random";

    // CORREO
    document.getElementById("correo").textContent =
        usuario.email;

    // TELÉFONO
    document.getElementById("telefono").textContent =
        usuario.phone;

    // UBICACIÓN
    const ubicacion =
        `${usuario.location.city}, ${usuario.location.state}`;

    document.getElementById("ubicacion").textContent =
        ubicacion;

    // PAÍS
    document.getElementById("pais").textContent =
        usuario.location.country;
}


// Ejecutar cuando carga la página
obtenerUsuario();