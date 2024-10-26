<script lang="ts">
    import Tag from "./Tag.svelte";
    export let href: string;
    export let desabilitada: boolean = false;
    import { Link } from "@inertiajs/svelte";
</script>

<Link {href}>
    <Tag ativa={true} tamanho="lg" {desabilitada}><slot /></Tag>
</Link>
