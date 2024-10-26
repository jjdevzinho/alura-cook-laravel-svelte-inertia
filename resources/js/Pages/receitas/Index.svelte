<script lang="ts">
    import Receita from "@/components/paginas/receitas/Receita.svelte";
    import Titulo from "@/components/compartilhados/Titulo.svelte";
    import receitas from "@/json/receitas.json";
    import { minhaLista } from "@/stores/minhaLista";
    import TagLink from "@/components/compartilhados/TagLink.svelte";
    import DefaultLayout from "@/Layouts/DefaultLayout.svelte";

    //   $: receitasFiltradas = receitas.filter((receita) => (
    //     receita.ingredientes.every((ingrediente) => (
    //       $minhaLista.includes(ingrediente)
    //     ))
    //   ));

    let receitasFiltradas = $derived(
        receitas.filter((receita) => {
            // Filtra receitas onde todos os ingredientes estão na minhaLista
            return receita.ingredientes.every((ingrediente) => {
                return $minhaLista.includes(ingrediente);
            });
        }),
    );
</script>

<svelte:head>
    <title>Alura Cook | Receitas</title>
</svelte:head>

<DefaultLayout>
    <main>
        <Titulo tag="h1">Receitas</Titulo>
        <div class="info">
            <p class="verde">
                Resultados encontrados: {receitasFiltradas.length}
            </p>
            {#if receitasFiltradas.length}
                <p>
                    Veja as opções de receitas que encontrados com os
                    ingredientes selecionados.
                </p>
            {:else}
                <p>
                    Não encontramos nenhuma receita com os ingredientes
                    selecionados. :(
                </p>
            {/if}
        </div>
        {#if receitasFiltradas.length}
            <ul class="receitas">
                {#each receitasFiltradas as receita (receita.nome)}
                    <li>
                        <Receita {receita} />
                    </li>
                {/each}
            </ul>
        {/if}
        <div class="editar-lista">
            <TagLink href="/">Editar lista</TagLink>
        </div>
    </main>
</DefaultLayout>

<style>
    .info {
        margin-bottom: 3.375rem;
    }

    .info > p {
        line-height: 2rem;
    }

    .info > p.verde {
        color: var(--verde);
    }

    .receitas {
        text-align: start;
        margin-bottom: 3.75rem;

        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1.5rem;
    }
    .editar-lista {
        display: flex;
        justify-content: center;
    }
</style>
