<template>
  <div class="column content">
    <div class="row q-mr-sm">
      <div class="option outlined outlined-name">
        <q-input
          v-model="findData.name"
          @keydown.enter="onFindClick"
          :label="$t('name')"
          dense
          clear-icon="close"
          rounded
          outlined
          clearable
        />
      </div>
      <div class="option outlined" justify-end>
        <q-btn color="primary" label="Search" @click="onFindClick" />
      </div>
    </div>
    <q-table
      ref="tableRef"
      :rows="rowsCats"
      :columns="columnsI18n"
      row-key="id"
      v-model:pagination="pagination"
      :loading="loading"
      binary-state-sort
      :rows-per-page-options="[10, 20, 50]"
      @request="onRequest"
    >
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn
            color="green"
            icon-right="east"
            no-caps
            flat
            dense
            @click="$router.push('/cat/pedigree/' + props.row.id)"
          />
        </q-td>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            <a
              :class="props.row.gender == 'F' ? 'woman' : 'man'"
              :href="'/cat/detail/' + props.row.id + '/pedigree'"
            >
              {{ props.row.name }}
            </a>
          </q-td>
          <q-td key="breed" :props="props">
            {{ props.row.breed !== null ? props.row.breed.code : '' }}
          </q-td>
          <q-td key="date_of_birth" :props="props">
            {{ props.row.dateOfBirth }}
          </q-td>
          <q-td key="color_code" :props="props">
            {{ props.row.colorCode }}
          </q-td>
          <q-td key="color" :props="props">
            {{ props.row.color }}
          </q-td>
          <q-td key="father" :props="props">
            <router-link
              v-if="props.row.reference?.father != null"
              class="man"
              :to="
                '/cat/detail/' + props.row.reference?.father.id + '/pedigree'
              "
            >
              {{ props.row.reference?.father.name }}
            </router-link>
            <p v-if="props.row.reference?.father == null">
              {{ props.row.reference?.father_name }}
            </p>
          </q-td>
          <q-td key="mother" :props="props">
            <router-link
              v-if="props.row.reference?.mother != null"
              class="woman"
              :to="
                '/cat/detail/' + props.row.reference?.mother.id + '/pedigree'
              "
              >{{ props.row.reference?.mother.name }}</router-link
            >

            <p v-if="props.row.reference?.mother == null">
              {{ props.row.reference?.mother_name }}
            </p>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { cacheStore } from 'src/stores/cache-store';
import { Cat, FindCat, Reference } from 'src/contracts';
import { QTableProps } from 'quasar';
import CatService from 'src/services/cat/CatService';

export default defineComponent({
  name: 'FindCat',
  setup() {
    const tableRef = ref();
    const rowsCats = ref([] as Cat[]);
    const loading = ref(false);
    const pagination = ref({
      sortBy: 'name',
      descending: false,
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 10,
    });
    return {
      tableRef,
      loading,
      findData: ref({
        page: 0,
        per_page: 10,
      } as FindCat),
      pagination,
      rowsCats,
      cacheStore: cacheStore(),
      breedOptions: ref([] as any[]),
      sexOptions: ['M', 'F'],
    };
  },
  async beforeMount() {
    if (!this.cacheStore.isLoaded) await this.cacheStore.loadData();

    let breeds = this.cacheStore.breeds;
    this.breedOptions = breeds?.map((breed) => breed.code) ?? [];
  },
  computed: {
    pagesNumber() {
      return Math.ceil(
        this.pagination.rowsNumber / this.pagination.rowsPerPage
      );
    },
    columnsI18n(): QTableProps['columns'] {
      return [
        {
          name: 'name',
          required: true,
          label: this.$t('name'),
          align: 'left',
          field: (row: Cat) => row.name,
          sortable: true,
        },
        {
          name: 'breed',
          required: true,
          label: this.$t('breed'),
          align: 'left',
          field: (row: Cat) => (row.breed !== null ? row.breed.code : ''),
          sortable: true,
        },
        {
          name: 'date_of_birth',
          required: true,
          label: this.$t('birthday'),
          align: 'left',
          field: (row: Cat) => row.dateOfBirth,
          sortable: true,
        },
        {
          name: 'color_code',
          required: true,
          label: this.$t('colorCode'),
          align: 'left',
          field: (row: Cat) => row.colorCode,
          sortable: true,
        },
        {
          name: 'color',
          required: true,
          label: this.$t('otherColor'),
          align: 'left',
          field: (row: Cat) => row.color,
          sortable: true,
        },
        {
          name: 'father',
          required: true,
          label: this.$t('father'),
          align: 'left',
          field: (row: Cat) =>
            (row.reference as Reference).father == null
              ? (row.reference as Reference).father_name
              : (row.reference as Reference).father?.name,
        },
        {
          name: 'mother',
          required: true,
          label: this.$t('mother'),
          align: 'left',
          field: (row: Cat) =>
            (row.reference as Reference).mother == null
              ? (row.reference as Reference).mother_name
              : (row.reference as Reference).mother?.name,
        },
      ];
    },
  },
  methods: {
    async onRequest(props: any) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      this.loading = true;

      this.findData.per_page = rowsPerPage;
      this.findData.page = page - 1;
      this.findData.order_by = sortBy;
      this.findData.order_type = descending ? 'desc' : 'asc';

      let data = await CatService.all(this.findData);
      this.rowsCats = data?.items ?? [];

      this.pagination.rowsNumber = data?.metadata?.total ?? 0;
      this.pagination.page = page;
      this.pagination.rowsPerPage = rowsPerPage;
      this.pagination.sortBy = sortBy;
      this.pagination.descending = descending;

      this.loading = false;
    },
    async onFindClick() {
      if (this.findData.name?.length == 0) this.findData.name = null;
      if (this.findData.ems?.length == 0) this.findData.ems = null;
      if (this.findData.country?.length == 0) this.findData.country = null;

      this.loading = true;

      this.findData.per_page = this.pagination.rowsPerPage;
      this.findData.page = this.pagination.page - 1;
      this.findData.order_by = this.pagination.sortBy;
      this.findData.order_type = this.pagination.descending ? 'desc' : 'asc';

      let data = await CatService.all(this.findData);
      this.rowsCats = data?.items ?? [];

      this.pagination.rowsNumber = data?.metadata?.total ?? 0;

      this.loading = false;
    },
  },
});
</script>

<style scoped lang="scss">
.content {
  padding: 24px 24px 24px 0;
}
.outlined {
  margin: 8px 8px 8px 0;
  padding: 5px 5px 5px 0;
  outline-color: $primary;
  min-width: 150px;
  max-width: 165px;
}
.outlined-name {
  max-width: 550px;
  width: 550px;
}
.search {
  margin: 8px 8px 8px 0;
  min-width: 150px;
}
a.man {
  color: #0000ee;
}
a.woman {
  color: #ff7e7e;
}
.q-table__container a.man:visited {
  color: #0000ee;
}
.q-table__container a.woman:visited {
  color: #ff7e7e;
}
</style>
