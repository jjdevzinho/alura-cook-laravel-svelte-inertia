<script lang="ts">
    import { minhaLista } from "@/stores/minhaLista";
    import Tag from "@/components/compartilhados/Tag.svelte";
    interface Props {
        ingrediente: string;
    }

    let { ingrediente }: Props = $props();
    let selecionado = $derived($minhaLista.includes(ingrediente));

    function aoClicar() {
        if (!selecionado) {
            return minhaLista.adicionarIngrediente(ingrediente);
        }
        return minhaLista.removerIngrediente(ingrediente);
    }
</script>

<button type="button" onclick={aoClicar}>
    <Tag ativa={selecionado}>{ingrediente}</Tag>
</button>

<style global>
    button {
        cursor: pointer;
    }
</style>
