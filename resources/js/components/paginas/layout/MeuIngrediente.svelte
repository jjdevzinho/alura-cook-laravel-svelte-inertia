<script lang="ts">
    import { fade } from "svelte/transition";
    ("svelte/transition");
    import Tag from "@/components/compartilhados/Tag.svelte";
    import { minhaLista } from "@/stores/minhaLista";
    interface Props {
        ingrediente: string;
    }

    let { ingrediente }: Props = $props();

    function removerIngrediente() {
        minhaLista.removerIngrediente(ingrediente);
    }
</script>

<div class="meu-ingrediente-container" transition:fade={{ duration: 200 }}>
    <Tag ativa={true}>
        <button
            class="close"
            onclick={removerIngrediente}
            title="remover"
            aria-label="Remover ingrediente"
        ></button>
        {ingrediente}
    </Tag>
    <button class="remover" onclick={removerIngrediente}>Remover</button>
</div>

<style>
    .meu-ingrediente-container {
        position: relative;
    }

    .close {
        background-image: url("/public/assets/icones/close.svg");
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
