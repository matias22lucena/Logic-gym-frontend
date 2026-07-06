const URL_CLASES = `${import.meta.env.VITE_API_URL}/clases`;
const URL_RESERVAS = `${import.meta.env.VITE_API_URL}/reservas`;

export const obtenerClasesDisponibles = async () => {
  try {
    const respuestaClases = await fetch(URL_CLASES);
    if (!respuestaClases.ok) throw new Error("Error al obtener clases del servidor");
    const clases = await respuestaClases.json();

    const respuestaReservas = await fetch(URL_RESERVAS);
    if (!respuestaReservas.ok) throw new Error("Error al obtener reservas del servidor");
    const reservas = await respuestaReservas.json();

    const obtenerCapacidad = (detalle) => {
      const det = (detalle || "").toLowerCase();
      if (det.includes("crossfit")) return 15;
      if (det.includes("yoga")) return 20;
      if (det.includes("spinning")) return 18;
      if (det.includes("hiit")) return 15;
      if (det.includes("funcional")) return 25;
      return 20; 
    };

    const clasesMapeadas = clases.map((clase) => {
      const reservasDeClase = reservas.filter(
        (r) => r.clase && (r.clase._id === clase._id || r.clase === clase._id)
      );
      const alumnos = reservasDeClase.map((r) => {
        const uid = r.usuario?._id || r.usuario;
        return uid ? uid.toString() : null;
      }).filter(Boolean);

      return {
        _id: clase._id,
        detalle: clase.detalleClase, 
        profesor: clase.profesor,
        fecha: clase.fecha,
        hora: clase.hora,
        capacidad: obtenerCapacidad(clase.detalleClase),
        alumnos: alumnos,
      };
    });

    return { ok: true, data: clasesMapeadas };
  } catch (error) {
    console.error("Error al obtener clases:", error);
    return { ok: false, data: [], mensaje: "Error al conectar con el servidor" };
  }
};


export const crearReservaMongo = async (claseId, usuarioId) => {
  try {
    const respuesta = await fetch(URL_RESERVAS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ claseId, usuarioId }),
    });

    const data = await respuesta.json();

    return {
      ok: respuesta.ok,
      mensaje: data.mensaje || "Ocurrió un error al procesar tu reserva.",
    };
  } catch (error) {
    console.error("Error al crear reserva:", error);
    return { ok: false, mensaje: "No se pudo conectar con el servidor" };
  }
};


export const cancelarReservaMongo = async (claseId, usuarioId) => {
  try {
    const respuesta = await fetch(
      `${URL_RESERVAS}?claseId=${claseId}&usuarioId=${usuarioId}`,
      {
        method: "DELETE",
      }
    );

    const data = await respuesta.json();

    return {
      ok: respuesta.ok,
      mensaje: data.mensaje || "Ocurrió un error al cancelar la reserva.",
    };
  } catch (error) {
    console.error("Error al cancelar la reserva:", error);
    return { ok: false, mensaje: "No se pudo conectar con el servidor" };
  }
};
