<template>
  <div class="flex q-py-md q-pr-md">
    <q-btn-toggle
      @click="onFindClick(selectedCharacter)"
      class="q-mr-xl"
      style="height: 38px; margin-top: 5px"
      v-model="findData.sex"
      toggle-color="primary"
      :options="[
        { label: 'Dam', value: 'F' },
        { label: 'Sire', value: 'M' },
      ]"
    />
    <q-btn
      style="margin: 5px; width: 35px"
      elevated
      :color="character === selectedCharacter ? 'primary' : 'light-blue-4'"
      v-for="character in characters"
      v-bind:key="character"
      @click="onFindClick(character)"
    >
      {{ character }}
    </q-btn>
  </div>
  <div class="flex justify-center">
    <p class="q-mt-md" v-if="pagination.rowsNumber !== 100">
      {{ $t('catNames1') }}
      <b>{{
        typeof pagination.rowsNumber === 'number'
          ? pagination.rowsNumber
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
          : pagination.rowsNumber
      }}</b>
      {{ $t('catNames2') }} <b>{{ selectedCharacter }}</b>
      {{ $t('catNames3') }} <b>{{ findData.sex == 'F' ? 'Dam' : 'Sire' }} :)</b>
    </p>
  </div>
  <q-table
    ref="tableRef"
    :rows="rowsCats"
    :columns="columnsCats"
    row-key="name"
    v-model:pagination="pagination"
    :loading="loading"
    grid
    hide-header
    :rows-per-page-options="[100, 200]"
    @request="onRequest"
  >
    <template v-slot:item="props">
      <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <q-card style="height: 100%">
          <q-card-section class="text-center">
            <b :class="props.row.gender === 'F' ? 'woman' : 'man'">{{
              props.row.name
            }}</b>
          </q-card-section>
        </q-card>
      </div>
    </template>
  </q-table>
</template>

<script lang="ts">
import { QTableProps } from 'quasar';
import { CatName, FindName } from 'src/contracts';
import CatService from 'src/services/cat/CatService';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'CatNamesPage',
  setup() {
    const tableRef = ref();
    const rowsCats = ref([] as CatName[]);
    const loading = ref(false);
    const pagination = ref({
      sortBy: 'name',
      descending: false,
      page: 1,
      rowsPerPage: 100,
      rowsNumber: 100,
    });
    return {
      tableRef,
      loading,
      findData: ref({
        page: 0,
        per_page: 100,
      } as FindName),
      pagination,
      rowsCats,
      characters: ref([
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
      ]),
      selectedCharacter: ref('A'),
    };
  },
  beforeMount() {
    this.findData.sex = 'F';
    this.onFindClick('A');
  },
  methods: {
    async onRequest(props: any) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      this.loading = true;

      this.findData.per_page = rowsPerPage;
      this.findData.page = page - 1;
      this.findData.order_by = sortBy;
      this.findData.order_type = descending ? 'desc' : 'asc';

      this.findData.character = this.selectedCharacter;

      let data = await CatService.names(this.findData);
      this.rowsCats = data?.items ?? [];

      this.pagination.rowsNumber = data?.metadata.total ?? 0;
      this.pagination.page = page;
      this.pagination.rowsPerPage = rowsPerPage;
      this.pagination.sortBy = sortBy;
      this.pagination.descending = descending;

      this.loading = false;
    },
    async onFindClick(character: string) {
      this.loading = true;

      this.findData.per_page = this.pagination.rowsPerPage;
      this.findData.page = this.pagination.page - 1;
      this.findData.order_by = this.pagination.sortBy;
      this.findData.order_type = this.pagination.descending ? 'desc' : 'asc';

      this.selectedCharacter = character;
      this.findData.character = character;

      let data = await CatService.names(this.findData);
      this.rowsCats = data?.items ?? [];

      this.pagination.rowsNumber = data?.metadata.total ?? 0;

      this.loading = false;
    },
  },
  computed: {
    columnsCats(): QTableProps['columns'] {
      return [
        {
          name: 'name',
          required: true,
          label: this.$t('name'),
          align: 'left',
          field: (row: CatName) => row.name,
        },
      ];
    },
  },
});
</script>

<style lang="scss">
b.man {
  color: #0000ee;
}
b.woman {
  color: #ff7e7e;
}
</style>
