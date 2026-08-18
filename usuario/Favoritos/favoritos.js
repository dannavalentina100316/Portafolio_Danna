document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // OBTENER FAVORITOS DEL LOCAL STORAGE
    // ==========================================

    let favoritos =
        JSON.parse(
            localStorage.getItem("favoritos")
        ) || [];


    let contenedor =
        document.getElementById("favoritos");


    // ==========================================
    // COMPROBAR SI HAY FAVORITOS
    // ==========================================

    if (favoritos.length === 0) {

        contenedor.innerHTML = `

            <div class="sin-favoritos">

                <div class="estrella-vacia">
                    ☆
                </div>

                <h2>
                    No tienes favoritos todavía
                </h2>

                <p>
                    Ve a la grilla y agrega usuarios
                    utilizando la estrella.
                </p>

            </div>

        `;

        return;
    }


    // ==========================================
    // MOSTRAR FAVORITOS
    // ==========================================

    favoritos.forEach((usuario) => {

        let tarjeta =
            document.createElement("div");

        tarjeta.classList.add("favorite-card");


        // ======================================
        // INFORMACIÓN DEL USUARIO
        // ======================================

        tarjeta.innerHTML = `

            <img
                src="${usuario.picture.large}"
                alt="Foto de ${usuario.name.first}"
            >

            <div class="favorite-info">

                <h2>
                    ${usuario.name.first}
                    ${usuario.name.last}
                </h2>

                <p>
                    <strong>Género:</strong>
                    ${usuario.gender}
                </p>

                <p>
                    <strong>Edad:</strong>
                    ${usuario.dob.age} años
                </p>

                <p>
                    <strong>Correo:</strong>
                    ${usuario.email}
                </p>

            </div>

            <button
                class="remove-favorite"
                title="Eliminar de favoritos"
            >
                ★
            </button>

        `;


        // ======================================
        // BOTÓN ELIMINAR
        // ======================================

        let botonEliminar =
            tarjeta.querySelector(
                ".remove-favorite"
            );


        botonEliminar.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                // Buscar usuario

                let indice =
                    favoritos.findIndex(
                        (favorito) =>
                            favorito.email === usuario.email
                    );


                // Eliminar

                if (indice !== -1) {

                    favoritos.splice(indice, 1);


                    // Actualizar localStorage

                    localStorage.setItem(
                        "favoritos",
                        JSON.stringify(favoritos)
                    );


                    // Recargar la página

                    location.reload();

                }

            }
        );


        // ======================================
        // CLIC EN EL FAVORITO
        // ======================================

        tarjeta.addEventListener(
            "click",
            () => {

                // Guardar usuario seleccionado

                localStorage.setItem(
                    "usuarioSeleccionado",
                    JSON.stringify(usuario)
                );


                // Ir a la tarjeta de perfil

                window.location.href =
                    "../Tarjeta/index.html";

            }
        );


        contenedor.appendChild(tarjeta);

    });

});