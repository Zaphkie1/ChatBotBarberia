const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

// Respuestas para registrar una cita
const flowGenerarCita = addKeyword(['cita']).addAnswer(
    [
        '📝 Perfecto, para registrar tu cita, por favor, proporciona tus datos:',
        '1. Nombre completo:',
        '2. Número de teléfono:',
        '3. Correo electrónico:',
        '\nEjemplo: "Juan Pérez, +123456789, juan@example.com".',
        '\n\n 👉 Escribe *menu* para volver al menu principal.'
    ]
);

// Respuestas relacionadas con horarios de atención
const flowHorarios = addKeyword(['horarios', 'atencion']).addAnswer(
    [
        '🕒 Nuestros horarios de atención son:',
        'Lunes a Sabado: 4:00 PM - 20:00 PM',
        'Domingo: 12:00 AM - 4:00 PM',
        '\n\n 👉 Escribe *menu* para volver al menu principal.'
    ]
);
// Respuestas relacionadas con la ubicacion
const flowUbicacion = addKeyword(['ubicacion', 'direccion', 'contacto']).addAnswer(
    [
        '📍 Estamos ubicados en el siguiente lugar:',
        'Dirección: Granados 210, Huerta Vieja, 98087 Zacatecas, Zac.',
        '📞 Puedes comunicarte con nosotros al: +123 456 789',
        '\n\nPuedes usar el siguiente enlace para ver el mapa:',
        'https://maps.google.com/?q=Granados+210,Huerta+Vieja,98087,Zacatecas,Zac',
        '\n\n 👉 Escribe *menu* para volver al menu principal.'
    ]
);

// Respuestas de servicios
const flowservicios = addKeyword('servicios').addAnswer(
    [
        'Servicios en espera del cliente',
        '\n\n 👉 Escribe *menu* para volver al menu principal.'
    ]
);

// Respuestas de bienvenida y enlace a servicios, ubicación, horarios y generación de cita
const flowPrincipal = addKeyword(['hola', 'bienvenido', 'saludo', 'menu']).addAnswer(
    [
        '👋 ¡Bienvenido!',
        '🤵 ¿En qué podemos ayudarte hoy?',
        '👉 Escribe *servicios* para conocer nuestros servicios.',
        '👉 Escribe *ubicacion* para ver nuestra dirección y contacto.',
        '👉 Escribe *horarios* para conocer nuestros horarios de atención.',
        '👉 Escribe *cita* para agendar una cita.'
    ],null,null,
    [flowservicios, flowUbicacion, flowHorarios, flowGenerarCita]
);

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
