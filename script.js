
const CONFIG = {
  animacionDuracion: 300,
  efectoParallax: false, 
  debugMode: false
};

const URLS_EMPRESA = {
  citibank: '/citibank-colombia',
  citivalores: '/citivalores',
  cititrust: '/cititrust'
};

const URLS_SERVICIOS = {
  tasas: '/tasas-tarifas',
  citidirect: '/citidirect',
  payments: '/payments-channel',
  pagos: '/mis-pagos',
  pse: '/pse',
  fxpulse: '/fxpulse',
  tarjetas: '/tarjetas-corporativas',
  sac: '/sac-defensoria',
  transparencia: '/transparencia-ptee',
  transparency: '/transparency-program'
};

function navegarEmpresa(tipoEmpresa) {
  const url = URLS_EMPRESA[tipoEmpresa];
  
  if (CONFIG.debugMode) {
    console.log('Navegando a empresa:', tipoEmpresa, 'URL:', url);
  }
  
  const boton = event.target;
  boton.style.transform = 'scale(0.95)';
  
  setTimeout(() => {
    boton.style.transform = '';
  }, 150);
}

function abrirServicio(tipoServicio) {
  const url = URLS_SERVICIOS[tipoServicio];
  
  if (CONFIG.debugMode) {
    console.log('Abriendo servicio:', tipoServicio, 'URL:', url);
  }
  
  const boton = event.target;
  boton.style.transform = 'scale(0.98)';
  
  setTimeout(() => {
    boton.style.transform = '';
  }, 100);
}


function inicializarEfectos() {
  configurarAnimacionesEntrada();
  configurarEfectosHover();
}


function configurarAnimacionesEntrada() {
  const botonesEmpresa = document.querySelectorAll('.boton-empresa');
  
  botonesEmpresa.forEach((boton, indice) => {
    boton.style.opacity = '0';
    boton.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      boton.style.transition = 'all 0.6s ease';
      boton.style.opacity = '1';
      boton.style.transform = 'translateY(0)';
    }, indice * 150);
  });
}

function configurarEfectosHover() {
  const botonesServicio = document.querySelectorAll('.boton-servicio');
  
  botonesServicio.forEach(boton => {
    boton.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    boton.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

function manejarError(error, contexto = '') {
  if (CONFIG.debugMode) {
    console.error('Error en', contexto, ':', error);
  }
}

function configurarResponsive() {
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  
  function manejarCambioTamano(e) {
    CONFIG.efectoParallax = false;
  }
  
  mediaQuery.addListener(manejarCambioTamano);
  manejarCambioTamano(mediaQuery);
}

document.addEventListener('DOMContentLoaded', function() {
  try {
    inicializarEfectos();
    configurarResponsive();
    
    if (CONFIG.debugMode) {
      console.log('Citibank Colombia - Aplicacion inicializada correctamente');
    }
  } catch (error) {
    manejarError(error, 'inicializacion');
  }
});

window.addEventListener('load', function() {
  document.body.classList.add('completamente-cargado');
});

window.addEventListener('beforeunload', function() {
  if (CONFIG.debugMode) {
    console.log('Limpiando recursos antes de salir');
  }
});

window.CitibankApp = {
  navegarEmpresa,
  abrirServicio,
  config: CONFIG
};