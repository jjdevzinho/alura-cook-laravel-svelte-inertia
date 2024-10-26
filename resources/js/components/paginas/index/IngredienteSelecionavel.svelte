<script lang="ts">
    import { minhaLista } from "~/stores/minhaLista";
    import Tag from "~/components/compartilhados/Tag.svelte";
    export let ingrediente: string;
    //   let selecionado = false;
    // deve ser usar o $ para que o svelte reaja a mudanças na variável
    $: selecionado = $minhaLista.includes(ingrediente);

    function aoClicar() {
        if (!selecionado) {
            //   $minhaLista = [...$minhaLista, ingrediente];
            minhaLista.adicionarIngrediente(ingrediente);
        } else {
            //   $minhaLista = $minhaLista.filter((item) => item !== ingrediente);
            minhaLista.removerIngrediente(ingrediente);
        }
    }
</script>

<button type="button" on:click={aoClicar}>
    <Tag ativa={selecionado}>{ingrediente}</Tag>
</button>

<style global>
    button {
        cursor: pointer;
    }
</style>
