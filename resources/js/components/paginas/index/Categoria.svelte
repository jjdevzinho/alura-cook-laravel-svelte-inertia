<script lang="ts">
    import type ICategorias from "@/interfaces/ICategorias";
    import Card from "@/components/compartilhados/Card.svelte";
    import IngredienteSelecionavel from "@/components/paginas/index/IngredienteSelecionavel.svelte";

    interface Props {
        categoria: ICategorias;
    }

    let { categoria }: Props = $props();
</script>

<Card>
    <div class="categoria-container">
        <img
            src="/assets/icones/categorias_ingredientes/{categoria.imagem}"
            alt={categoria.nome}
            class="categoria-imagem"
            width="78"
            height="52"
        />
        <h3 class="categoria-nome">{categoria.nome}</h3>

        <ul class="ingredientes">
            {#each categoria.ingredientes as ingrediente (ingrediente)}
                <li>
                    <IngredienteSelecionavel {ingrediente} />
                </li>
            {/each}
        </ul>
    </div>
</Card>

<style>
    .categoria-container {
        padding: 0.75rem 0.5rem;
    }

    .categoria-imagem {
        margin-bottom: 0.5rem;
    }

    .categoria-nome {
        font-size: 1.125rem;
        color: var(--verde);
        margin-bottom: 0.875rem;
    }

    .ingredientes {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.75rem 1rem;
    }
</style>
