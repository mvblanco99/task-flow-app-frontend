**Estructura elegida**:
- Se adoptó una arquitectura modular por funcionalidades (feature-based). Es escalable y fácil de entender: cada módulo agrupa su API, componentes, páginas, store y tipos, por lo que el nombre ya indica dónde buscar. Cada sección puede evolucionar de forma independiente; en el desarrollo real habrá acoplamientos puntuales entre módulos, pero eso es normal y manejable si las responsabilidades están bien delimitadas. En resumen: organizada, predecible y pensada para crecer.

**Patrón `as const` (valores literales tipados)**:
- Declaramos objetos constantes con `as const` y extraemos un tipo TypeScript a partir de sus valores para mantener tanto los valores en tiempo de ejecución como tipos estrictos en compilación (por ejemplo `TaskStatus.Pending` y `type TaskStatus = 'pending' | 'in-progress' | 'completed'`). Evita usar `enum`, mejora el autocompletado, reduce errores por typos en strings y centraliza los valores para su reutilización segura en runtime y en tipos.


