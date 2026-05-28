# Pedido Senhor dos Aneis Design

## Objetivo

Criar uma pagina engraçada e romantica em Next.js, pronta para deploy na Vercel, convidando a pessoa para assistir Senhor dos Aneis hoje a noite.

## Experiencia

A primeira tela mostra o convite em destaque e dois botoes: `Sim` e `Nao`. O botao `Nao` foge do cursor em tempo real quando o mouse se aproxima, mantendo-se dentro da area visivel da tela. O botao `Sim` confirma o convite.

Depois da confirmacao, a tela mostra a foto presente no diretorio e a mensagem romantica `Te aguardo entao, meu amor.`.

## Arquitetura

O app usa Next.js com App Router. A pagina principal fica em `app/page.tsx` como componente client-side por causa das interacoes com ponteiro e estado. A logica de calcular a proxima posicao do botao `Nao` fica em `app/no-button-motion.ts` para ser testavel sem depender do DOM.

## Estilo

A interface deve ser divertida, limpa e responsiva, com foco no convite, botoes grandes, animacao suave e visual romantico apos o aceite. A foto fica em `public/foto-convite.jpg`.

## Verificacao

O comportamento principal do botao fugitivo sera coberto por teste unitario. O projeto tambem deve passar em `npm test`, `npm run lint` e `npm run build`.
