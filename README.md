# Jaime Fernando Nhacumba — Portfólio

Portfólio pessoal de **Jaime Fernando Nhacumba**, estudante de Engenharia de Tecnologias e Sistemas de Informação e freelancer na área de desenvolvimento de software, em Maputo, Moçambique.

O site reúne apresentação profissional, experiência, projectos, competências, formação e demonstrações interactivas. É uma aplicação estática feita com HTML, CSS e JavaScript, sem dependências de execução ou backend.

## Executar localmente

Não é necessária instalação de pacotes. Na pasta do projecto, inicia um servidor estático:

```powershell
python -m http.server 8000
```

Abre [http://localhost:8000](http://localhost:8000) no navegador. Também podes abrir `index.html` directamente, embora um servidor local seja mais adequado para testar os caminhos dos recursos.

## Estrutura

```text
.
├── index.html                 # Estrutura e conteúdo principal
├── css/
│   └── style.css              # Estilos, layout e animações
├── js/
│   ├── data.js                # Conteúdo do perfil, projectos e competências
│   └── main.js                # Navegação e funcionalidades interactivas
├── public/
│   └── images/
│       ├── about-dashboard.svg
│       ├── profile/           # Retrato e fotografias pessoais
│       ├── projects/          # Imagens de projectos
│       ├── experience/        # Imagens de experiência
│       └── certificates/      # Imagens de certificados
└── README.md
```

As pastas de imagens pessoais, experiência e certificados podem estar vazias até adicionares os respectivos ficheiros. Os projectos já incluem ilustrações SVG locais.

## Actualizar o conteúdo

- **Perfil, experiência, formação, projectos, tecnologias e galeria:** `js/data.js`.
- **Texto e estrutura das secções:** `index.html`.
- **Cores, tipografia, responsividade e animações:** `css/style.css`.
- **Comportamentos e demonstrações interactivas:** `js/main.js`.
- **Imagens:** `public/images/`; consulta também `public/images/README.md`.

Mantém datas, resultados, clientes e credenciais alinhados com informações que possas confirmar e partilhar.

## Demonstrações

A secção Laboratório contém exemplos interactivos de Java, Python, JavaScript e fluxo de API para interface. São demonstrações executadas no navegador; não dependem de um servidor de API nem executam uma JVM.

As animações respeitam a preferência `prefers-reduced-motion`, e o cursor personalizado é limitado a dispositivos com rato.

## Publicação

O site pode ser publicado em qualquer serviço de alojamento estático. No GitHub Pages, configura a publicação a partir da branch principal e da pasta raiz do repositório.

## Tecnologias

HTML5 · CSS3 · JavaScript · SVG