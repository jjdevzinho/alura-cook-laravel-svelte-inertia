import { writable } from 'svelte/store';

const { subscribe, set, update } = writable<string[]>([]);

export const minhaLista = {
	subscribe,
	set,
	update,
	adicionarIngrediente(ingrediente: string) {
		update((lista) => [...lista, ingrediente]);
	},
	removerIngrediente(ingrediente: string) {
		update((lista) => lista.filter((i) => i !== ingrediente));
	}
	//   remover: (item: string) => update((lista) => lista.filter((i) => i !== item)),
	//   limpar: () => set([]),
};
