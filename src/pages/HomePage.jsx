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