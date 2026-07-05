const URL_CLASES = `${import.meta.env.VITE_API_URL}/clases`;

export const obtenerClases = async () => {
  try {
    const respuesta = await fetch(URL_CLASES);

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

export const crearClase = async (claseNueva) => {
  try {
    const respuesta = await fetch(URL_CLASES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(claseNueva),
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