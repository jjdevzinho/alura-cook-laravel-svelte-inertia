import { createInertiaApp } from "@inertiajs/svelte";
import createServer from "@inertiajs/svelte/server";
import { render } from "svelte/server";

createServer((page) =>
    createInertiaApp({
        page,
        resolve: (name) => {
            const pages = import.meta.glob("./Pages/**/*.svelte");
            return pages[`./Pages/${name}.svelte`]();
        },
        setup({ App, props }) {
            return render(App, { props });
        },
    })
);
