window.PORTFOLIO_DATA = {
  profile: {
    name: 'Jaime Fernando Nhacumba',
    city: 'Maputo, Moçambique',
    github: 'Jaimelxrd',
    degree: 'Engenharia de Tecnologias e Sistemas de Informação',
    university: 'Universidade Joaquim Chissano',
    year: 'Terceiro ano',
    specialization: 'Engenharia de Software',
    assets: {
      portrait: 'public/images/profile/jaime.jpg',
      portraitCaption: 'JAIME FERNANDO NHACUMBA',
      personalGallery: [
        { src: 'public/images/profile/percurso.jpg', alt: 'Jaime durante o seu percurso académico', caption: 'PERCURSO' },
        { src: 'public/images/profile/trabalho.jpg', alt: 'Jaime num contexto de trabalho', caption: 'PROCESSO' }
      ],
      projectImages: {
        pisolver: 'public/images/projects/pisolver.svg',
        weather: 'public/images/projects/weather-console.svg',
        study: 'public/images/projects/assistente-estudos.svg',
        explicamoz: 'public/images/projects/explicamoz.svg',
        xitique: 'public/images/projects/xitique.svg',
        rpg: 'public/images/projects/cronicas-avaloria.svg',
        meuportfolio: 'public/images/projects/meuportfolio-desktop.svg'
      }
    }
  },
  experiences: [
    {
      type: 'software', organization: 'Trabalho independente', role: 'Freelancer — desenvolvimento de software',
      start: null, end: null,
      description: 'Desenvolvimento de projectos e ideias para outras pessoas, além de projectos próprios. A participação pode abranger análise de necessidades, clarificação de requisitos, desenho da solução, implementação e entrega.',
      responsibilities: ['Analisar o contexto e as necessidades apresentadas', 'Definir uma abordagem técnica adequada ao problema', 'Implementar, rever e preparar a entrega do software'],
      technologies: [], relatedProjects: [], results: [],
      note: 'Datas, clientes, responsabilidades específicas, tecnologias e resultados devem ser acrescentados por projecto quando puderem ser partilhados.'
    }
  ],
  teaching: {
    description: 'Apoio estudantes do ensino secundário e superior na compreensão de conceitos científicos, matemáticos e tecnológicos, procurando desenvolver o raciocínio lógico, a capacidade de resolução de problemas e a compreensão prática das matérias.',
    topics: ['Matemática e Física', 'Análise Matemática', 'Bases de Dados', 'Programação Java e Python', 'Outras disciplinas técnicas relacionadas com a minha formação e conhecimentos'],
    institutions: []
  },
  education: [
    {
      course: 'Engenharia de Tecnologias e Sistemas de Informação',
      institution: 'Universidade Joaquim Chissano',
      period: 'Terceiro ano',
      focus: 'Especialização em Engenharia de Software',
      status: 'Em curso'
    }
  ],
  // Registos: { name, issuer, date, credentialId, verificationUrl, image, description, skills: [] }.
  // Manter vazio até haver dados reais de certificados ou cursos concluídos.
  certifications: [],
  featuredProjects: [
    {
      id: 'explicamoz', name: 'ExplicaMoz', category: 'EDUCAÇÃO · API', status: 'API em desenvolvimento', statusTone: 'status-progress',
      summary: 'API de conteúdos curriculares moçambicanos, com pesquisa e navegação por conteúdos relacionados.',
      context: 'Conteúdos curriculares organizados para consulta por estudantes e docentes.',
      problem: 'Encontrar e relacionar conteúdos programáticos pode ser difícil quando a informação está dispersa.',
      objective: 'Disponibilizar uma API para listar, pesquisar e relacionar conteúdos curriculares, com operações administrativas.',
      contribution: 'Repositório público desenvolvido com Java e Spring Boot. A participação individual e os resultados de utilização não estão documentados.',
      approach: 'API REST com persistência relacional, operações de pesquisa e gestão de conteúdos.',
      architecture: 'Spring Boot, Spring Data JPA e PostgreSQL; o projecto inclui Lombok e Maven.',
      technologies: ['Java 17', 'Spring Boot', 'Spring Data JPA', 'PostgreSQL', 'Maven'],
      challenges: 'Não há registo público suficiente para afirmar desafios específicos ou resultados medidos.',
      implementation: 'Repositório público. A documentação descreve API e gestão de conteúdos; não há métricas de utilização publicadas.',
      results: [], repo: 'ExplicaMoz', visual: 'education', layout: 'wide',
      visualLabel: 'CONTEÚDO CURRICULAR / API'
    },
    {
      id: 'pisolver', name: 'PiSolver', category: 'FERRAMENTA · MATEMÁTICA', status: 'Implementação pública', statusTone: 'status-live',
      summary: 'Ferramenta web para explorar cálculos, equações, sistemas, cálculo simbólico e gráficos.',
      context: 'Uma aplicação de apoio à exploração de problemas matemáticos no navegador.',
      problem: 'Reunir operações e visualizações matemáticas num espaço interactivo.',
      objective: 'Permitir experimentar diferentes operações a partir de uma interface web.',
      contribution: 'Repositório público com interface HTML, CSS e JavaScript. O repositório não tem README que descreva autoria individual ou estado de produção.',
      approach: 'Interface web com operações matemáticas e bibliotecas Math.js e Plotly.',
      architecture: 'HTML, CSS e JavaScript no cliente, com bibliotecas importadas para cálculo e visualização.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Math.js', 'Plotly'],
      challenges: 'A descrição do projecto foi inferida a partir da interface e do código público; não há documentação formal de resultados.',
      implementation: 'Código disponível publicamente. O repositório não documenta utilizadores, métricas nem um lançamento de produção.',
      results: [], repo: 'PiSolver', visual: 'math', layout: 'large',
      visualLabel: 'INTERFACE MATEMÁTICA / WEB'
    },
    {
      id: 'weather', name: 'Weather Console Java', category: 'JAVA · API', status: 'Implementação pública', statusTone: 'status-live',
      summary: 'Aplicação de consola que procura uma cidade e consulta condições meteorológicas através da Open-Meteo.',
      context: 'Aplicação de linha de comandos para obter condições meteorológicas por cidade.',
      problem: 'Uma consulta precisa de transformar o nome de uma cidade em coordenadas e tratar a resposta da API.',
      objective: 'Pesquisar uma localidade e apresentar temperatura, humidade, vento e hora local.',
      contribution: 'Repositório Java público com cliente HTTP do JDK, geocoding e tratamento de entradas e pedidos inválidos.',
      approach: 'Geocodificação da cidade, pedido HTTP à API meteorológica e apresentação formatada na consola.',
      architecture: 'Java 23, Maven, JDK HttpClient, Jackson e Open-Meteo.',
      technologies: ['Java 23', 'Maven', 'HttpClient', 'Jackson', 'Open-Meteo'],
      challenges: 'O fluxo depende de serviços externos; o projecto trata entradas inválidas e falhas de pedido documentadas no código.',
      implementation: 'Código e README públicos. Não há métricas de utilização publicadas.',
      results: [], repo: 'weather-console-java', visual: 'weather', layout: 'tall',
      visualLabel: 'CIDADE → COORDENADAS → PREVISÃO'
    },
    {
      id: 'study', name: 'Assistente de Estudos', category: 'JAVA · IA · JDBC', status: 'Em desenvolvimento', statusTone: 'status-progress',
      summary: 'Aplicação de consola para organizar projectos de estudo e guardar planos gerados com Gemini em MySQL.',
      context: 'Ferramenta de apoio à organização de estudos e prazos.',
      problem: 'Acompanhar projectos de estudo e organizar próximos passos num só fluxo.',
      objective: 'Gerir projectos de estudo e gerar planos de apoio com integração Gemini.',
      contribution: 'O repositório documenta operações de projecto, prazos estimados e planos guardados. Funções de tarefas e notificações existem em código, mas não estão integradas no menu principal.',
      approach: 'Aplicação Java de consola com persistência JDBC em MySQL e integração de geração de texto.',
      architecture: 'Java, JDBC, MySQL e Gemini. A documentação também descreve limitações técnicas e configuração em aberto.',
      technologies: ['Java', 'JDBC', 'MySQL', 'Gemini'],
      challenges: 'O estado da integração e configuração é parcial; tarefas e notificações não estão ligadas ao menu principal.',
      implementation: 'Em desenvolvimento. A documentação do repositório detalha limitações que ainda precisam de trabalho.',
      results: [], repo: 'AI-Study-Manager', visual: 'study', layout: 'wide',
      visualLabel: 'PROJECTOS DE ESTUDO / MYSQL'
    },
    {
      id: 'xitique', name: 'Plataforma de Gestão de Xitiques', category: 'GESTÃO · EXPLORAÇÃO', status: 'Parcial', statusTone: 'status-idea',
      summary: 'Projecto parcialmente desenvolvido para apoiar a organização de grupos de poupança.',
      context: 'A ideia parte da gestão de grupos de poupança conhecidos como xitiques.',
      problem: 'Organizar a participação e a informação do grupo num processo mais claro.',
      objective: 'Explorar uma plataforma de apoio à gestão de xitiques.',
      contribution: 'O projecto foi indicado como parcialmente desenvolvido. Não há repositório ou registo de responsabilidades específicas confirmados.',
      approach: '', architecture: '', technologies: [], challenges: '',
      implementation: 'Parcial. Tecnologias, integrações com M-Pesa ou e-Mola, demonstração e resultados ainda não foram confirmados.',
      results: [], repo: '', visual: 'code', layout: 'wide',
      visualLabel: 'GESTÃO DE GRUPOS / EM DESENVOLVIMENTO'
    },
    {
      id: 'rpg', name: 'Crónicas de Avaloria', category: 'JAVA · RPG POR TURNOS', status: 'Implementação pública', statusTone: 'status-live',
      summary: 'RPG de consola em Java com batalhas sequenciais, progressão de nível e um chefe final.',
      context: 'Jogo de interpretação de papéis em linha de comandos, ambientado no reino de Avaloria.',
      problem: 'Praticar programação orientada a objectos através de um jogo com estado, regras de combate e progressão.',
      objective: 'Criar uma campanha por turnos em que o jogador enfrenta inimigos por ordem e avança até ao Senhor das Trevas.',
      contribution: 'Repositório público com código Java e documentação das mecânicas. O README descreve herança, composição, sobrescrita, enums, arrays e excepções personalizadas.',
      approach: 'Combate por turnos com escolhas de ataque, defesa, habilidade ou item; o inimigo age automaticamente e a experiência permite subir de nível.',
      architecture: 'Java para consola, com lógica de batalha, progressão do jogador e dados de inimigos, inventário e habilidades em arrays.',
      technologies: ['Java 8+', 'POO', 'Arrays', 'Enums', 'Excepções personalizadas'],
      challenges: 'O README documenta regras de combate, escudo com duração de três turnos, recuperação de vida após vitórias e condições de derrota.',
      implementation: 'Jogo de consola documentado no repositório. O README informa que, ao perder, o jogador regressa ao início da sequência.',
      results: [], repo: 'Jogo-RPG-1', visual: 'rpg', layout: 'wide',
      visualLabel: 'AVALORIA / RPG EM JAVA'
    },
    {
      id: 'meuportfolio', name: 'MeuPortfolio · Desktop Interactivo', category: 'REACT · PORTFÓLIO', status: 'Implementação pública', statusTone: 'status-live',
      summary: 'Portfólio pessoal que apresenta perfil, projectos e competências num ambiente interactivo inspirado num desktop.',
      context: 'Uma interface pessoal organizada como um sistema desktop virtual, com aplicações e janelas navegáveis.',
      problem: 'Apresentar informação profissional e projectos dentro de uma interface pessoal mais explorável.',
      objective: 'Reunir perfil, currículo, competências, projectos e contactos num portfólio interactivo.',
      contribution: 'Repositório público com aplicação React, estrutura de dados e interacções de janelas, pesquisa, ficheiros e definições.',
      approach: 'Aplicação de página única com componentes React, ícones Lucide e dados organizados em módulos JavaScript.',
      architecture: 'React e Vite para o cliente, com estilos CSS e armazenamento local das preferências do utilizador.',
      technologies: ['React', 'Vite', 'JavaScript', 'CSS', 'Lucide React'],
      challenges: 'O repositório mantém cartões de projectos de demonstração marcados como provisórios; devem ser substituídos por informação confirmada.',
      implementation: 'Aplicação pública no GitHub. A descrição do repositório identifica a interface desktop interactiva; alguns conteúdos de projecto continuam identificados como exemplos provisórios.',
      results: [], repo: 'MeuPortfolio', visual: 'portfolio', layout: 'wide',
      visualLabel: 'AMBIENTE DESKTOP / REACT'
    }
  ],
  explorations: [
    { number: '01', title: 'Gestão de Xitiques', category: 'IDEIA EM DESENVOLVIMENTO', status: 'Parcial', description: 'Plataforma para apoiar a gestão de grupos de poupança. Integrações de pagamento não confirmadas.' },
    { number: '02', title: 'Assistente de atendimento e vendas', category: 'CONCEITO', status: 'Em exploração', description: 'Conceito de assistente para apoiar interacções de atendimento e tarefas de venda.' },
    { number: '03', title: 'Aulas de programação online', category: 'CONCEITO', status: 'Em definição', description: 'Ideia de plataforma para aulas de programação. Pagamentos e vídeo ainda não são funcionalidades confirmadas.' }
  ],
  skills: [
    { category: 'LINGUAGENS', items: [
      { name: 'Java', project: 'weather-console-java' }, { name: 'Python' }, { name: 'PHP' }, { name: 'JavaScript', project: 'PiSolver' }, { name: 'HTML & CSS', project: 'PiSolver' }, { name: 'Flex' }
    ] },
    { category: 'APLICAÇÕES E SERVIÇOS', items: [
      { name: 'Spring Boot', project: 'ExplicaMoz' }, { name: 'Django' }, { name: 'React' }, { name: 'APIs REST', project: 'ExplicaMoz' }, { name: 'Integração com IA', project: 'AI-Study-Manager' }
    ] },
    { category: 'DADOS E FERRAMENTAS', items: [
      { name: 'PostgreSQL', project: 'ExplicaMoz' }, { name: 'JDBC', project: 'AI-Study-Manager' }, { name: 'MySQL', project: 'AI-Study-Manager' }, { name: 'SQLAlchemy' }, { name: 'Git & GitHub' }
    ] }
  ],
  repositories: ['ExplicaMoz', 'PiSolver', 'weather-console-java', 'AI-Study-Manager', 'Jogo-RPG-1', 'MeuPortfolio'],
  labExamples: {
    java: {
      language: 'JAVA · EXEMPLO DE LEITURA', title: 'Validar antes de persistir.', file: 'StudyPlanService.java',
      lines: [
        'public StudyPlan save(StudyPlan plan) {',
        '  if (plan == null) {',
        '    throw new IllegalArgumentException(',
        '      "Plano obrigatório");',
        '  }',
        '  plan.validate();',
        '  return repository.save(plan);',
        '}'
      ],
      caption: 'Exemplo didáctico de validação antes da persistência. A animação revela o código; não executa uma JVM.',
      demoLabel: 'ORDEM DAS OPERAÇÕES', demoType: 'steps',
      steps: ['Receber o plano', 'Verificar entrada', 'Validar regras', 'Persistir no repositório'],
      explanation: 'A validação acontece antes da chamada ao repositório. Assim, a camada de persistência só recebe dados que passaram pelas regras do domínio.'
    },
    python: {
      language: 'PYTHON · ALGORITMO DIDÁCTICO', title: 'Inserção, uma posição de cada vez.', file: 'insertion_sort.py',
      lines: [
        'def insertion_sort(values):',
        '    for i in range(1, len(values)):',
        '        current = values[i]',
        '        j = i - 1',
        '        while j >= 0 and values[j] > current:',
        '            values[j + 1] = values[j]',
        '            j -= 1',
        '        values[j + 1] = current',
        '    return values'
      ],
      caption: 'Trecho Python de referência. A ordenação visual abaixo reproduz o mesmo algoritmo em JavaScript no navegador; não executa Python.',
      demoLabel: 'ESTADO DO ALGORITMO', demoType: 'bars',
      explanation: 'A parte à esquerda do marcador já está ordenada. Cada novo valor é comparado e inserido na posição correcta.'
    },
    javascript: {
      language: 'JAVASCRIPT · INTERACÇÃO REAL', title: 'Normalizar um identificador.', file: 'slug.js',
      lines: [
        'function makeSlug(value) {',
        '  return value',
        '    .normalize("NFD")',
        '    .replace(/[\\u0300-\\u036f]/g, "")',
        '    .toLowerCase()',
        '    .trim()',
        '    .replace(/[^a-z0-9]+/g, "-")',
        '    .replace(/^-|-$/g, "");',
        '}'
      ],
      caption: 'Este exemplo corresponde à função que processa o campo abaixo no navegador.',
      demoLabel: 'ESCREVE PARA TRANSFORMAR', demoType: 'slug',
      explanation: 'A função remove diacríticos, converte para minúsculas e substitui sequências de caracteres não alfanuméricos por hífen.'
    },
    api: {
      language: 'API · TRANSFORMAÇÃO LOCAL', title: 'Da resposta ao componente.', file: 'weather-response.json',
      lines: [
        'const response = {',
        '  name: "Maputo",',
        '  current: { temperature_2m: 26,',
        '    relative_humidity_2m: 68 }',
        '};',
        '',
        'const card = {',
        '  city: response.name,',
        '  temperature: response.current.temperature_2m,',
        '  humidity: response.current.relative_humidity_2m',
        '};'
      ],
      caption: 'Payload ilustrativo inspirado na estrutura de dados meteorológicos. Este exemplo transforma dados locais; não faz um pedido de rede.',
      demoLabel: 'FLUXO DE DADOS', demoType: 'api',
      explanation: 'Uma camada de mapeamento isola a forma da resposta externa do formato de que a interface precisa.'
    }
  },
  process: [
    { title: 'Ouvir', detail: 'Perceber o contexto, as pessoas envolvidas e a necessidade real.' },
    { title: 'Definir', detail: 'Organizar requisitos, restrições e o que significa resolver o problema.' },
    { title: 'Desenhar', detail: 'Escolher uma estrutura e explicitar as decisões técnicas.' },
    { title: 'Construir', detail: 'Implementar em partes pequenas e rever o comportamento.' },
    { title: 'Entregar', detail: 'Validar, documentar e combinar os próximos passos.' }
  ]
};
