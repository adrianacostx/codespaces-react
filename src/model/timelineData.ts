import { TimelineData } from './types';

export const INITIAL_TIMELINE_DATA: TimelineData = {
  title: "Evolución de los Lenguajes de Programación",
  subtitle: "Desde los primeros algoritmos teóricos hasta la era de la Inteligencia Artificial (1843 – Presente)",
  events: [
    {
      id: "hito-1",
      date: "1843",
      title: "El primer algoritmo de la historia",
      description: "La matemática británica Ada Lovelace escribió notas detalladas sobre la Máquina Analítica de Charles Babbage, incluyendo un método paso a paso para calcular los números de Bernoulli. Este es considerado universalmente como el primer software o algoritmo de la historia diseñado para ser ejecutado por una máquina.",
      category: "Fundamentos",
      color: "indigo"
    },
    {
      id: "hito-2",
      date: "1936",
      title: "La Máquina de Turing Universal",
      description: "Alan Turing publicó su artículo seminal sobre los números computables, introduciendo el concepto teórico de la Máquina de Turing. Este modelo matemático demostró que una sola máquina lógica podía simular cualquier algoritmo, sentando las bases teóricas de la computabilidad y los lenguajes de programación.",
      category: "Teoría",
      color: "violet"
    },
    {
      id: "hito-3",
      date: "1945",
      title: "Arquitectura de programa almacenado",
      description: "John von Neumann formalizó la arquitectura de computadoras con programa almacenado (EDVAC). Este diseño revolucionario permitió que las instrucciones del programa residieran en la misma memoria digital que los datos, eliminando la necesidad de recablear físicamente las máquinas para cada tarea nueva.",
      category: "Arquitectura",
      color: "blue"
    },
    {
      id: "hito-4",
      date: "1949",
      title: "Primeros códigos operativos: Short Code y Ensamblador",
      description: "Se desarrollaron los primeros sistemas rudimentarios para facilitar la escritura humana de instrucciones. Short Code (propuesto por John Mauchly) fue uno de los primeros lenguajes de expresiones matemáticas, y el ensamblador comenzó a reemplazar los códigos de máquina binarios directos por mnemotécnicos legibles.",
      category: "Bajo Nivel",
      color: "cyan"
    },
    {
      id: "hito-5",
      date: "1957",
      title: "Nacimiento de FORTRAN",
      description: "Desarrollado por IBM bajo la dirección de John Backus, FORTRAN (Formula Translation) se convirtió en el primer lenguaje de programación de alto nivel ampliamente utilizado para cálculos científicos y de ingeniería, permitiendo escribir código cercano al álgebra matemática.",
      category: "Alto Nivel",
      color: "teal"
    },
    {
      id: "hito-6",
      date: "1959",
      title: "Estandarización empresarial con COBOL",
      description: "Creado por el comité CODASYL (con fuerte influencia de Grace Hopper), COBOL fue diseñado específicamente para aplicaciones comerciales e institucionales. Su sintaxis similar al inglés buscaba que los ejecutivos y no programadores pudieran leer y auditar el código financiero.",
      category: "Empresarial",
      color: "emerald"
    },
    {
      id: "hito-7",
      date: "1972",
      title: "Revolución de los sistemas con el lenguaje C",
      description: "Diseñado por Dennis Ritchie en los Laboratorios Bell, el lenguaje C combinó elementos de lenguajes de alto nivel con acceso de bajo nivel a la memoria. Se convirtió en el cimiento técnico para UNIX y la base directa de casi todos los sistemas operativos y lenguajes modernos actuales (C++, C#, Java).",
      category: "Sistemas",
      color: "amber"
    },
    {
      id: "hito-8",
      date: "1991 - 1995",
      title: "Consolidación de la legibilidad y la portabilidad (Python y Java)",
      description: "Con la aparición de Python (1991, enfocado en la simplicidad y legibilidad del código) y Java (1995, con su lema 'escribe una vez, ejecuta en cualquier lugar'), la programación se democratizó masivamente y adoptó de forma global la programación orientada a objetos.",
      category: "Moderno",
      color: "orange"
    },
    {
      id: "hito-9",
      date: "2010 - 2012",
      title: "La era de la seguridad y el tipado moderno (Rust y TypeScript)",
      description: "Surgieron lenguajes diseñados para resolver problemas críticos de escala y seguridad: Rust (2010) redefinió el control de memoria sin recolector de basura evitando fallos críticos, mientras que TypeScript (2012) introdujo el tipado estático robusto en el ecosistema web, permitiendo mantener bases de código masivas sin colapsar.",
      category: "Seguridad & Escala",
      color: "rose"
    },
    {
      id: "hito-10",
      date: "2022 - Presente",
      title: "La programación asistida por Inteligencia Artificial",
      description: "Con la irrupción masiva de modelos de lenguaje grande (LLMs) y herramientas como GitHub Copilot y ChatGPT, el desarrollo de software dio un salto histórico. El lenguaje natural se convirtió en una interfaz de código directa, permitiendo que las IA actúen como co-creadores capaces de generar, optimizar y depurar sistemas en segundos.",
      category: "IA Generativa",
      color: "fuchsia"
    }
  ]
};