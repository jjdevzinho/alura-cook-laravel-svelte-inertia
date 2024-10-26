import { p as push, s as store_get, e as escape_html, u as unsubscribe_stores, a as pop, b as ensure_array_like, c as attr, d as stringify, h as head } from "../ssr.js";
import { m as minhaLista, T as Tag, C as Card, D as DefaultLayout, a as Titulo, b as TagLink } from "./TagLink-iccE3--q.js";
import "@inertiajs/core";
import "esm-env";
import "html-escape";
import "lodash/cloneDeep.js";
import "lodash/isEqual.js";
import "@inertiajs/core/server";
function IngredienteSelecionavel($$payload, $$props) {
  push();
  var $$store_subs;
  let { ingrediente } = $$props;
  let selecionado = store_get($$store_subs ?? ($$store_subs = {}), "$minhaLista", minhaLista).includes(ingrediente);
  $$payload.out += `<button type="button" class="svelte-1lh3y25">`;
  Tag($$payload, {
    ativa: selecionado,
    children: ($$payload2) => {
      $$payload2.out += `<!---->${escape_html(ingrediente)}`;
    },
    $$slots: { default: true }
  });
  $$payload.out += `<!----></button>`;
  if ($$store_subs) unsubscribe_stores($$store_subs);
  pop();
}
function Categoria($$payload, $$props) {
  push();
  let { categoria } = $$props;
  Card($$payload, {
    children: ($$payload2) => {
      const each_array = ensure_array_like(categoria.ingredientes);
      $$payload2.out += `<div class="categoria-container svelte-1hli2c8"><img${attr("src", `/assets/icones/categorias_ingredientes/${stringify(categoria.imagem)}`)}${attr("alt", categoria.nome)} class="categoria-imagem svelte-1hli2c8" width="78" height="52"> <h3 class="categoria-nome svelte-1hli2c8">${escape_html(categoria.nome)}</h3> <ul class="ingredientes svelte-1hli2c8"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let ingrediente = each_array[$$index];
        $$payload2.out += `<li>`;
        IngredienteSelecionavel($$payload2, { ingrediente });
        $$payload2.out += `<!----></li>`;
      }
      $$payload2.out += `<!--]--></ul></div>`;
    },
    $$slots: { default: true }
  });
  pop();
}
const categorias = [
  {
    nome: "Laticínios e Ovos",
    ingredientes: [
      "Ovos",
      "Queijo",
      "Leite",
      "Manteiga",
      "Creme de Leite",
      "Iogurte",
      "Leite Condensado",
      "Sorvete"
    ],
    imagem: "laticinios_e_ovos.png"
  },
  {
    nome: "Farinhas e Fermentos",
    ingredientes: [
      "Farinha de trigo",
      "Povilho",
      "Farinha de rosca",
      "Canjica",
      "Farinha de mandioca",
      "Fubá",
      "Linhaça",
      "Fermento químico"
    ],
    imagem: "farinhas_e_fermentos.png"
  },
  {
    nome: "Temperos e Especiarias",
    ingredientes: [
      "Canela",
      "Cravo",
      "Orégano",
      "Noz moscada",
      "Tomilho",
      "Pimenta do Reino",
      "Cominho"
    ],
    imagem: "temperos_e_especiarias.png"
  },
  {
    nome: "Óleos, Gorduras e Vinagres",
    ingredientes: [
      "Vinagre",
      "Óleo",
      "Dendê",
      "Azeite de Oliva",
      "Banha",
      "Aceto Balsâmico",
      "Óleo de coco"
    ],
    imagem: "oleos_gorduras_e_vinagres.png"
  },
  {
    nome: "Hortaliças e Verduras",
    ingredientes: [
      "Cebola",
      "Alho",
      "Tomate",
      "Abóbora",
      "Abobrinha",
      "Batata",
      "Pimentão",
      "Espinafre",
      "Cenoura"
    ],
    imagem: "hortalicas_e_verduras.png"
  },
  {
    nome: "Açúcares e Adoçantes",
    ingredientes: [
      "Açúcar branco",
      "Açúcar mascavo",
      "Açúcar cristal",
      "Melado",
      "Mel",
      "Baunilha",
      "Glucose",
      "Xilito",
      "Stevia"
    ],
    imagem: "acucares_e_adocantes.png"
  },
  {
    nome: "Proteínas Animais",
    ingredientes: [
      "Peixe",
      "Carne bovina",
      "Carne de porco",
      "Frango",
      "Bacon",
      "Salsicha",
      "Atum",
      "Salmão",
      "Presunto",
      "Bacalhau"
    ],
    imagem: "proteinas_animais.png"
  },
  {
    nome: "Grãos, Cereais e Leguminosas",
    ingredientes: [
      "Arroz",
      "Feijão",
      "Aveia",
      "Ervilha",
      "Lentilha",
      "Grão de bico",
      "Milho",
      "Gergelim",
      "Quinoa"
    ],
    imagem: "graos_cerais_e_leguminosas.png"
  },
  {
    nome: "Frutas frescas",
    ingredientes: [
      "Banana",
      "Maçã",
      "Uva",
      "Pera",
      "Limão",
      "Morango",
      "Ameixa",
      "Framboesa",
      "Acabaxi"
    ],
    imagem: "frutas_frescas.png"
  },
  {
    nome: "Frutas secas",
    ingredientes: [
      "Castanha de caju",
      "Castanha do pará",
      "Uva passa",
      "Damasco",
      "Tâmara",
      "Pistache",
      "Amêndoa",
      "Amendoim"
    ],
    imagem: "frutas_secas.png"
  },
  {
    nome: "Pães e Massas",
    ingredientes: [
      "Pão",
      "Pão sírio",
      "Tortilha",
      "Macarrão",
      "Nhoque",
      "Massa de pastel",
      "Massa de lasanha",
      "Biscoito",
      "Broa"
    ],
    imagem: "paes_e_massas.png"
  },
  {
    nome: "Doces e guloseimas",
    ingredientes: [
      "Chocolate",
      "Geleia",
      "Goiabada",
      "Caramelo",
      "Chantilly",
      "Cacau em pó",
      "Suspiro",
      "Gelatina",
      "Paçoca"
    ],
    imagem: "doces_e_guloseimas.png"
  }
];
function Index($$payload) {
  head($$payload, ($$payload2) => {
    $$payload2.title = `<title>Alura Cooks</title>`;
  });
  DefaultLayout($$payload, {
    children: ($$payload2) => {
      const each_array = ensure_array_like(categorias);
      $$payload2.out += `<main>`;
      Titulo($$payload2, {
        children: ($$payload3) => {
          $$payload3.out += `<!---->Ingredientes`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----> <div class="info svelte-ly66db"><p class="svelte-ly66db">Selecione abaixo os ingredientes que você deseja utilizar na sua
                receita.</p> <p class="svelte-ly66db">*Atenção: consideramos que você já possui os ingredientes
                básicos, como sal, açúcar, óleo, etc.</p></div> <ul class="categorias svelte-ly66db"><!--[-->`;
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let categoria = each_array[$$index];
        $$payload2.out += `<li>`;
        Categoria($$payload2, { categoria });
        $$payload2.out += `<!----></li>`;
      }
      $$payload2.out += `<!--]--></ul> <div class="buscar-receitas svelte-ly66db">`;
      TagLink($$payload2, {
        href: "/receitas",
        children: ($$payload3) => {
          $$payload3.out += `<!---->Exibir Receitas`;
        },
        $$slots: { default: true }
      });
      $$payload2.out += `<!----></div></main>`;
    },
    $$slots: { default: true }
  });
}
export {
  Index as default
};
