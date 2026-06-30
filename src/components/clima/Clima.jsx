import React, { useEffect, useState } from 'react';

const Clima = ({ lat = -26.8241, lon = -65.2226, locationLabel = 'Tucumán, Argentina' }) => {
  const [clima, setClima] = useState(null);
  const [loadingClima, setLoadingClima] = useState(true);

  const API_KEY = "7a2fe2c4d4a0826cb7741aeacd920889"; 

  useEffect(() => {
    const fetchClima = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`
        );
        const data = await res.json();
        if (data.main && data.weather) {
          setClima(data);
        }
      } catch (error) {
        console.error('Error al cargar el clima:', error);
      } finally {
        setLoadingClima(false);
      }
    };

    fetchClima();
  }, [lat, lon]);

  const getClimaDescripcion = (code) => {
    if (code === 800) return 'Cielo despejado';
    if (code >= 801 && code <= 804) return 'Parcialmente nublado';
    if (code >= 701 && code <= 781) return 'Niebla';
    if (code >= 500 && code <= 531) return 'Llovizna/Lluvia ligera';
    if (code >= 300 && code <= 321) return 'Llovizna/Lluvia ligera';
    if (code >= 600 && code <= 622) return 'Chubascos de lluvia/Nieve';
    if (code >= 200 && code <= 232) return 'Tormenta eléctrica';
    return 'Condiciones variables';
  };

  const getWeatherIcon = (code) => {
    if (code === 800) return <i className="bi bi-sun-fill text-warning"></i>;
    if (code >= 801 && code <= 804) return <i className="bi bi-cloud-sun-fill "></i>;
    if (code >= 701 && code <= 781) return <i className="bi bi-cloud-fog2-fill "></i>;
    if (code >= 300 && code <= 531) return <i className="bi bi-cloud-drizzle-fill "></i>;
    if (code >= 600 && code <= 622) return <i className="bi bi-cloud-snow-fill "></i>;
    if (code >= 200 && code <= 232) return <i className="bi bi-cloud-lightning-rain-fill "></i>;
    return <i className="bi bi-cloud-fill text-secondary"></i>;
  };

  const getGymTip = (temp) => {
    if (temp >= 36) return 'Temperatura alta. Salas climatizadas listas para entrenar fresco.';
    if (temp >= 31) return 'Día caluroso. Hidratate bien durante toda la rutina.';
    if (temp <= 19) return 'Está fresco. No te saltees el calentamiento antes de empezar.';
    return 'Clima ideal para cumplir con el entrenamiento de hoy.';
  };

  return (
    <div className="clima-widget p-4 rounded-4 shadow-soft card-dark border border-secondary d-flex flex-column flex-sm-row align-items-center gap-4">
      <div className="clima-icon-wrapper d-flex align-items-center justify-content-center rounded-circle text-white" style={{ fontSize: '2rem', width: '60px', height: '60px' }}>
        <span className="clima-icon">
          {clima ? getWeatherIcon(clima.weather[0].id) : <i className="bi bi-arrow-clockwise bi-spin text-muted"></i>}
        </span>
      </div>

      <div className="clima-content text-start flex-grow-1">
        <div className="d-flex align-items-center justify-content-between gap-3 mb-2">
          <div>
            <span className="text-muted small text-uppercase tracking-wider d-block">{locationLabel}</span>
            <h5 className="m-0 fw-bold text-white">Estado del Tiempo</h5>
          </div>
          <div className="text-end">
            {loadingClima ? (
              <span className="text-muted small">Cargando...</span>
            ) : clima ? (
              <h2 className="m-0 fw-bold clima-temp">{Math.round(clima.main.temp)}°C</h2>
            ) : (
              <span className="text-muted small">Clima no disponible</span>
            )}
          </div>
        </div>

        {clima && (
          <>
            <div className="clima-chip-row d-flex flex-wrap gap-2 mb-3">
              <span className="clima-chip">{getClimaDescripcion(clima.weather[0].id)}</span>
              <span className="clima-chip">Humedad {clima.main.humidity}%</span>
            </div>
            <p className="text-secondary small mb-0 mt-1 clima-tip">{getGymTip(clima.main.temp)}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Clima;