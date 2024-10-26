<script>
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { children } = $props();
</script>

<div class="card">
  {@render children?.()}
</div>

<style>
  .card {
    width: var(--largura, 300px);
    min-height: 100%;
    background: var(--branco);
    box-shadow: 4px 4px 10px 1px rgba(0, 0, 0, 0.1);
  }
</style>
