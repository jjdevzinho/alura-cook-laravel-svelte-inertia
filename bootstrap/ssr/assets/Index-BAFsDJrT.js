import { p as push, f as css_props, a as pop, c as attr, d as stringify, e as escape_html, s as store_get, h as head, u as unsubscribe_stores, b as ensure_array_like } from "../ssr.js";
import { C as Card, D as DefaultLayout, m as minhaLista, a as Titulo, b as TagLink } from "./TagLink-iccE3--q.js";
import "@inertiajs/core";
import "esm-env";
import "html-escape";
import "lodash/cloneDeep.js";
import "lodash/isEqual.js";
import "@inertiajs/core/server";
function Receita($$payload, $$props) {
  push();
  let { receita } = $$props;
  css_props($$payload, true, { "--largura": "280px" }, () => {
    Card($$payload, {
      children: ($$payload2) => {
        $$payload2.out += `<img${attr("src", `/assets/imagens/receitas/${stringify(receita.imagem)}`)}${attr("alt", receita.nome)} class="receita-img svelte-fuj62j"> <div class="receita-info svelte-fuj62j"><h3 class="receita-nome svelte-fuj62j">${escape_html(receita.nome)}</h3></div>`;
      },
      $$slots: { default: true }
    });
  });
  pop();
}
const receitas = [
  {
    nome: "Pasta de Alho Assado",
    ingredientes: [
      "Alho",
      "Azeite de Oliva"
    ],
    imagem: "pasta_de_alho_assado.png"
  },
  {
    nome: "Patê de Alho Assado",
    ingredientes: [
      "Alho",
      "Azeite de Oliva"
    ],
    imagem: "pate_de_alho_assado.png"
  },
  {
    nome: "Alho Assado",
    ingredientes: [
      "Alho",
      "Azeite de Oliva",
      "Orégano"
    ],
    imagem: "alho_assado.png"
  },
  {
    nome: "Arroz de Alho",
    ingredientes: [
      "Arroz",
      "Alho",
      "Óleo"
    ],
    imagem: "arroz_de_alho.png"
  },
  {
    nome: "Pão de Alho",
    ingredientes: [
      "Pão",
      "Manteiga",
      "Alho",
      "Orégano"
    ],
    imagem: "pao_de_alho.png"
  },
  {
    nome: "Macarrão de Alho e Óleo",
    ingredientes: [
      "Macarrão",
      "Alho",
      "Óleo",
      "Manteiga"
    ],
    imagem: "macarrao_de_alho_e_oleo.png"
  },
  {
    nome: "Bacalhau com chips de alho",
    ingredientes: [
      "Bacalhau",
      "Alho",
      "Azeite de Oliva",
      "Limão"
    ],
    imagem: "bacalhau_com_chips_de_alho.png"
  },
  {
    nome: "Manteiga com tomilho e alho",
    ingredientes: [
      "Manteiga",
      "Alho",
      "Tomilho"
    ],
    imagem: "manteiga_com_tomilho_e_alho.png"
  },
  {
    nome: "Tortei com recheio de Abóbora",
    ingredientes: [
      "Massa de pastel",
      "Abóbora",
      "Tomate",
      "Alho",
      "Óleo",
      "Farinha de rosca",
      "Noz moscada"
    ],
    imagem: "tortei.png"
  },
  {
    nome: "Creme de Galinha",
    ingredientes: [
      "Frango",
      "Leite",
      "Creme de Leite",
      "Milho",
      "Ovos"
    ],
    imagem: "creme_de_galinha.png"
  },
  {
    nome: "Panqueca",
    ingredientes: [
      "Farinha de trigo",
      "Manteiga",
      "Leite",
      "Ovos"
    ],
    imagem: "panqueca.png"
  },
  {
    nome: "Milkshake de chocolate",
    ingredientes: [
      "Chocolate",
      "Chantilly"
    ],
    imagem: "milkshake_de_chocolate.png"
  },
  {
    nome: "Mousse de chocolate",
    ingredientes: [
      "Creme de Leite",
      "Chocolate",
      "Ovos",
      "Manteiga"
    ],
    imagem: "mousse_de_chocolate.png"
  }
];
function Index($$payload, $$props) {
  push();
  var $$store_subs;
  let receitasFiltradas = receitas.filter((receita) => {
    return receita.ingredientes.every((ingrediente) => {
      return store_get($$store_subs ?? ($$store_subs = {}), "$minhaLista", minhaLista).includes(ingrediente);
    });
  });
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Alura Cook | Receitas</title>`;
  });
  DefaultLayout($$payload, {
    children: ($$payload2) => {
      $$payload2.out += `<main>`;
      Titulo($$payload2, {
        tag: "h1",
        children: ($$payload3) => {
          $$payload3.out += `<!---->Receitas`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <div class="info svelte-n304vi"><p class="verde svelte-n304vi">Resultados encontrados: ${escape_html(receitasFiltradas.length)}</p> `;
      if (receitasFiltradas.length) {
        $$payload2.out += "<!--[-->";
        $$payload2.out += `<p class="svelte-n304vi">Veja as opções de receitas que encontrados com os
                    ingredientes selecionados.</p>`;
      } else {
        $$payload2.out += "<!--[!-->";
        $$payload2.out += `<p class="svelte-n304vi">Não encontramos nenhuma receita com os ingredientes
                    selecionados. :(</p>`;
      }
      $$payload2.out += `<!--]--></div> `;
      if (receitasFiltradas.length) {
        $$payload2.out += "<!--[-->";
        const each_array = ensure_array_like(receitasFiltradas);
        $$payload2.out += `<ul class="receitas svelte-n304vi"><!--[-->`;
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let receita = each_array[$$index];
          $$payload2.out += `<li>`;
          Receita($$payload2, { receita });
          $$payload2.out += `<!----></li>`;
        }
        $$payload2.out += `<!--]--></ul>`;
      } else {
        $$payload2.out += "<!--[!-->";
      }
      $$payload2.out += `<!--]--> <div class="editar-lista svelte-n304vi">`;
      TagLink($$payload2, {
        href: "/",
        children: ($$payload3) => {
          $$payload3.out += `<!---->Editar lista`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----></div></main>`;
    },
    $$slots: { default: true }
  });
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
export {
  Index as default
};
