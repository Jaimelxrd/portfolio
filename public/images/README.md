# Imagens do portfólio

As imagens são servidas a partir de `public/images/`. Usa ficheiros próprios e actualiza os caminhos em `js/data.js` quando o nome ou formato mudar. Mantém os ficheiros optimizados para a web.

| Pasta | Conteúdo | Referência no projecto |
| --- | --- | --- |
| `profile/` | Retrato principal e fotografias pessoais | `profile.assets.portrait` e `profile.assets.personalGallery` |
| `experience/` | Fotografias de trabalhos profissionais que possam ser publicados | Campo `image` do registo de experiência, se usado |
| `projects/` | Capas ilustrativas e capturas dos projectos | `profile.assets.projectImages` |
| `certificates/` | Imagens de certificados | Campo `image` em `certifications` |

## Retrato principal

Substitui `profile/jaime.jpg` pelo retrato e conserva esse caminho em `profile.assets.portrait`. Se quiseres mudar o nome, basta alterar essa propriedade no início de `js/data.js`. A composição com as iniciais é apenas uma alternativa gráfica temporária e não representa uma fotografia.

## Galeria pessoal

Coloca imagens em `profile/` e actualiza as entradas de `profile.assets.personalGallery` com `src`, `alt` e `caption`. As legendas devem descrever o contexto real da fotografia.

## Projectos, experiência e certificados

As capas SVG actuais em `projects/` são ilustrações feitas para representar o tema de cada projecto; não são capturas nem confirmam funcionalidades ou resultados. Quando houver capturas reais, guarda-as nesta pasta e altera o caminho do identificador correspondente em `profile.assets.projectImages`. Para imagens de experiência, acrescenta uma propriedade de imagem ao registo respectivo quando os dados estiverem disponíveis. Para certificados, preenche o campo `image` com um caminho como `public/images/certificates/nome-do-curso.jpg` e inclui instituição, data e ligação de validação quando existirem.

As capas e as imagens de interface desenhadas por CSS na galeria são composições editoriais; não são capturas reais dos produtos.
