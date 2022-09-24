/* eslint-disable react/no-unescaped-entities */
import LayoutWrapper from "@/components/LayoutWrapper";

const Docs = () => {
   return (
      <LayoutWrapper>
         <h1 className="text-3xl font-bold mb-3">Documentação</h1>
         <p className="text-xl text-neutral-400 mb-5">
            Explicação de como o app funciona.
         </p>
         <p className="mb-10 text-neutral-300">
            Inicialmente eu estava criando este apenas com o React (ou seja, via{" "}
            <code>create-react-app</code>), porém devido aos massivos resultados
            da API, estava tendo um grande custo em performance, então movi o
            projeto pro Next.JS, onde utilizo o React (obviamente) e as calls
            iniciais pra API são renderizadas no servidor, além de outras coisas
            como imagem, cache e etc.
         </p>
         <h1 className="text-2xl font-medium mb-3">Página inicial</h1>
         <p className="mb-10 text-neutral-300">
            O app é bastante compacto. Ao acessar a página principal, há uma
            lista com os filmes mais populares do TMDB no momento. Esta call é
            feita no servidor.
            <br />
            Com isso, o usuário pode ver os filmes populares e adicioná-los
            diretamente ao carrinho.
            <br />
            Já que o TMDB não tem uma lista de "preço" em si, e eu queria fazer
            com que cada item tivesse um preço diferente, o app pega o ID de
            cada item e divide por 12000 e arredonda para cima.
         </p>
         <h1 className="text-2xl font-medium mb-3">Pesquisa</h1>
         <p className="mb-10 text-neutral-300">
            A pesquisa ativa um modal que mostrará os resultados e onde o
            usuário também pode adicionar o item ao carrinho.
            <br />
            Por esta call precisar de input direto do usuário, ela é feita no
            client.
         </p>
         <h1 className="text-2xl font-medium mb-3">Carrinho</h1>
         <p className="mb-10 text-neutral-300">
            Ao adicionar um filme ao carrinho, o ícone de bolsa na navbar irá
            mostrar um símbolo de quantos itens existem no carrinho.
            <br />
            Já que existe a possibilidade do usuário adicionar um item pela
            pesquisa ao invés da página inicial, achei melhor fazer uma call no
            client para renderizar cada componente dinamicamente sem muita
            complicação.
            <br />
            Outra função do carrinho é que ele mantêm os itens salvos no{" "}
            <code>localStorage</code>, ou seja, ao recarregar a página os itens
            ainda estarão lá.
         </p>
         <h1 className="text-2xl font-medium mb-3">Checkout</h1>
         <p className="mb-10 text-neutral-300">
            O checkout mostra os itens que o usuário irá comprar e os campos de
            de informações. Os campos também possuem máscaras para o CPF, CEP e
            telefone.
            <br />
            Caso os campos estejam corretamente preenchidos, o botão de
            "Finalizar compra" ativará um modal dizendo que a compra foi
            sucedida. Com isso, o app limpa o <code>localStorage</code> e volta
            para a página inicial.
            <br />
            No código desta página pode mostrar algum erro de typechecking. Isto
            é devido à uma atualização que o plugin de másca dos inputs teve e
            que, de alguma forma, "bugou" esse check, então na página mostrará
            como se tivessem 3 erros específicos. Apesar disso, os inputs
            funcionam normalmente.
         </p>
         <h1 className="text-2xl font-medium mb-3">Layout e design</h1>
         <p className="mb-10 text-neutral-300">
            Inspirado pelo mockup que me mandaram, decidi usar verde-azulado
            como a cor prinicpal e preferi deixar o app escuro.
            <br />
            Utilizei TailwindCSS para uma customização com menores complicações,
            além de enviar apenas o CSS utilizado na página ao invés de
            absolutamente tudo.
            <br />O logo fiz no Inkscape em menos de 1 minuto e é tão criativo
            quanto o nome hein? Decidi deixar o ícone de "play" e a "gota" do I
            em vermelho para destacar dos itens mais esverdeados.
         </p>
      </LayoutWrapper>
   );
};

export default Docs;
