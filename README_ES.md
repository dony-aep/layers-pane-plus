# Layers Pane Plus por dony.

[![English](https://img.shields.io/badge/Language-English-blue.svg)](README.md)
[![Español](https://img.shields.io/badge/Idioma-Español-red.svg)](README_ES.md)

> **[Read in English](README.md) | Leer en Español**

## Descripción
Layers Pane Plus es una extensión avanzada para Adobe After Effects que proporciona funcionalidad extendida para la creación y gestión de capas. Previamente distribuido como un script único, Layers Pane Plus ha evolucionado a una extensión CEP, ofreciendo una experiencia más robusta, moderna e integrada en After Effects.

## Versión Actual
**v3.1.0** - Última actualización: Añadida funcionalidad de secuencia inversa, soporte mejorado para múltiples capas en capas con diálogos nativos, validación mejorada para Ajustes de Capa y enlaces de documentación actualizados.

## Instalación
1. Localiza la carpeta de extensiones CEP de After Effects:
   ```
   C:\Program Files (x86)\Common Files\Adobe\CEP\extensions
   ```
2. Coloca la carpeta completa de la extensión (Layers Pane Plus) en esta carpeta.
3. Inicia After Effects y accede a la extensión desde **Ventana > Extensiones > Layers Pane Plus**.

## Características Principales
- Creación rápida de varios tipos de capas: Texto, Sólido, Objeto Nulo, Forma, Cámara, Luz, Ajuste
- Eliminación de capas seleccionadas con opción de confirmación
- Creación de secuencias de capas basadas en el orden de selección con opción de orden inverso
- División de capas en el indicador de tiempo actual con opciones de dirección de recorte
- Precomposición de capas seleccionadas utilizando el diálogo nativo de After Effects
- Creación de nuevas composiciones utilizando el diálogo nativo de After Effects
- Auto Emparentar Capas (Compatible con todos los tipos de capas)
- Igualar Duración de Capa (Compatible con todos los tipos de capas)
- Panel de ajustes para personalizar el comportamiento de la extensión
- Interfaz amigable con botones con iconos
- Panel acoplable en el espacio de trabajo
- Ventana redimensionable con alineación adaptativa de botones

## Opciones de Configuración
- Auto Emparentar Capas: Emparenta automáticamente las capas seleccionadas a las nuevas capas
- Igualar Duración de Capa: Las nuevas capas igualan la duración de las capas seleccionadas
- Auto Eliminar Partes Divididas: Opción para eliminar automáticamente las partes divididas
- Dirección de Recorte: Elige si deseas mantener el lado izquierdo o derecho al dividir con la opción de auto eliminar activada
- Mostrar Confirmación de Eliminación: Alternar diálogo de confirmación para eliminación de capas
- Orden de Secuencia Inverso: Crear secuencias de capas en orden inverso de selección

## Uso
1. Abre Adobe After Effects.
2. Ve a **Ventana > Extensiones > Layers Pane Plus**.
3. Usa los botones para crear diferentes tipos de capas o realizar acciones.
4. Accede al panel de Configuración para personalizar el comportamiento de la extensión.
5. Para secuenciar capas:
   - Selecciona las capas en el orden deseado.
   - Activa la opción "Orden Inverso" si es necesario.
   - Haz clic en el botón de secuencia.
   - La extensión detectará si las capas ya están secuenciadas y pedirá confirmación.
6. Para crear capas con emparentamiento o igualación de duración:
   - Habilita las opciones deseadas en el panel de Configuración.
   - Selecciona la(s) capa(s) objetivo - múltiples capas soportadas para todos los tipos de capas.
   - Crea una nueva capa de cualquier tipo (Texto, Forma, Objeto Nulo, Sólido, Luz, Cámara o Ajuste).
7. Para dividir capas:
   - Posiciona el indicador de tiempo.
   - Selecciona capas específicas o deja sin seleccionar para aplicar a todas.
   - Haz clic en el botón de división.
   - Cuando "Auto Eliminar Partes Divididas" está activado, usa los botones de radio "Dirección de Recorte" para elegir si deseas mantener el lado izquierdo o derecho de la división.
8. Para precomponer:
   - Selecciona las capas a precomponer.
   - Haz clic en el botón de precomposición.
   - Utiliza el diálogo nativo de After Effects.
9. Para Ajustes de Capa:
   - Selecciona solo UNA capa (la extensión advertirá si se seleccionan múltiples capas).
   - Haz clic en el botón Ajustes de Capa.

## Historial de Versiones

### v3.1.0 - 15 de Agosto del 2025
- **Nuevo:** Añadida opción "Orden Inverso" para secuenciación de capas - crear secuencias en orden inverso de selección
- **Nuevo:** Detección inteligente de secuencias - la extensión ahora detecta si las capas ya están secuenciadas y pide confirmación antes de re-secuenciar
- **Mejorado:** Soporte completo para múltiples capas en capas Sólido, Luz y Cámara con diálogos nativos - Auto Emparentar e Igualar Duración ahora funcionan correctamente con múltiples capas seleccionadas
- **Mejorado:** Validación mejorada para Ajustes de Capa - ahora muestra advertencia específica cuando se seleccionan múltiples capas, requiriendo solo una selección de capa
- **Actualizado:** Enlace de documentación actualizado a nueva ubicación: https://scriptsbydonyaep.vercel.app/extension/layers-pane-plus
- **Actualizado:** Los iconos de Material Symbols ahora usan peso 200 para mejor consistencia visual
- **Corregido:** La función de secuencia ya no causa artefactos visuales (líneas punteadas) al re-secuenciar capas
- **Corregido:** Eliminada redundancia de código removiendo funciones no utilizadas y limpiando comentarios

### v3.0.1 - 30 de Mayo del 2025
- Añadida carga local de la fuente Poppins desde la carpeta `fonts/`.
- Movidos los botones "Ajustes de Composición" y "Ajustes de Capa" a la pestaña "Editar".
- Introducido un menú desplegable con nuevas opciones para el panel.
- Mejorada la compatibilidad y correcciones menores en la inicialización del menú contextual.
- **Nuevo:** Añadida una opción de alternancia para el botón "Texto" que revela un campo de entrada de texto. Ahora puedes introducir texto personalizado para la nueva capa de texto; si se deja vacío, se crea una capa de texto por defecto como antes.
- **Nuevo:** Añadida una opción de "Fotogramas adicionales" para el botón de División que aparece cuando la casilla "Auto eliminar partes divididas" está activada. Esta función incluye botones de incremento/decremento y validación para asegurar que solo se puedan introducir valores positivos.
- **Corregido:** Añadida una verificación del tipo de capa para el botón "Ajustes de Capa" que muestra mensajes útiles cuando se usa con capas de Texto o Forma, que no tienen diálogos de configuración nativos en After Effects.

### v3.0.0 - 25 de Febrero del 2025
- **Conversión completa a Extensión CEP:** Ahora, este script se entrega como una extensión CEP con una interfaz de usuario actualizada y un flujo de trabajo mejorado.
- Interfaz de usuario completamente renovada con mejor capacidad de respuesta.
- Rendimiento mejorado y funcionalidad extendida.
- **Añadida compatibilidad para Auto Emparentar e Igualar Duración con todos los tipos de capas:** Ahora las capas Sólido, Luz y Cámara soportan completamente estas funciones.
- **Manejo especial para capas de Luz:** Las capas de luz ahora afectan correctamente a las capas emparentadas sin compensación de posición.
- **Añadidas opciones de dirección de recorte para la función de división:** Elige si deseas mantener el lado izquierdo o derecho al dividir con la opción de auto eliminar activada.
- Añadida retroalimentación visual al copiar enlaces con un icono de verificación blanco.
- Sistema de tooltips mejorado con títulos descriptivos para todos los elementos interactivos.
- Opciones reorganizadas en paneles plegables para una interfaz más limpia.
- Añadido diseño responsivo para diferentes tamaños de pantalla.
- **Migrados los paneles de Ayuda y Configuración de JSX a modales HTML** para una mejor integración y experiencia de usuario.
- Trasladadas las opciones de casillas de verificación de JSX a la interfaz HTML para interacción directa sin necesidad de recargar el script.
- Implementados componentes de UI modernos, incluyendo casillas de verificación personalizadas y botones de alternancia.
- Añadida retroalimentación de selección de texto al copiar enlaces para mejorar la experiencia del usuario.
- Esta versión representa una evolución significativa respecto al enfoque basado en script anterior.

### v2.1.0
- Añadido nuevo botón para abrir el diálogo nativo de Ajustes de Composición
- Añadido nuevo botón para abrir el diálogo nativo de Propiedades de Capa
- Añadido soporte para Auto Emparentar e Igualar Duración con capas de Ajuste
- Mejorada la interfaz del panel de ayuda
- Simplificados los títulos de los paneles para mejor visualización
- Añadidos botones de copiar y abrir enlace en el panel de contacto
- Optimizada la presentación de la información de contacto
- Actualizada la documentación y textos de ayuda
- Mejorada la experiencia general del usuario

### v2.0.1
- Integrados todos los iconos directamente en el archivo del script
- Eliminada la dependencia de la carpeta de recursos externa
- Mejorada la estabilidad y compatibilidad del script
- Actualizada la información de versión en los elementos de la interfaz

### v2.0
- Añadido panel de Configuración para personalización del script
- Implementada función de Auto Emparentar Capas
- Añadida funcionalidad de Igualar Duración de Capa
- Añadida creación de Capa de Luz
- Introducida opción de Auto Eliminar Partes Divididas
- Añadida opción de Confirmación de Eliminación
- Mejorada la capacidad de respuesta y diseño de la interfaz
- Mejorado el sistema de documentación y ayuda

### v1.7
- Renombrada la función de división de capas para mayor claridad
- Mejorada la función de división de capas para manejar capas específicas o todas según la selección
- Añadido un nuevo botón para precomponer rápidamente capas seleccionadas

### v1.6.5
- Restaurada la alerta para composición activa en la función `splitAllLayers`
- Actualizada la funcionalidad de división de capas
- Corregido el ID de comando para crear nueva composición
- Actualizado el texto de ayuda para el botón de división de capas

### v1.6.4
- Ajustada la función `splitAllLayers` para dividir capas sin notificaciones individuales
- Actualizado el texto de versión en la interfaz de usuario
- Actualizada la documentación de ayuda

### v1.6.3
- Añadido botón para dividir capas
- Añadido botón para crear nueva composición
- Mejorada la documentación de ayuda

### v1.6.2
- Mejorada la creación de capas de texto
- Corregidos problemas de manejo de errores en nombrado de capas
- Mejorada la compatibilidad con varias versiones de After Effects

### v1.6.1
- Actualizada la creación de capas para usar comandos nativos de After Effects
- Mejorado el manejo de errores y retroalimentación del usuario

### v1.6
- Mejorada la creación de capas sólidas usando diálogo nativo
- Implementado sistema de nombrado único para capas

### v1.5
- Reescrita la función de secuenciación de capas

### v1.4
- Actualizada la función de secuenciación para respetar puntos de entrada y salida de capas

### v1.3
- Añadida función para crear secuencias de capas

### v1.2
- Añadidos iconos a la interfaz de usuario
- Añadidos botones para eliminar capas y ayuda

### v1.1
- Añadidas validaciones para cada botón
- Panel hecho acoplable en el espacio de trabajo
- Añadida capacidad para ajustar tamaño de ventana

### v1.0
- Lanzamiento inicial con funciones básicas de creación de capas

## Soporte
Si necesitas ayuda o quieres proporcionar retroalimentación, puedes contactarme aquí:
[https://linktr.ee/Dony.ae](https://linktr.ee/Dony.ae)

¡Disfruta esta extensión y feliz creación!