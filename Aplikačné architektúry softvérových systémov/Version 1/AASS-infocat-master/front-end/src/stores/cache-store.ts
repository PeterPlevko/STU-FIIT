import { defineStore } from 'pinia';
import { Breed } from 'src/contracts';
import { BreedService } from 'src/services';

export const cacheStore = defineStore('cache', {
  state: () => ({
    breeds: [] as Breed[],
  }),

  getters: {
    isLoaded(context): boolean {
      return context.breeds.length > 0;
    },
  },

  actions: {
    async loadData() {
      try {
        this.breeds = (await BreedService.breeds()) as Breed[];
      } catch (err) {
        throw err;
      }
    },
  },
});
