<script lang="ts">
  interface Props {
    ativa?: boolean;
    tamanho?: "md" | "lg";
    desabilitada?: boolean;
    children?: import('svelte').Snippet;
  }

  let {
    ativa = false,
    tamanho = "md",
    desabilitada = false,
    children
  }: Props = $props();
</script>

<div class="tag {tamanho}" class:ativa class:desabilitada>
  {@render children?.()}
</div>

<style>
  .tag {
    height: 48px;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    color: var(--cor-texto-principal);
    background-color: var(--cinza);

    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.2s;
  }
  .ativa {
    color: var(--branco);
    background-color: var(--laranja);
  }

  .lg {
    font-size: 1.125rem;
    padding: 1rem 1.5rem;
  }

  .desabilitada {
    opacity: 0.7;
    cursor: default;
  }
</style>
