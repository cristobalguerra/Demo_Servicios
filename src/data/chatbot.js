export const COVERED_ZONES = [
  'San Pedro', 'San Pedro Garza García',
  'Monterrey', 'Monterrey Centro',
  'Cumbres',
  'San Nicolás', 'San Nicolás de los Garza',
  'Guadalupe',
  'Apodaca',
  'Santa Catarina',
];

export const intentPatterns = [
  {
    patterns: ['clima no enfría', 'no enfría', 'no enfria', 'clima caliente', 'no sale frío', 'no sale frio', 'aire caliente'],
    response: 'Parece que tu clima no está enfriando correctamente. Te recomiendo nuestro servicio de **Reparación de Climas**. Un técnico puede diagnosticar si es falta de gas, falla en compresor u otro problema.',
    service: 'reparacion-climas',
    quickReplies: ['Agendar reparación', 'Ver precios', 'Validar mi zona'],
  },
  {
    patterns: ['instalar clima', 'instalación clima', 'instalacion', 'poner clima', 'minisplit', 'mini split', 'quiero un clima'],
    response: 'Con gusto te ayudamos con la **Instalación de Climas**. Trabajamos con minisplit, central y ventana. El precio inicia desde $2,500 MXN e incluye mano de obra.',
    service: 'instalacion-climas',
    quickReplies: ['Agendar instalación', 'Ver precios', 'Validar mi zona'],
  },
  {
    patterns: ['mantenimiento', 'limpieza clima', 'lavado', 'servicio clima', 'recarga gas'],
    response: 'El **Mantenimiento de A/C** incluye limpieza profunda de filtros y serpentines, revisión de gas refrigerante y verificación general. Desde $800 MXN.',
    service: 'mantenimiento-ac',
    quickReplies: ['Agendar mantenimiento', 'Ver precios', 'Validar mi zona'],
  },
  {
    patterns: ['electricista', 'eléctrico', 'electrico', 'falla eléctrica', 'falla electrica', 'corto', 'cortocircuito', 'se fue la luz', 'apagón', 'apagon'],
    response: 'Contamos con **Servicios Eléctricos Residenciales**. Nuestros técnicos certificados pueden atender fallas, cortocircuitos, instalaciones y más. Desde $500 MXN.',
    service: 'electrico-residencial',
    quickReplies: ['Agendar servicio', 'Ver precios', 'Validar mi zona'],
  },
  {
    patterns: ['contacto', 'apagador', 'interruptor', 'enchufe', 'toma corriente'],
    response: 'El servicio de **Cambio de Contactos e Interruptores** incluye sustitución segura y materiales de calidad. Desde $250 MXN.',
    service: 'contactos-interruptores',
    quickReplies: ['Agendar servicio', 'Ver precios'],
  },
  {
    patterns: ['tablero', 'pastilla', 'breaker', 'caja eléctrica', 'caja electrica'],
    response: 'La **Revisión de Tableros Eléctricos** incluye inspección completa, balanceo de cargas y mantenimiento preventivo. Desde $700 MXN.',
    service: 'tableros-electricos',
    quickReplies: ['Agendar revisión', 'Ver precios'],
  },
  {
    patterns: ['lámpara', 'lampara', 'ventilador', 'foco', 'luminaria', 'candil'],
    response: 'Instalamos **Lámparas y Ventiladores** de techo de forma segura y profesional. Desde $350 MXN.',
    service: 'lamparas-ventiladores',
    quickReplies: ['Agendar instalación', 'Ver precios'],
  },
  {
    patterns: ['diagnóstico', 'diagnostico', 'revisar', 'no sé qué tiene', 'no se que tiene', 'problema'],
    response: 'Nuestro **Diagnóstico Técnico** identifica exactamente qué falla tiene tu equipo o instalación. Un técnico especializado evalúa y te da opciones de solución. Desde $400 MXN.',
    service: 'diagnostico',
    quickReplies: ['Agendar diagnóstico', 'Ver precios'],
  },
  {
    patterns: ['preventivo', 'plan', 'póliza', 'poliza', 'programa'],
    response: 'Nuestro **Mantenimiento Preventivo** es un plan integral de revisión periódica que evita fallas costosas y alarga la vida de tus equipos. Desde $1,200 MXN.',
    service: 'mantenimiento-preventivo',
    quickReplies: ['Agendar visita', 'Más información'],
  },
  {
    patterns: ['agendar', 'cita', 'programar', 'reservar', 'visita', 'cuando pueden'],
    response: '¡Perfecto! Vamos a agendar tu servicio. ¿Qué tipo de servicio necesitas?',
    service: null,
    quickReplies: ['Climas / A/C', 'Eléctrico', 'Diagnóstico', 'Mantenimiento'],
  },
  {
    patterns: ['precio', 'costo', 'cuánto', 'cuanto', 'tarifa', 'cotización', 'cotizacion'],
    response: 'Nuestros precios iniciales son:\n\n• Instalación de Climas: desde $2,500\n• Mantenimiento A/C: desde $800\n• Reparación de Climas: desde $600\n• Eléctrico Residencial: desde $500\n• Contactos/Interruptores: desde $250\n• Tableros Eléctricos: desde $700\n• Lámparas/Ventiladores: desde $350\n• Diagnóstico: desde $400\n• Preventivo: desde $1,200\n\nEl precio final depende del diagnóstico en sitio.',
    service: null,
    quickReplies: ['Agendar servicio', 'Validar zona'],
  },
  {
    patterns: ['horario', 'hora', 'cuando atienden', 'abren', 'disponibilidad'],
    response: 'Nuestro horario de atención es:\n\n📅 Lunes a Viernes: 8:00 AM – 7:00 PM\n📅 Sábados: 9:00 AM – 3:00 PM\n🚨 Emergencias 24/7 con cargo adicional\n\nLos horarios disponibles para agendar son: 9 AM, 11 AM, 1 PM, 4 PM y 6 PM.',
    service: null,
    quickReplies: ['Agendar servicio', 'Emergencia 24/7'],
  },
  {
    patterns: ['zona', 'cobertura', 'colonia', 'municipio', 'llegan', 'atienden en'],
    response: 'Tenemos cobertura en:\n\n✅ San Pedro Garza García\n✅ Monterrey Centro\n✅ Cumbres\n✅ San Nicolás\n✅ Guadalupe\n✅ Apodaca\n✅ Santa Catarina\n\n¿En qué zona te encuentras?',
    service: null,
    quickReplies: ['San Pedro', 'Monterrey', 'Cumbres', 'San Nicolás'],
  },
  {
    patterns: ['pago', 'tarjeta', 'efectivo', 'transferencia', 'formas de pago'],
    response: 'Aceptamos las siguientes formas de pago:\n\n💵 Efectivo\n💳 Tarjeta de débito/crédito\n🏦 Transferencia bancaria\n📱 CoDi\n\nEl pago se realiza al completar el servicio.',
    service: null,
    quickReplies: ['Agendar servicio', 'Ver precios'],
  },
  {
    patterns: ['urgencia', 'emergencia', 'urgente', 'ya', 'ahora', 'hoy'],
    response: '🚨 **Servicio de Emergencias 24/7**\n\nPara urgencias eléctricas o de clima, contáctanos directamente:\n\n📞 Tel: 81-1234-5678\n💬 WhatsApp: 81-9876-5432\n\nUn técnico puede estar en tu ubicación en menos de 2 horas.',
    service: null,
    quickReplies: ['Llamar ahora', 'WhatsApp', 'Agendar para después'],
  },
  {
    patterns: ['empresa', 'corporativo', 'oficina', 'comercial', 'negocio'],
    response: 'Ofrecemos servicios especializados para empresas:\n\n🏢 Mantenimiento programado\n📋 Pólizas de servicio\n⚡ Soporte técnico para oficinas\n🔧 Planes a medida\n\n¿Te gustaría que un ejecutivo te contacte?',
    service: null,
    quickReplies: ['Sí, contactarme', 'Ver planes', 'Agendar visita'],
  },
  {
    patterns: ['gracias', 'ok', 'vale', 'perfecto', 'genial', 'excelente'],
    response: '¡Con gusto! Si necesitas algo más, aquí estoy para ayudarte. 😊',
    service: null,
    quickReplies: ['Ver servicios', 'Agendar', 'WhatsApp'],
  },
  {
    patterns: ['hola', 'buenas', 'buenos días', 'buenas tardes', 'qué tal', 'hey'],
    response: '¡Hola! 👋 Soy el asistente de TecniHome. Puedo ayudarte a:\n\n🔧 Encontrar el servicio que necesitas\n📍 Validar cobertura en tu zona\n📅 Agendar una visita técnica\n💰 Consultar precios\n\n¿En qué puedo ayudarte?',
    service: null,
    quickReplies: ['Ver servicios', 'Agendar', 'Validar zona', 'Precios'],
  },
];

export const defaultResponse = {
  response: 'No estoy seguro de entender tu solicitud. ¿Puedo ayudarte con alguna de estas opciones?',
  quickReplies: ['Ver servicios', 'Agendar servicio', 'Validar zona', 'Precios', 'Emergencia', 'WhatsApp'],
};

export function detectIntent(message) {
  const lower = message.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // Check zone validation
  const zoneCheck = COVERED_ZONES.find(z =>
    lower.includes(z.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
  );
  if (zoneCheck) {
    return {
      response: `✅ **¡Sí tenemos cobertura en ${zoneCheck}!**\n\nPodemos enviar un técnico a tu zona. ¿Te gustaría agendar un servicio?`,
      service: null,
      quickReplies: ['Agendar servicio', 'Ver precios', 'Ver servicios'],
    };
  }

  // Check uncovered zones
  const uncoveredZones = ['Escobedo', 'Juárez', 'García', 'Cadereyta', 'Santiago', 'Pesquería'];
  const uncoveredCheck = uncoveredZones.find(z =>
    lower.includes(z.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''))
  );
  if (uncoveredCheck) {
    return {
      response: `❌ **Actualmente no tenemos cobertura en ${uncoveredCheck}.**\n\nEstamos expandiendo nuestra zona de servicio. Déjanos tus datos y te notificamos cuando lleguemos a tu zona.`,
      service: null,
      quickReplies: ['Ver zonas cubiertas', 'Contactar por WhatsApp'],
    };
  }

  // Check intent patterns
  for (const intent of intentPatterns) {
    const normalizedPatterns = intent.patterns.map(p =>
      p.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    );
    if (normalizedPatterns.some(p => lower.includes(p))) {
      return intent;
    }
  }

  return defaultResponse;
}
