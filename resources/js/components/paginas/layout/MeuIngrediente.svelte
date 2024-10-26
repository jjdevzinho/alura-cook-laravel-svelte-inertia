<script lang="ts">
    import { fade } from "svelte/transition";
    ("svelte/transition");
    import Tag from "~/components/compartilhados/Tag.svelte";
    import { minhaLista } from "~/stores/minhaLista";
    export let ingrediente: string;

    function removerIngrediente() {
        minhaLista.removerIngrediente(ingrediente);
    }
</script>

<div class="meu-ingrediente-container" transition:fade={{ duration: 2000 }}>
    <Tag ativa={true}>
        <button class="close" on:click={removerIngrediente} aria-label="remover"
        ></button>
        {ingrediente}
    </Tag>
    <button class="remover" on:click={removerIngrediente}>Remover</button>
</div>

<style>
    .meu-ingrediente-container {
        position: relative;
    }

    .close {
        background-image: url("/assets/icones/close.svg");
        height: 10px;
        width: 10px;
        cursor: pointer;

        position: absolute;
        top: 4px;
        right: 4px;
    }

    .remover {
        line-height: 24px;
        font-size: 0.875rem;
        color: var(--laranja);
        cursor: pointer;
    }
</style>
