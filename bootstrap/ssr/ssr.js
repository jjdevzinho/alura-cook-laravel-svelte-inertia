import { router, setupProgress } from "@inertiajs/core";
import { DEV } from "esm-env";
import escape from "html-escape";
import "lodash/cloneDeep.js";
import "lodash/isEqual.js";
import createServer from "@inertiajs/core/server";
const HYDRATION_START = "[";
const HYDRATION_END = "]";
const ELEMENT_IS_NAMESPACED = 1;
const ELEMENT_PRESERVE_ATTRIBUTE_CASE = 1 << 1;
const noop = () => {
};
function fallback(value, fallback2, lazy = false) {
  return value === void 0 ? lazy ? (
    /** @type {() => V} */
    fallback2()
  ) : (
    /** @type {V} */
    fallback2
  ) : value;
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a !== null && typeof a === "object" || typeof a === "function";
}
function rune_outside_svelte(rune) {
  if (DEV) {
    const error = new Error(`rune_outside_svelte
The \`${rune}\` rune is only available inside \`.svelte\` and \`.svelte.js/ts\` files`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error("rune_outside_svelte");
  }
}
function store_invalid_shape(name) {
  if (DEV) {
    const error = new Error(`store_invalid_shape
\`${name}\` is not a store with a \`subscribe\` method`);
    error.name = "Svelte error";
    throw error;
  } else {
    throw new Error("store_invalid_shape");
  }
}
let active_reaction = null;
function untrack(fn) {
  const previous_reaction = active_reaction;
  try {
    active_reaction = null;
    return fn();
  } finally {
    active_reaction = previous_reaction;
  }
}
if (DEV) {
  let throw_rune_error = function(rune) {
    if (!(rune in globalThis)) {
      let value;
      Object.defineProperty(globalThis, rune, {
        configurable: true,
        // eslint-disable-next-line getter-return
        get: () => {
          if (value !== void 0) {
            return value;
          }
          rune_outside_svelte(rune);
        },
        set: (v) => {
          value = v;
        }
      });
    }
  };
  throw_rune_error("$state");
  throw_rune_error("$effect");
  throw_rune_error("$derived");
  throw_rune_error("$inspect");
  throw_rune_error("$props");
  throw_rune_error("$bindable");
}
const VOID_ELEMENT_NAMES = [
  "area",
  "base",
  "br",
  "col",
  "command",
  "embed",
  "hr",
  "img",
  "input",
  "keygen",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr"
];
function is_void(name) {
  return VOID_ELEMENT_NAMES.includes(name) || name.toLowerCase() === "!doctype";
}
const DOM_BOOLEAN_ATTRIBUTES = [
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "disabled",
  "formnovalidate",
  "hidden",
  "indeterminate",
  "ismap",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "readonly",
  "required",
  "reversed",
  "seamless",
  "selected",
  "webkitdirectory"
];
function is_boolean_attribute(name) {
  return DOM_BOOLEAN_ATTRIBUTES.includes(name);
}
function validate_store(store, name) {
  if (store != null && typeof store.subscribe !== "function") {
    store_invalid_shape(name);
  }
}
function subscribe_to_store(store, run, invalidate) {
  if (store == null) {
    run(void 0);
    return noop;
  }
  const unsub = untrack(
    () => store.subscribe(
      run,
      // @ts-expect-error
      invalidate
    )
  );
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
const ATTR_REGEX = /[&"<]/g;
const CONTENT_REGEX = /[&<]/g;
function escape_html(value, is_attr) {
  const str = String(value ?? "");
  const pattern = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern.lastIndex = 0;
  let escaped = "";
  let last = 0;
  while (pattern.test(str)) {
    const i = pattern.lastIndex - 1;
    const ch = str[i];
    escaped += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped + str.substring(last);
}
var current_component = null;
function push(fn) {
  current_component = { p: current_component, c: null, d: null };
  if (DEV) {
    current_component.function = fn;
  }
}
function pop() {
  var component = (
    /** @type {Component} */
    current_component
  );
  var ondestroy = component.d;
  if (ondestroy) {
    on_destroy.push(...ondestroy);
  }
  current_component = component.p;
}
const BLOCK_OPEN = `<!--${HYDRATION_START}-->`;
const BLOCK_CLOSE = `<!--${HYDRATION_END}-->`;
const EMPTY_COMMENT = `<!---->`;
function reset_elements() {
  return () => {
  };
}
const INVALID_ATTR_NAME_CHAR_REGEX = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
const RAW_TEXT_ELEMENTS = ["textarea", "script", "style", "title"];
function element(payload, tag, attributes_fn = noop, children_fn = noop) {
  payload.out += "<!---->";
  if (tag) {
    payload.out += `<${tag} `;
    attributes_fn();
    payload.out += `>`;
    if (!is_void(tag)) {
      children_fn();
      if (!RAW_TEXT_ELEMENTS.includes(tag)) {
        payload.out += EMPTY_COMMENT;
      }
      payload.out += `</${tag}>`;
    }
  }
  payload.out += "<!---->";
}
let on_destroy = [];
function render(component, options = {}) {
  const payload = { out: "", css: /* @__PURE__ */ new Set(), head: { title: "", out: "" } };
  const prev_on_destroy = on_destroy;
  on_destroy = [];
  payload.out += BLOCK_OPEN;
  let reset_reset_element;
  if (DEV) {
    reset_reset_element = reset_elements();
  }
  if (options.context) {
    push();
    current_component.c = options.context;
  }
  component(payload, options.props ?? {}, {}, {});
  if (options.context) {
    pop();
  }
  if (reset_reset_element) {
    reset_reset_element();
  }
  payload.out += BLOCK_CLOSE;
  for (const cleanup of on_destroy) cleanup();
  on_destroy = prev_on_destroy;
  let head2 = payload.head.out + payload.head.title;
  for (const { hash, code } of payload.css) {
    head2 += `<style id="${hash}">${code}</style>`;
  }
  return {
    head: head2,
    html: payload.out,
    body: payload.out
  };
}
function head(payload, fn) {
  const head_payload = payload.head;
  head_payload.out += BLOCK_OPEN;
  fn(head_payload);
  head_payload.out += BLOCK_CLOSE;
}
const replacements = {
  translate: /* @__PURE__ */ new Map([
    [true, "yes"],
    [false, "no"]
  ])
};
function attr(name, value, is_boolean = false) {
  if (value == null || !value && is_boolean || value === "" && name === "class") return "";
  const normalized = name in replacements && replacements[name].get(value) || value;
  const assignment = is_boolean ? "" : `="${escape_html(normalized, true)}"`;
  return ` ${name}${assignment}`;
}
function css_props(payload, is_html, props, component, dynamic = false) {
  const styles = style_object_to_string(props);
  {
    payload.out += `<svelte-css-wrapper style="display: contents; ${styles}">`;
  }
  if (dynamic) {
    payload.out += "<!---->";
  }
  component();
  {
    payload.out += `<!----></svelte-css-wrapper>`;
  }
}
function spread_attributes(attrs, classes, styles, flags = 0) {
  let attr_str = "";
  let name;
  const is_html = (flags & ELEMENT_IS_NAMESPACED) === 0;
  const lowercase = (flags & ELEMENT_PRESERVE_ATTRIBUTE_CASE) === 0;
  for (name in attrs) {
    if (typeof attrs[name] === "function") continue;
    if (name[0] === "$" && name[1] === "$") continue;
    if (INVALID_ATTR_NAME_CHAR_REGEX.test(name)) continue;
    if (lowercase) {
      name = name.toLowerCase();
    }
    attr_str += attr(name, attrs[name], is_html && is_boolean_attribute(name));
  }
  return attr_str;
}
function spread_props(props) {
  const merged_props = {};
  let key;
  for (let i = 0; i < props.length; i++) {
    const obj = props[i];
    for (key in obj) {
      const desc = Object.getOwnPropertyDescriptor(obj, key);
      if (desc) {
        Object.defineProperty(merged_props, key, desc);
      } else {
        merged_props[key] = obj[key];
      }
    }
  }
  return merged_props;
}
function stringify(value) {
  return typeof value === "string" ? value : value == null ? "" : value + "";
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter(
    /** @param {any} key */
    (key) => style_object[key] != null && style_object[key] !== ""
  ).map(
    /** @param {any} key */
    (key) => `${key}: ${escape_html(style_object[key], true)};`
  ).join(" ");
}
function store_get(store_values, store_name, store) {
  var _a;
  if (DEV) {
    validate_store(store, store_name.slice(1));
  }
  if (store_name in store_values && store_values[store_name][0] === store) {
    return store_values[store_name][2];
  }
  (_a = store_values[store_name]) == null ? void 0 : _a[1]();
  store_values[store_name] = [store, null, void 0];
  const unsub = subscribe_to_store(
    store,
    /** @param {any} v */
    (v) => store_values[store_name][2] = v
  );
  store_values[store_name][1] = unsub;
  return store_values[store_name][2];
}
function unsubscribe_stores(store_values) {
  for (const store_name in store_values) {
    store_values[store_name][1]();
  }
}
function slot(payload, $$props, name, slot_props, fallback_fn) {
  var _a;
  var slot_fn = (_a = $$props.$$slots) == null ? void 0 : _a[name];
  if (slot_fn === true) {
    slot_fn = $$props["children"];
  }
  if (slot_fn !== void 0) {
    slot_fn(payload, slot_props);
  }
}
function rest_props(props, rest) {
  const rest_props2 = {};
  let key;
  for (key in props) {
    if (!rest.includes(key)) {
      rest_props2[key] = props[key];
    }
  }
  return rest_props2;
}
function sanitize_props(props) {
  const { children, $$slots, ...sanitized } = props;
  return sanitized;
}
function bind_props(props_parent, props_now) {
  var _a;
  for (const key in props_now) {
    const initial_value = props_parent[key];
    const value = props_now[key];
    if (initial_value === void 0 && value !== void 0 && ((_a = Object.getOwnPropertyDescriptor(props_parent, key)) == null ? void 0 : _a.set)) {
      props_parent[key] = value;
    }
  }
}
function ensure_array_like(array_like_or_iterator) {
  if (array_like_or_iterator) {
    return array_like_or_iterator.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
  }
  return [];
}
const h = (component, propsOrChildren, childrenOrKey, key = null) => {
  const hasProps = typeof propsOrChildren === "object" && propsOrChildren !== null && !Array.isArray(propsOrChildren);
  return {
    component,
    key: hasProps ? key : typeof childrenOrKey === "number" ? childrenOrKey : null,
    props: hasProps ? propsOrChildren : {},
    children: hasProps ? Array.isArray(childrenOrKey) ? childrenOrKey : childrenOrKey !== null ? [childrenOrKey] : [] : Array.isArray(propsOrChildren) ? propsOrChildren : propsOrChildren !== null ? [propsOrChildren] : []
  };
};
function Render($$payload, $$props) {
  push();
  let component = $$props["component"];
  let props = fallback($$props["props"], () => ({}), true);
  let children = fallback($$props["children"], () => [], true);
  let key = fallback($$props["key"], null);
  if (component) {
    $$payload.out += "<!--[-->";
    $$payload.out += `<!---->`;
    {
      if (children.length > 0) {
        $$payload.out += "<!--[-->";
        $$payload.out += `<!---->`;
        component == null ? void 0 : component($$payload, spread_props([
          props,
          {
            children: ($$payload2) => {
              const each_array = ensure_array_like(children);
              $$payload2.out += `<!--[-->`;
              for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
                let child = each_array[$$index];
                Render($$payload2, spread_props([child]));
                $$payload2.out += `<!---->`;
              }
              $$payload2.out += `<!--]-->`;
            },
            $$slots: { default: true }
          }
        ]));
        $$payload.out += `<!---->`;
      } else {
        $$payload.out += "<!--[!-->";
        $$payload.out += `<!---->`;
        component == null ? void 0 : component($$payload, spread_props([props]));
        $$payload.out += `<!---->`;
      }
      $$payload.out += `<!--]-->`;
    }
    $$payload.out += `<!---->`;
  } else {
    $$payload.out += "<!--[!-->";
  }
  $$payload.out += `<!--]-->`;
  bind_props($$props, { component, props, children, key });
  pop();
}
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop = null;
  const subscribers = /* @__PURE__ */ new Set();
  function set2(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set2(fn(
      /** @type {T} */
      value
    ));
  }
  function subscribe2(run, invalidate = noop) {
    const subscriber = [run, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set2, update) || noop;
    }
    run(
      /** @type {T} */
      value
    );
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set: set2, update, subscribe: subscribe2 };
}
const { set, subscribe } = writable();
const setPage = set;
function App($$payload, $$props) {
  push();
  let initialComponent = $$props["initialComponent"];
  let initialPage = $$props["initialPage"];
  let resolveComponent = $$props["resolveComponent"];
  let component = initialComponent;
  let key = null;
  let page = initialPage;
  let renderProps = resolveRenderProps(component, page, key);
  setPage(page);
  const isServer = typeof window === "undefined";
  if (!isServer) {
    router.init({
      initialPage,
      resolveComponent,
      swapComponent: async (args) => {
        component = args.component;
        page = args.page;
        key = args.preserveState ? key : Date.now();
        renderProps = resolveRenderProps(component, page, key);
        setPage(page);
      }
    });
  }
  function resolveRenderProps(component2, page2, key2 = null) {
    const child = h(component2.default, page2.props, [], key2);
    const layout = component2.layout;
    return layout ? resolveLayout(layout, child, page2.props, key2) : child;
  }
  function resolveLayout(layout, child, pageProps, key2) {
    if (isLayoutFunction(layout)) {
      return layout(h, child);
    }
    if (Array.isArray(layout)) {
      return layout.slice().reverse().reduce((currentRender, layoutComponent) => h(layoutComponent, pageProps, [currentRender], key2), child);
    }
    return h(layout, pageProps, child ? [child] : [], key2);
  }
  function isLayoutFunction(layout) {
    return typeof layout === "function" && layout.length === 2 && typeof layout.prototype === "undefined";
  }
  Render($$payload, spread_props([renderProps]));
  bind_props($$props, {
    initialComponent,
    initialPage,
    resolveComponent
  });
  pop();
}
async function createInertiaApp({ id = "app", resolve, setup, progress = {}, page }) {
  const isServer = typeof window === "undefined";
  const el = isServer ? null : document.getElementById(id);
  const initialPage = page || JSON.parse((el == null ? void 0 : el.dataset.page) || "{}");
  const resolveComponent = (name) => Promise.resolve(resolve(name));
  const [initialComponent] = await Promise.all([
    resolveComponent(initialPage.component),
    router.decryptHistory().catch(() => {
    })
  ]);
  const props = { initialPage, initialComponent, resolveComponent };
  const svelteApp = setup({
    el,
    App,
    props
  });
  if (isServer) {
    const { html, head: head2, css } = svelteApp;
    return {
      body: `<div data-server-rendered="true" id="${id}" data-page="${escape(JSON.stringify(initialPage))}">${html}</div>`,
      head: [head2, css ? `<style data-vite-css>${css.code}</style>` : ""]
    };
  }
  if (progress) {
    setupProgress(progress);
  }
}
createServer(
  (page) => createInertiaApp({
    page,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./Pages/Index.svelte": () => import("./assets/Index-C-Y-XyHp.js"), "./Pages/receitas/Index.svelte": () => import("./assets/Index-BAFsDJrT.js") });
      return pages[`./Pages/${name}.svelte`]();
    },
    setup({ App: App2, props }) {
      return render(App2, { props });
    }
  })
);
export {
  pop as a,
  ensure_array_like as b,
  attr as c,
  stringify as d,
  escape_html as e,
  css_props as f,
  fallback as g,
  head as h,
  element as i,
  bind_props as j,
  slot as k,
  spread_attributes as l,
  sanitize_props as m,
  push as p,
  rest_props as r,
  store_get as s,
  unsubscribe_stores as u,
  writable as w
};
