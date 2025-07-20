// CONFIGURACION GLOBAL
const CONFIG = {
  animacionDuracion: 300,
  efectoParallax: false, // DESACTIVADO para evitar movimiento
  debugMode: false
};

// URLS DE NAVEGACION
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

// FUNCIONES DE NAVEGACION
function navegarEmpresa(tipoEmpresa) {
  const url = URLS_EMPRESA[tipoEmpresa];
  
  if (CONFIG.debugMode) {
    console.log('Navegando a empresa:', tipoEmpresa, 'URL:', url);
  }
  
  // Agregar efecto visual antes de navegar
  const boton = event.target;
  boton.style.transform = 'scale(0.95)';
  
  setTimeout(() => {
    boton.style.transform = '';
    // Descomentar para navegacion real
    // window.location.href = url;
  }, 150);
}

function abrirServicio(tipoServicio) {
  const url = URLS_SERVICIOS[tipoServicio];
  
  if (CONFIG.debugMode) {
    console.log('Abriendo servicio:', tipoServicio, 'URL:', url);
  }
  
  // Agregar efecto visual antes de abrir
  const boton = event.target;
  boton.style.transform = 'scale(0.98)';
  
  setTimeout(() => {
    boton.style.transform = '';
    // Descomentar para navegacion real
    // window.open(url, '_blank');
  }, 100);
}

// EFECTOS VISUALES - SIMPLIFICADOS
function inicializarEfectos() {
  // PARALLAX DESACTIVADO completamente
  // configurarParallax();
  
  configurarAnimacionesEntrada();
  configurarEfectosHover();
}

// ELIMINADA FUNCION configurarParallax() completamente

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

// UTILIDADES
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

// MANEJO DE ERRORES
function manejarError(error, contexto = '') {
  if (CONFIG.debugMode) {
    console.error('Error en', contexto, ':', error);
  }
  
  // Aqui se podria enviar el error a un servicio de monitoreo
  // enviarErrorAServicio(error, contexto);
}

// RESPONSIVE Y ADAPTABILIDAD - SIMPLIFICADO
function configurarResponsive() {
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  
  function manejarCambioTamano(e) {
    // Parallax siempre desactivado
    CONFIG.efectoParallax = false;
  }
  
  mediaQuery.addListener(manejarCambioTamano);
  manejarCambioTamano(mediaQuery);
}

// INICIALIZACION
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

// EVENTOS GLOBALES
window.addEventListener('load', function() {
  // Codigo que se ejecuta cuando todos los recursos estan cargados
  document.body.classList.add('completamente-cargado');
});

window.addEventListener('beforeunload', function() {
  // Limpieza antes de salir de la pagina
  if (CONFIG.debugMode) {
    console.log('Limpiando recursos antes de salir');
  }
});

// EXPORTAR FUNCIONES PARA USO GLOBAL
window.CitibankApp = {
  navegarEmpresa,
  abrirServicio,
  config: CONFIG
};