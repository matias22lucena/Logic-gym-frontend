import React, { useEffect, useState, useContext } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 





import './App.css';

import publicidad0 from '../assets/publicidad0.jpg';
import publicidad1 from '../assets/publicidad1.jpg';
import publicidad2 from '../assets/publicidad2.webp';
import publicidad3 from '../assets/publicidad3.jpg';
import publicidad4 from '../assets/publicidad4.png';
import publicidad5 from '../assets/publicidad5.jpg';

import imgCuerda from '../assets/cuerda6.jpg';
import imgRemera from '../assets/remera5.jpg';
import imgShaker from '../assets/Shaker4.jpg';
import imgGuantes from '../assets/Guantes3.jpg';
import imgCreatina from '../assets/creatina.jpg';
import imgProteina from '../assets/proteina1.jpg';
import heroVideo from '../assets/videoLogicGym.mp4';

import asesoramiento from '../assets/asesoramientonutricional.webp';
import box from '../assets/clasesdeBoxCrossfit.jpg';
import clasesg from '../assets/clasesgrupales.jpg';
import salam from '../assets/SaladeMusculación.jpg';
import evaluacionf from '../assets/evaluacionfisica.jpg';
import yoga from '../assets/yoga.jpg';

const mapaImagenesServicios = {
  salam,
  box,
  clasesg,
  asesoramiento,
  yoga,
  evaluacionf,
};

const servicios = [
  {
    titulo: 'Sala de Musculación',
    descripcion: 'Más de 1.200m² con equipos Technogym de última generación, zona de peso libre y sector funcional con instructores certificados.',
    imagen: 'salam',
  },
  {
    titulo: 'Box y Funcional',
    descripcion: 'Clases de Box, CrossFit y Entrenamiento Funcional de alta intensidad dictadas por profesionales con certificación internacional.',
    imagen: 'box',
  },
  {
    titulo: 'Clases Grupales',
    descripcion: 'Ritmos, HIIT, Stretching, Yoga y más. Más de 20 disciplinas con horarios flexibles para adaptarse a tu rutina diaria.',
    imagen: 'clasesg',
  },
  {
    titulo: 'Asesoramiento Nutricional',
    descripcion: 'Consultas personalizadas con nuestro equipo de nutricionistas para complementar tu entrenamiento y optimizar tus resultados.',
    imagen: 'asesoramiento',
  },
  {
    titulo: 'Yoga y Stretching',
    descripcion: 'Sesiones de yoga, meditación y elongación para mejorar la flexibilidad, reducir el estrés y equilibrar el cuerpo y la mente.',
    imagen: 'yoga',
  },
  {
    titulo: 'Evaluación Física',
    descripcion: 'Medición de composición corporal, test de fuerza y resistencia para establecer tu punto de partida y monitorear tu progreso.',
    imagen: 'evaluacionf',
  },
];

const productosIniciales = [
  {
    nombre: 'Proteína Whey Premium',
    categoria: 'Suplementos',
    precio: 28000,
    imagen: imgProteina,
    descripcion: 'Proteína de suero de leche de alta calidad. 25g de proteína por porción. Sabores: Vainilla, Chocolate y Frutilla.',
    badge: 'MÁS VENDIDO',
    badgeColor: 'var(--accent-blue)'
  },
  {
    nombre: 'Creatina Monohidrato',
    categoria: 'Suplementos',
    precio: 14500,
    imagen: imgCreatina,
    descripcion: 'Creatina monohidrato pura al 100%. Mejora el rendimiento en ejercicios de alta intensidad y aumenta la fuerza muscular.',
    badge: null,
    badgeColor: null
  },
  {
    nombre: 'Guantes de Entrenamiento',
    categoria: 'Accesorios',
    precio: 9900,
    imagen: imgGuantes,
    descripcion: 'Guantes de cuero genuino con soporte para la muñeca. Diseño antideslizante para levantamiento de pesas seguro y cómodo.',
    badge: 'NUEVO',
    badgeColor: '#00c853'
  },
  {
    nombre: 'Shaker Profesional 700ml',
    categoria: 'Accesorios',
    precio: 5500,
    imagen: imgShaker,
    descripcion: 'Botella mezcladora con esfera agitadora. Libre de BPA, tapa segura anti-derrame y graduación en ml para medición exacta.',
    badge: null,
    badgeColor: null
  },
  {
    nombre: 'Remera Dry-Fit GymFit',
    categoria: 'Indumentaria',
    precio: 12000,
    imagen: imgRemera,
    descripcion: 'Remera técnica con tecnología de secado rápido y tejido transpirable. Disponible en talle S, M, L y XL. Colores: negro y gris.',
    badge: 'OFICIAL',
    badgeColor: '#ff6f00'
  },
  {
    nombre: 'Cuerda de Saltar Pro',
    categoria: 'Accesorios',
    precio: 4800,
    imagen: imgCuerda,
    descripcion: 'Cuerda de saltar con mango ergonómico y rodamiento de precisión. Ideal para entrenamiento cardiovascular y doble salto.',
    badge: null,
    badgeColor: null
  },
];
const Home = () => {
  const [planes, setPlanes] = useState([]);
  const [cargandoPlanes, setCargandoPlanes] = useState(true);
  const [productos, setProductos] = useState(productosIniciales);
  const [paginaProductos, setPaginaProductos] = useState(1);
  const navigate = useNavigate();
  
  const { agregarAlCarrito } = useContext(ContextoCarrito);

  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const { data } = await API.get('/');
        setPlanes(data);
      } catch (error) {
        console.error("Error al cargar planes desde el backend:", error);
        setPlanes([
          { titulo: 'PLAN SOLO MUSCULACIÓN', descripcion: 'Acceso ilimitado a nuestra sala de pesas, máquinas de fuerza y sector de peso libre de última generación.', precio: 15000 },
          { titulo: 'PLAN SOLO CLASES', descripcion: 'Participá de todas nuestras clases guiadas: Funcional, Ritmos, HIIT, Stretching y mucho más.', precio: 18000 },
          { titulo: 'PLAN FULL', descripcion: 'Acceso libre y total sin restricciones: Musculación, todas las clases del gimnasio y asesoramiento personalizado.', precio: 25000 }
        ]);
      } finally {
        setCargandoPlanes(false);
      }
    };

    const fetchProductos = async () => {
      try {
        const { data } = await API.get('/productos');
        if (Array.isArray(data) && data.length > 0) {
          setProductos(data);
        }
      } catch (error) {
        console.warn('No se pudo cargar productos desde backend, usando lista local.');
      }
    };

    fetchPlanes();
    fetchProductos();
  }, []);

  const tamanioPagina = 3;
  const totalPaginasProductos = Math.ceil(productos.length / tamanioPagina);
  const productosVisibles = productos.slice((paginaProductos - 1) * tamanioPagina, paginaProductos * tamanioPagina);
  
return (
    <div className="home-bg text-white min-vh-100">
      
      <section className="hero-section" aria-labelledby="hero-heading">
        <video className="hero-video" autoPlay muted loop playsInline src={heroVideo} poster={publicidad0} preload="metadata" />
      </section>
      <Container className="py-4">
        <Row className="mb-5 justify-content-center">
          <Col lg={5} md={8}>
            <WidgetClima />
          </Col>
        </Row>

        <div className="text-center mb-5 pt-3">
          <span className="text-muted text-uppercase small tracking-widest fw-bold">Lo que ofrecemos</span>
          <h2 className="fw-bold display-5 mt-2 mb-3">NUESTROS SERVICIOS</h2>
          <div className="decorbar-blue mb-0"></div>
        </div>

        <div className="servicios-carousel mb-5">
          <div className="servicios-track">
            {[...servicios, ...servicios].map((servicio, index) => (
              <div key={`servicio-${index}`} className="servicio-card card-dark">
                <img
                  className="servicio-card-image"
                  src={mapaImagenesServicios[servicio.imagen]}
                  alt={servicio.titulo}
                  loading="lazy"
                />
                <div className="servicio-card-body">
                  <h5 className="fw-bold servicio-card-title">{servicio.titulo}</h5>
                  <p className="servicio-card-text">{servicio.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="section-divider my-5" />

<div className="text-center mb-5">
  <h2 className="fw-bold display-5 mt-2 mb-3">NUESTROS PRODUCTOS</h2>
  <div className="decorbar-blue mb-0"></div>
</div>

<Row className="g-4 mb-5">
  {productosVisibles.map((producto, i) => (
    <Col key={i} sm={6} md={4}>
      <div className="card-dark h-100 d-flex flex-column producto-card">
        <div className="producto-img-container">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            width={320}
            height={180}
            className="producto-img"
          />
          {producto.badge && (
            <span className="producto-badge" style={{ background: producto.badgeColor }}>
              {producto.badge}
            </span>
          )}
        </div>
        <div className="producto-body">
          <span className="text-uppercase fw-bold mb-1 producto-categoria">
            {producto.categoria}
          </span>
          <h5 className="fw-bold text-white mb-2 producto-titulo">
            {producto.nombre}
          </h5>
          <p className="mb-3 flex-grow-1 producto-descripcion">
            {producto.descripcion}
          </p>
          
          <div className="d-flex justify-content-between align-items-center mt-auto mb-3">
            <span className="fw-bold producto-precio">
              ${producto.precio}
            </span>
            <span className="small fw-bold text-uppercase producto-tag-local">
              En local
            </span>
          </div>

          <Button
            type="button"
            className="w-100 fw-bold py-2 btn-blue"
            style={{ fontSize: '0.85rem' }}
            onClick={() => agregarAlCarrito({
              nombre: producto.nombre,
              categoria: producto.categoria,
              precio: producto.precio,
            })}
            aria-label={`Agregar ${producto.nombre} al carrito`}
          >
             AGREGAR AL CARRITO
          </Button>
        </div>

      </div>
    </Col>
  ))}
</Row>

<div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-5">
  <div className="text-muted small">
    Mostrando {productosVisibles.length} de {productos.length} productos
  </div>
  <div className="d-flex gap-2">
    <button
      type="button"
      className="btn btn-outline-secondary btn-sm"
      disabled={paginaProductos === 1}
      onClick={() => setPaginaProductos((page) => Math.max(page - 1, 1))}
      aria-label="Página anterior de productos"
    >
      Anterior
    </button>
    <button
      type="button"
      className="btn btn-outline-secondary btn-sm"
      disabled={paginaProductos === totalPaginasProductos}
      onClick={() => setPaginaProductos((page) => Math.min(page + 1, totalPaginasProductos))}
      aria-label="Página siguiente de productos"
    >
      Siguiente
    </button>
  </div>
</div>       

<hr className="section-divider my-5" />
        <hr className="section-divider my-5" />
        <div id="planes" className="text-center mb-5">
          <h2 className="fw-bold display-5 mt-2 mb-3">EMPEZÁ HOY TU CAMBIO</h2>
          <div className="decorbar-blue"></div>
        </div>

        <Row className="g-4 mb-5">
          {cargandoPlanes ? (
            <div className="text-center w-100 py-4">
              <span className="text-muted">Cargando planes del gimnasio...</span>
            </div>
          ) : (
            planes.map((plan, index) => (
              <Col key={plan._id || index} md={4}>
                <Card className="h-100 border-0 p-3 card-dark d-flex flex-column justify-content-between">
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title className="fw-bold fs-4 mb-2 card-plan-title text-uppercase">{plan.titulo}</Card.Title>
                      <h4 className="text-blue fw-bold mb-3">${plan.precio.toLocaleString('es-AR')}/mes</h4>
                      <Card.Text className="text-muted card-plan-text">{plan.descripcion}</Card.Text>
                    </div>
                    <Button 
                      className="w-100 mt-4 fw-bold py-2 btn-blue"
                      onClick={() => handleConsultarPlan(plan.titulo)}
                    >
                      CONSULTAR PLAN
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>

        <div className="text-center mb-5 pt-4">
          <h2 className="fw-bold display-5">NUESTROS ENTRENADORES</h2>
          <p className="text-muted">Expertos listos para maximizar tu rendimiento y acompañar tu proceso.</p>
        </div>

        <Row className="g-4 mb-5 justify-content-center trainers-row">
          {[
            { nombre: 'Diego', esp: 'Especialista en Musculación y Fuerza', img: publicidad1 },
            { nombre: 'Matias', esp: 'Coordinador de Box y Funcional', img: publicidad2 },
            { nombre: 'Milagros', esp: 'Instructora de Ritmos y Cardio', img: publicidad3 },
            { nombre: 'Mariano', esp: 'Entrenador Funcional', img: publicidad4 }
          ].map((prof, index) => (
            <Col key={index} sm={6} md={3}>
              <Card className="text-center border-0 bg-transparent">
                <div className="prof-img-wrapper">
                  <Card.Img 
                    variant="top" 
                    src={prof.img} 
                    className="prof-img"
                    loading="lazy"
                    alt={prof.nombre}
                  />
                </div>
                <Card.Body className="px-0 pt-3">
                  <Card.Title className="fs-5 fw-bold mb-1 trainer-name">{prof.nombre}</Card.Title>
                  <Card.Text className="text-muted small text-uppercase tracking-wider">{prof.esp}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

section className="comentarios">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="fw-bold display-5 mt-2 mb-3">OPIONIONES <span className="text-blue">REALES</span></h2>
            </div>
            <div className="cuadricula-3">
              <div className="tarjeta-testimonio">
                <p>"Excelente ambiente y la calidad del equipamiento de fuerza es insuperable. El staff realmente sabe lo que hace y te corrigen la técnica al detalle."</p>
                <div className="informacion-usuario">
                  <div className="imagen-usuario">srcum</div>
                  <div className="detalles-usuario">
                    <h4>Scrum cambiar nombre</h4>
                  </div>
                </div>
              </div>
              <div className="tarjeta-testimonio">
                <p>"El sector de suplementación integrado me facilita la vida. Los planes personalizados me ayudaron a quebrar mis récords personales en sentadilla en pocos meses."</p>
                <div className="informacion-usuario">
                  <div className="imagen-usuario">DC</div>
                  <div className="detalles-usuario">
                    <h4>Daniela Cardozo</h4>   
                  </div>
                </div>
              </div>
              <div className="tarjeta-testimonio">
                <p>"Limpio, ordenado y con la música ideal para entrenar pesado. Los profesores de funcional son de primer nivel. Un gimnasio con identidad de verdad."</p>
                <div className="informacion-usuario">
                  <div className="imagen-usuario">PM</div>
                  <div className="detalles-usuario">
                    <h4>Pablo Marino</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>