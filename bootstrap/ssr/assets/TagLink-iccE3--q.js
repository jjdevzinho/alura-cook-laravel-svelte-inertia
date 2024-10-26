import { r as rest_props, p as push, g as fallback, i as element, j as bind_props, a as pop, k as slot, l as spread_attributes, m as sanitize_props, w as writable, c as attr, d as stringify, e as escape_html, b as ensure_array_like, s as store_get, u as unsubscribe_stores } from "../ssr.js";
import "esm-env";
import "@inertiajs/core";
import "html-escape";
import "lodash/cloneDeep.js";
import "lodash/isEqual.js";
function Link($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "href",
    "as",
    "data",
    "method",
    "replace",
    "preserveScroll",
    "preserveState",
    "only",
    "except",
    "headers",
    "queryStringArrayFormat",
    "async",
    "prefetch",
    "cacheFor"
  ]);
  push();
  let asProp, elProps;
  let href = $$props["href"];
  let as = fallback($$props["as"], "a");
  let data = fallback($$props["data"], () => ({}), true);
  let method = fallback($$props["method"], "get");
  let replace = fallback($$props["replace"], false);
  let preserveScroll = fallback($$props["preserveScroll"], false);
  let preserveState = fallback($$props["preserveState"], null);
  let only = fallback($$props["only"], () => [], true);
  let except = fallback($$props["except"], () => [], true);
  let headers = fallback($$props["headers"], () => ({}), true);
  let queryStringArrayFormat = fallback($$props["queryStringArrayFormat"], "brackets");
  let async = fallback($$props["async"], false);
  let prefetch = fallback($$props["prefetch"], false);
  let cacheFor = fallback($$props["cacheFor"], 0);
  asProp = method !== "get" ? "button" : as.toLowerCase();
  elProps = { a: { href }, button: { type: "button" } }[asProp] || {};
  element(
    $$payload,
    asProp,
    () => {
      $$payload.out += `${spread_attributes({ ...$$restProps, ...elProps })}`;
    },
    () => {
      $$payload.out += `<!---->`;
      slot($$payload, $$props, "default", {});
      $$payload.out += `<!---->`;
    }
  );
  bind_props($$props, {
    href,
    as,
    data,
    method,
    replace,
    preserveScroll,
    preserveState,
    only,
    except,
    headers,
    queryStringArrayFormat,
    async,
    prefetch,
    cacheFor
  });
  pop();
}
function Cabecalho($$payload) {
  $$payload.out += `<header class="svelte-tjr09f"><img src="/assets/imagens/alura-cook-logo.svg" alt="Logo do Alura Cook" class="svelte-tjr09f"></header>`;
}
const { subscribe, set, update } = writable([]);
const minhaLista = {
  subscribe,
  set,
  update,
  adicionarIngrediente(ingrediente) {
    update((lista) => [...lista, ingrediente]);
  },
  removerIngrediente(ingrediente) {
    update((lista) => lista.filter((i) => i !== ingrediente));
  }
  //   remover: (item: string) => update((lista) => lista.filter((i) => i !== item)),
  //   limpar: () => set([]),
};
function Tag($$payload, $$props) {
  push();
  let {
    ativa = false,
    tamanho = "md",
    desabilitada = false,
    children
  } = $$props;
  $$payload.out += `<div${attr("class", `tag ${stringify(tamanho)} svelte-rsbrst ${stringify([
    ativa ? "ativa" : "",
    desabilitada ? "desabilitada" : ""
  ].filter(Boolean).join(" "))}`)}>`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></div>`;
  pop();
}
function MeuIngrediente($$payload, $$props) {
  push();
  let { ingrediente } = $$props;
  $$payload.out += `<div class="meu-ingrediente-container svelte-1u4m5ao">`;
  Tag($$payload, {
    ativa: true,
    children: ($$payload2) => {
      $$payload2.out += `<button class="close svelte-1u4m5ao" title="remover" aria-label="Remover ingrediente"></button> ${escape_html(ingrediente)}`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----> <button class="remover svelte-1u4m5ao">Remover</button></div>`;
  pop();
}
function MinhaLista($$payload) {
  var $$store_subs;
  const each_array = ensure_array_like(store_get($$store_subs ?? ($$store_subs = {}), "$minhaLista", minhaLista));
  $$payload.out += `<section class="minha-lista svelte-1wl1ngf"><h2 class="svelte-1wl1ngf">Sua lista:</h2> <ul class="meus-ingredientes svelte-1wl1ngf"><!--[-->`;
  for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
    let ingrediente = each_array[$$index];
    $$payload.out += `<li>`;
    MeuIngrediente($$payload, { ingrediente });
    $$payload.out += `<!----></li>`;
  }
  $$payload.out += `<!--]--></ul></section>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
}
function Rodape($$payload) {
  $$payload.out += `<footer class="svelte-k8ozhw"><img src="/assets/icones/registered.png" alt="Ícone marca registrada" class="registered svelte-k8ozhw"> Copyright Alura Cook 2024</footer>`;
}
function DefaultLayout($$payload, $$props) {
  push();
  var $$store_subs;
  $$payload.out += `<div class="container-principal svelte-jw2jhd">`;
  Cabecalho($$payload);
  $$payload.out += `<!----> <div class="estilo-principal svelte-jw2jhd">`;
  if (store_get($$store_subs ?? ($$store_subs = {}), "$minhaLista", minhaLista).length > 0) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<div class="minha-lista-container svelte-jw2jhd">`;
    MinhaLista($$payload);
    $$payload.out += `<!----> <div class="divisoria svelte-jw2jhd"></div></div>`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]--> <!---->`;
  slot($$payload, $$props, "default", {});
  $$payload.out += `<!----></div> `;
  Rodape($$payload);
  $$payload.out += `<!----></div>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Titulo($$payload, $$props) {
  push();
  let { tag = "h1", children } = $$props;
  element(
    $$payload,
    tag,
    () => {
      $$payload.out += `${attr("class", `titulo tag-${stringify(tag)} svelte-eiayfa`)}`;
    },
    () => {
      children == null ? void 0 : children($$payload);
      $$payload.out += `<!---->`;
    }
  );
  pop();
}
function Card($$payload, $$props) {
  push();
  let { children } = $$props;
  $$payload.out += `<div class="card svelte-rfj0ub">`;
  children == null ? void 0 : children($$payload);
  $$payload.out += `<!----></div>`;
  pop();
}
function TagLink($$payload, $$props) {
  push();
  let { href, desabilitada = false, children } = $$props;
  Link($$payload, {
    href,
    children: ($$payload2) => {
      Tag($$payload2, {
        ativa: true,
        tamanho: "lg",
        desabilitada,
        children: ($$payload3) => {
          children == null ? void 0 : children($$payload3);
          $$payload3.out += `<!---->`;
        },
        $$slots: { default: true }
      });
    },
    $$slots: { default: true }
  });
  pop();
}
export {
  Card as C,
  DefaultLayout as D,
  Tag as T,
  Titulo as a,
  TagLink as b,
  minhaLista as m
};
