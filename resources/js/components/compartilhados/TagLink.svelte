<script lang="ts">
    import { Link } from "@inertiajs/svelte";
  import Tag from "./Tag.svelte";
  interface Props {
    href: string;
    desabilitada?: boolean;
    children?: import('svelte').Snippet;
  }

  let { href, desabilitada = false, children }: Props = $props();
</script>

<Link {href}>
  <Tag ativa={true} tamanho="lg" {desabilitada}>{@render children?.()}</Tag>
</Link>
