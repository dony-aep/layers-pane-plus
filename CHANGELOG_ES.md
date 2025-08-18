# Registro de Cambios

Todos los cambios notables de la extensión Layers Pane Plus serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
y este proyecto se adhiere al [Versionado Semántico](https://semver.org/spec/v2.0.0.html).

## [3.1.0] - 2025-08-15

### Añadido
- Opción "Orden Inverso" para secuenciación de capas - crear secuencias en orden inverso de selección
- Detección inteligente de secuencias - la extensión ahora detecta si las capas ya están secuenciadas y pide confirmación antes de re-secuenciar

### Mejorado
- Soporte completo para múltiples capas en capas Sólido, Luz y Cámara con diálogos nativos - Auto Emparentar e Igualar Duración ahora funcionan correctamente con múltiples capas seleccionadas
- Validación mejorada para Ajustes de Capa - ahora muestra advertencia específica cuando se seleccionan múltiples capas, requiriendo solo una selección de capa

### Actualizado
- Enlace de documentación actualizado a nueva ubicación: https://scriptsbydonyaep.vercel.app/extension/layers-pane-plus
- Los iconos de Material Symbols ahora usan peso 200 para mejor consistencia visual

### Corregido
- La función de secuencia ya no causa artefactos visuales (líneas punteadas) al re-secuenciar capas
- Eliminada redundancia de código removiendo funciones no utilizadas y limpiando comentarios

## [3.0.1] - 2025-05-30

### Añadido
- Carga local de la fuente Poppins desde la carpeta `fonts/`
- Opción de alternancia para el botón "Texto" que revela un campo de entrada de texto. Ahora puedes introducir texto personalizado para la nueva capa de texto; si se deja vacío, se crea una capa de texto por defecto como antes
- Opción de "Fotogramas adicionales" para el botón de División que aparece cuando la casilla "Auto eliminar partes divididas" está activada. Esta función incluye botones de incremento/decremento y validación para asegurar que solo se puedan introducir valores positivos
- Menú desplegable con nuevas opciones para el panel

### Cambiado
- Movidos los botones "Ajustes de Composición" y "Ajustes de Capa" a la pestaña "Editar"

### Corregido
- Verificación del tipo de capa para el botón "Ajustes de Capa" que muestra mensajes útiles cuando se usa con capas de Texto o Forma, que no tienen diálogos de configuración nativos en After Effects
- Compatibilidad mejorada y correcciones menores en la inicialización del menú contextual

## [3.0.0] - 2025-02-25

### Añadido
- **Conversión completa a Extensión CEP:** Ahora, este script se entrega como una extensión CEP con una interfaz de usuario actualizada y un flujo de trabajo mejorado
- **Compatibilidad para Auto Emparentar e Igualar Duración con todos los tipos de capas:** Ahora las capas Sólido, Luz y Cámara soportan completamente estas funciones
- **Manejo especial para capas de Luz:** Las capas de luz ahora afectan correctamente a las capas emparentadas sin compensación de posición
- **Opciones de dirección de recorte para la función de división:** Elige si deseas mantener el lado izquierdo o derecho al dividir con la opción de auto eliminar activada
- Retroalimentación visual al copiar enlaces con un icono de verificación blanco
- Diseño responsivo para diferentes tamaños de pantalla
- Componentes de UI modernos, incluyendo casillas de verificación personalizadas y botones de alternancia
- Retroalimentación de selección de texto al copiar enlaces para mejorar la experiencia del usuario

### Cambiado
- Interfaz de usuario completamente renovada con mejor capacidad de respuesta
- Rendimiento mejorado y funcionalidad extendida
- **Migrados los paneles de Ayuda y Configuración de JSX a modales HTML** para una mejor integración y experiencia de usuario
- Trasladadas las opciones de casillas de verificación de JSX a la interfaz HTML para interacción directa sin necesidad de recargar el script
- Opciones reorganizadas en paneles plegables para una interfaz más limpia

### Mejorado
- Sistema de tooltips con títulos descriptivos para todos los elementos interactivos

### Nota
Esta versión representa una evolución significativa respecto al enfoque basado en script anterior.

## [2.1.0]

### Añadido
- Nuevo botón para abrir el diálogo nativo de Ajustes de Composición
- Nuevo botón para abrir el diálogo nativo de Propiedades de Capa
- Soporte para Auto Emparentar e Igualar Duración con capas de Ajuste
- Botones de copiar y abrir enlace en el panel de contacto

### Cambiado
- Interfaz del panel de ayuda mejorada
- Títulos de los paneles simplificados para mejor visualización
- Presentación de la información de contacto optimizada

### Actualizado
- Documentación y textos de ayuda
- Experiencia general del usuario mejorada

## [2.0.1]

### Añadido
- Todos los iconos integrados directamente en el archivo del script

### Eliminado
- Dependencia de la carpeta de recursos externa

### Mejorado
- Estabilidad y compatibilidad del script
- Información de versión actualizada en los elementos de la interfaz

## [2.0]

### Añadido
- Panel de Configuración para personalización del script
- Función de Auto Emparentar Capas
- Funcionalidad de Igualar Duración de Capa
- Creación de Capa de Luz
- Opción de Auto Eliminar Partes Divididas
- Opción de Confirmación de Eliminación

### Mejorado
- Capacidad de respuesta y diseño de la interfaz
- Sistema de documentación y ayuda

## [1.7]

### Añadido
- Nuevo botón para precomponer rápidamente capas seleccionadas

### Cambiado
- Renombrada la función de división de capas para mayor claridad
- Mejorada la función de división de capas para manejar capas específicas o todas según la selección

## [1.6.5]

### Corregido
- Restaurada la alerta para composición activa en la función `splitAllLayers`
- Corregido el ID de comando para crear nueva composición

### Actualizado
- Funcionalidad de división de capas
- Texto de ayuda para el botón de división de capas

## [1.6.4]

### Cambiado
- Ajustada la función `splitAllLayers` para dividir capas sin notificaciones individuales

### Actualizado
- Texto de versión en la interfaz de usuario
- Documentación de ayuda

## [1.6.3]

### Añadido
- Botón para dividir capas
- Botón para crear nueva composición

### Mejorado
- Documentación de ayuda

## [1.6.2]

### Mejorado
- Creación de capas de texto
- Compatibilidad con varias versiones de After Effects

### Corregido
- Problemas de manejo de errores en nombrado de capas

## [1.6.1]

### Actualizado
- Creación de capas para usar comandos nativos de After Effects

### Mejorado
- Manejo de errores y retroalimentación del usuario

## [1.6]

### Mejorado
- Creación de capas sólidas usando diálogo nativo
- Implementado sistema de nombrado único para capas

## [1.5]

### Cambiado
- Reescrita la función de secuenciación de capas

## [1.4]

### Actualizado
- Función de secuenciación para respetar puntos de entrada y salida de capas

## [1.3]

### Añadido
- Función para crear secuencias de capas

## [1.2]

### Añadido
- Iconos a la interfaz de usuario
- Botones para eliminar capas y ayuda

## [1.1]

### Añadido
- Validaciones para cada botón
- Panel hecho acoplable en el espacio de trabajo
- Capacidad para ajustar tamaño de ventana

## [1.0]

### Añadido
- Lanzamiento inicial con funciones básicas de creación de capas
