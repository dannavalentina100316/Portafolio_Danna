document.addEventListener("DOMContentLoaded", async () => {

    let res = await axios.get(
        "https://randomuser.me/api/?results=100"
    );

    let listaUsuarios =
        document.getElementById("usuarios");


    // ==========================================
    // OBTENER FAVORITOS GUARDADOS
    // ==========================================

    let favoritos =
        JSON.parse(
            localStorage.getItem("favoritos")
        ) || [];


    // ==========================================
    // CREAR USUARIOS
    // ==========================================

    res.data.results.forEach((item) => {

        let tarjeta =
            document.createElement("div");

        tarjeta.classList.add("user-card");


        // ======================================
        // IMAGEN
        // ======================================

        let imagen =
            document.createElement("img");

        imagen.classList.add("user-image");

        imagen.src =
            item.picture.large;

        imagen.alt =
            "Foto del usuario";


        // ======================================
        // INFORMACIÓN
        // ======================================

        let informacion =
            document.createElement("div");

        informacion.classList.add("user-info");


        let nombre =
            document.createElement("h2");

        nombre.textContent =
            item.name.first +
            " " +
            item.name.last;


        let genero =
            document.createElement("p");

        genero.textContent =
            "Género: " +
            item.gender;


        let edad =
            document.createElement("p");

        edad.textContent =
            "Edad: " +
            item.dob.age;


        informacion.appendChild(nombre);

        informacion.appendChild(genero);

        informacion.appendChild(edad);


        // ======================================
        // ESTRELLA
        // ======================================

        let estrella =
            document.createElement("button");

        estrella.classList.add(
            "favorite-btn"
        );

        estrella.innerHTML = "★";


        // Comprobar si ya es favorito

        let yaEsFavorito =
            favoritos.some(
                (favorito) =>
                    favorito.email === item.email
            );


        if (yaEsFavorito) {

            estrella.classList.add("active");

        }


        // ======================================
        // CLIC EN ESTRELLA
        // ======================================

        estrella.addEventListener(
            "click",
            (event) => {

                // Evitar abrir el perfil
                event.stopPropagation();


                // Buscar usuario

                let indice =
                    favoritos.findIndex(
                        (favorito) =>
                            favorito.email === item.email
                    );


                // ==============================
                // QUITAR FAVORITO
                // ==============================

                if (indice !== -1) {

                    favoritos.splice(
                        indice,
                        1
                    );

                    estrella.classList.remove(
                        "active"
                    );

                }


                // ==============================
                // AGREGAR FAVORITO
                // ==============================

                else {

                    favoritos.push(item);

                    estrella.classList.add(
                        "active"
                    );

                }


                // ==============================
                // GUARDAR
                // ==============================

                localStorage.setItem(
                    "favoritos",
                    JSON.stringify(favoritos)
                );

            }
        );


        // ======================================
        // ARMAR TARJETA
        // ======================================

        tarjeta.appendChild(estrella);

        tarjeta.appendChild(imagen);

        tarjeta.appendChild(informacion);


        // ======================================
        // CLIC EN LA TARJETA
        // ======================================

        tarjeta.addEventListener(
            "click",
            () => {

                localStorage.setItem(
                    "usuarioSeleccionado",
                    JSON.stringify(item)
                );


                // Ir al perfil

                window.location.href =
                    "../Tarjeta/index.html";

            }
        );


        listaUsuarios.appendChild(tarjeta);

    });

});