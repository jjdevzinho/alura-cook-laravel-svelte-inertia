<script lang="ts">
  interface Props {
    tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    children?: import('svelte').Snippet;
  }

  let { tag = "h1", children }: Props = $props();
</script>

<svelte:element this={tag} class="titulo tag-{tag}">
  {@render children?.()}
</svelte:element>

<style>
  .titulo {
    color: var(--verde);
    text-transform: uppercase;
  }

  .tag-h1 {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 2rem;
    margin-bottom: 1rem;
  }
</style>
