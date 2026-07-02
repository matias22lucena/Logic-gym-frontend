

const URL_USUARIOS = `${import.meta.env.VITE_API_URL}/usuarios`;

export const registrarUsuario = async (usuarioNuevo) => {
  try {
    const respuesta = await fetch(`${URL_USUARIOS}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarioNuevo),
    });

    const data = await respuesta.json();

    return {
      ok: respuesta.ok,
      data,
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      data: {
        mensaje: "No se pudo conectar con el servidor",
      },
    };
  }
};

export const loginUsuario = async (usuarioLogin) => {
  try {
    const respuesta = await fetch(`${URL_USUARIOS}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarioLogin),
    });

    const data = await respuesta.json();

    return {
      ok: respuesta.ok,
      data,
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      data: {
        mensaje: "No se pudo conectar con el servidor",
      },
    };
  }
};

export const obtenerUsuarios = async () => {
  try {
    const respuesta = await fetch(URL_USUARIOS);

    const data = await respuesta.json();

    return {
      ok: respuesta.ok,
      data,
    };
  } catch (error) {
    console.error(error);

    return {
      ok: false,
      data: [],
    };
  }
};