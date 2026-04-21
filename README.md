# Maria Moinhos Eventos

Site editorial bilingue (`PT` / `EN`) para apresentação de serviços, história da marca, portefólio, locais recomendados e formulário de contacto qualificado.

## Stack

- `Next.js` App Router
- `TypeScript`
- `Sanity` para CMS
- `Resend` para envio opcional do formulário de contacto

## Arranque local

1. Instalar dependências:

```bash
npm install
```

2. Copiar o ficheiro de ambiente e preencher o que estiver disponível:

```bash
cp .env.example .env.local
```

3. Correr o projeto:

```bash
npm run dev
```

O site abre em `http://localhost:3000` e redireciona para `/pt`.

## CMS

O CMS está preparado em `/studio`.

Para ativar o Sanity, adiciona:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`

Com essas variáveis definidas, a área de Studio passa a usar os schemas incluídos para:

- definições globais
- pacotes de serviço
- portefólio
- locais
- testemunhos

## Formulário de contacto

O formulário funciona em dois modos:

- com `RESEND_API_KEY` e `CONTACT_EMAIL_TO`, envia email
- sem essas variáveis, aceita o pedido e regista-o no log do servidor

## Conteúdo provisório

Enquanto o conteúdo real não estiver completo, o site usa dados fallback definidos em `src/lib/content.ts`. Assim, a estrutura visual fica pronta sem depender logo do CMS.

## Imagens

O repositório guarda apenas imagens finais para o site em `public/editorial/`.

- Usa `public/editorial/` para ficheiros já exportados para web, comprimidos e com nomes estáveis.
- `Photos/`, `imagens/` e exportações soltas de WhatsApp ficam fora de git e devem ser mantidos apenas localmente ou num armazenamento externo.
- Para galerias maiores ou conteúdo que muda com frequência, prefere o `Sanity` ou outro storage/CDN em vez de aumentar o histórico do git.
- Não adicionar originais em alta resolução, ficheiros `.zip` ou seleções brutas ao repositório.
