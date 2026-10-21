# Template de Portfólio Pessoal

Um template de portfólio responsivo, feito com HTML, CSS e JavaScript puro. Podes copiar este projecto, adaptar o visual e substituir o conteúdo pelos teus dados para criar e publicar o teu próprio portfólio.

## Começar

Faz um **fork** deste repositório no GitHub ou clona-o para o teu computador:

```bash
git clone https://github.com/Jaimelxrd/portfolio.git
cd portfolio
```

Para testar localmente, inicia um servidor estático na pasta do projecto:

```bash
python -m http.server 8000
```

Abre [http://localhost:8000](http://localhost:8000) no navegador. Não é necessário instalar dependências nem configurar um backend.

## Personalizar

1. **Substitui os dados de exemplo** em `js/data.js`: nome, localização, formação, experiências, projectos, competências, contactos e redes sociais. Remove qualquer informação que não queiras publicar.
2. **Revê os textos e metadados** em `index.html`, incluindo o título da página e a descrição para motores de busca.
3. **Adiciona as tuas imagens** em `public/images/`. Actualiza os caminhos em `js/data.js` se usares nomes ou pastas diferentes. Podes substituir os SVG de exemplo ou usar os teus próprios ficheiros.
4. **Ajusta a identidade visual** em `css/style.css`: cores, tipos de letra, espaçamentos e componentes.
5. **Adapta as interacções** em `js/main.js`, se necessário.
6. Abre o site localmente e confirma que os textos, ligações e imagens são teus antes de o publicares.

O projecto está disponível para reutilização e adaptação como base para o teu portfólio. Substitui a biografia, fotografias, projectos, contactos e outros dados pessoais do autor original; as informações e imagens de exemplo descrevem o portfólio de Jaime e não representam o teu percurso.

## Estrutura

```text
.
├── index.html                 # Estrutura, textos e metadados da página
├── css/
│   └── style.css              # Estilos, layout e animações
├── js/
│   ├── data.js                # Dados do perfil e conteúdo dos projectos
│   └── main.js                # Navegação e funcionalidades interactivas
└── public/
    └── images/
        ├── about-dashboard.svg
        ├── profile/           # Retrato e fotografias pessoais
        ├── projects/          # Imagens dos projectos
        ├── experience/        # Imagens de experiência
        └── certificates/      # Imagens de certificados
```

As pastas `profile`, `experience` e `certificates` podem começar vazias. Consulta `public/images/README.md` para orientações sobre os recursos visuais.

## Publicar

Podes publicar o site em qualquer serviço de alojamento estático. Para usar o GitHub Pages, envia o teu projecto para um repositório e selecciona a branch `main` e a pasta raiz nas definições de Pages.

## Tecnologias

HTML5 · CSS3 · JavaScript · SVG
