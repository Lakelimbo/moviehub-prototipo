# movieHub - Protótipo
Este é um protótipo que foi pedido por uma empresa chamada DOT Digital. Inicialmente eu tinha aplicado à uma posição para desenvolvedor em React fullstack lá e, surpreendentemente, me responderam. Daí pediram esse protótipo como um teste. Fiz tudo bonitinho, até tinha colocado no Vercel, mas então simplesmente sumiram e nunca mais me contataram. Incrível. Mas ainda deixo o código aberto aqui, apesar de usar uma versão mais antiga do Next.js e do React.

Inicialmente eu estava criando este apenas com o React (ou seja, via  `create-react-app`), porém devido aos massivos resultados da API, estava tendo um grande custo em performance, então movi o projeto pro Next.js, onde utilizo o React (obviamente) e as calls iniciais pra API são renderizadas no servidor, além de outras coisas como imagem, cache e etc.

## Página inicial

O app é bastante compacto. Ao acessar a página principal, há uma lista com os filmes mais populares do TMDB no momento. Esta call é feita no servidor.  
Com isso, o usuário pode ver os filmes populares e adicioná-los diretamente ao carrinho.  
Já que o TMDB não tem uma lista de "preço" em si, e eu queria fazer com que cada item tivesse um preço diferente, o app pega o ID de cada item e divide por 12000 e arredonda para cima.

## Pesquisa

A pesquisa ativa um modal que mostrará os resultados e onde o usuário também pode adicionar o item ao carrinho.  
Por esta call precisar de input direto do usuário, ela é feita no client.

## Carrinho

Ao adicionar um filme ao carrinho, o ícone de bolsa na navbar irá mostrar um símbolo de quantos itens existem no carrinho.  
Já que existe a possibilidade do usuário adicionar um item pela pesquisa ao invés da página inicial, achei melhor fazer uma call no client para renderizar cada componente dinamicamente sem muita complicação.  
Outra função do carrinho é que ele mantêm os itens salvos no `localStorage`, ou seja, ao recarregar a página os itens ainda estarão lá.

## Checkout

O checkout mostra os itens que o usuário irá comprar e os campos de de informações. Os campos também possuem máscaras para o CPF, CEP e telefone.  
Caso os campos estejam corretamente preenchidos, o botão de "Finalizar compra" ativará um modal dizendo que a compra foi sucedida. Com isso, o app limpa o `localStorage` e volta para a página inicial.

## Layout e design

Inspirado pelo mockup que me mandaram, decidi usar verde-azulado como a cor prinicpal e preferi deixar o app escuro.  
Utilizei TailwindCSS para uma customização com menores complicações, além de enviar apenas o CSS utilizado na página ao invés de absolutamente tudo.  
O logo fiz no Inkscape em menos de 1 minuto e é tão criativo quanto o nome hein? Decidi deixar o ícone de "play" e a "gota" do I em vermelho para destacar dos itens mais esverdeados.
