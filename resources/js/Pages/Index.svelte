<script lang="ts">
    import Layout from "~/Layouts/DefaultLayout.svelte";

    import Titulo from "~/components/compartilhados/Titulo.svelte";
    import Categoria from "~/components/paginas/index/Categoria.svelte";
    import categorias from "~/json/categorias.json";

    //   import { minhaLista } from "~/stores/minhaLista.ts";
    //   import { beforeNavigate } from "$app/navigation";
    import TagLink from "~/components/compartilhados/TagLink.svelte";

    //   $: listaVazia = $minhaLista.length === 0;

    //   beforeNavigate((navigation) => {
    //     if (listaVazia && navigation.to?.route.id === "/receitas") {
    //       navigation.cancel();
    //     }
    //   });
</script>

<svelte:head>
    <title>Alura Cooks</title>
</svelte:head>

<Layout>
    <main>
        <Titulo>Ingredientes</Titulo>
        <div class="info">
            <p>
                Selecione abaixo os ingredientes que você deseja utilizar na sua
                receita.
            </p>
            <p>
                *Atenção: consideramos que você já possui os ingredientes
                básicos, como sal, açúcar, óleo, etc.
            </p>
        </div>
        <ul class="categorias">
            {#each categorias as categoria (categoria.nome)}
                <li>
                    <Categoria {categoria} />
                </li>
            {/each}
        </ul>
        <div class="buscar-receitas">
            <TagLink href="/receitas">Exibir Receitas</TagLink>
        </div>
    </main>
</Layout>

<style>
    .info {
        margin-bottom: 3.375rem;
    }

    .info > p {
        line-height: 2rem;
    }

    .categorias {
        margin-bottom: 4.6875rem;

        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
    }
    .buscar-receitas {
        display: flex;
        justify-content: center;
    }
</style>
