import React from 'react';
import '../../pages/HomePage.css';
import publicidad0 from '../../assets/publicidad0.png';
import publicidad1 from '../../assets/publicidad1.jpg';
import publicidad2 from '../../assets/publicidad2.webp';
import publicidad3 from '../../assets/publicidad3.jpg';
import publicidad4 from '../../assets/publicidad4.png';
import publicidad5 from '../../assets/publicidad5.jpg';

const defaultItems = [
  { src: publicidad0, alt: 'Logo marca 1' },
  { src: publicidad1, alt: 'Logo marca 2' },
  { src: publicidad2, alt: 'Logo marca 3' },
  { src: publicidad3, alt: 'Logo marca 4' },
  { src: publicidad4, alt: 'Logo marca 5' },
  { src: publicidad5, alt: 'Logo marca 6' },
];

const BannerInfinito = ({
  className = '',
  fullWidth = true,
  speed = 25,
  height = '150px',
  ariaLabel = 'Galería de marcas',
}) => {
  return (
    <div
      className={`cinta-container ${fullWidth ? 'cinta-container--full-width' : ''} ${className}`.trim()}
      style={{ height }}
      role="region"
      aria-label={ariaLabel}
    >
      <div className="cinta-track" style={{ animationDuration: `${speed}s` }}>
        <span className="cinta-item"><img src={publicidad0} alt="Logo marca 1" className="cinta-logo" /></span>
        <span className="cinta-item"><img src={publicidad1} alt="Logo marca 2" className="cinta-logo" /></span>
        <span className="cinta-item"><img src={publicidad2} alt="Logo marca 3" className="cinta-logo" /></span>
        <span className="cinta-item"><img src={publicidad3} alt="Logo marca 4" className="cinta-logo" /></span>
        <span className="cinta-item"><img src={publicidad4} alt="Logo marca 5" className="cinta-logo" /></span>
        <span className="cinta-item"><img src={publicidad5} alt="Logo marca 6" className="cinta-logo" /></span>

        
        <span className="cinta-item"><img src={publicidad0} alt="" className="cinta-logo" aria-hidden="true" /></span>
        <span className="cinta-item"><img src={publicidad1} alt="" className="cinta-logo" aria-hidden="true" /></span>
        <span className="cinta-item"><img src={publicidad2} alt="" className="cinta-logo" aria-hidden="true" /></span>
        <span className="cinta-item"><img src={publicidad3} alt="" className="cinta-logo" aria-hidden="true" /></span>
        <span className="cinta-item"><img src={publicidad4} alt="" className="cinta-logo" aria-hidden="true" /></span>
        <span className="cinta-item"><img src={publicidad5} alt="" className="cinta-logo" aria-hidden="true" /></span>
      </div>
    </div>
  );
};
export default BannerInfinito;