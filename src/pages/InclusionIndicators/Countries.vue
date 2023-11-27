<template>
  <div class="countries-ranking">
    <div class="data-selector">
      <Button
        v-for="(field, i) in extraColumns"
        rounded
        boxed
        :white="!visibleColumns.includes(i)"
        :key="`selector-button-${i}`"
        @click="selectColumn(i)"
      >
        {{ field.label }}
      </Button>
    </div>
    <vue-table
      :row-classes="['countries-row']"
      :columns="columns"
      :rows="dataset"
      :total="dataset.length"
      :page-size="50"
      :is-static-mode="true"
      :is-hide-paging="true"
    >
    </vue-table>
  </div>
</template>
<script>
import dataset from "@/assets/datasets/inclusion-indicators-2024.json";
import VueTable from "vue3-table-lite";
import Button from "@/elements/Button.vue";

export default {
  name: "InclusionIndicators.Countries",
  components: {
    VueTable,
    Button,
  },
  data: () => ({
    visibleColumns: [],
  }),
  computed: {
    dataset() {
      let arr = dataset;
      arr.forEach((country) => {
        country.average = this.averageFn(country);
      });
      return dataset;
    },
    columns() {
      return [
        {
          field: "country",
          sortable: true,
          label: "Country",
          isKey: true,
        },
        {
          field: "average",
          sortable: true,
          display: (row) => {
            return Math.round(row.average * 10) / 10;
          },
          label: "Average inclusion score",
        },
        ...this.shownColumns,
      ];
    },
    extraColumns() {
      return [
        {
          field: "vote_decide",
          sortable: true,
          display: (row) => {
            return row.vote_decide ? Math.round(row.vote_decide * 10) / 10 : "";
          },
          label: "Right to decide and right to vote",
        },
        {
          field: "live_independently_community",
          sortable: true,
          display: (row) => {
            return row.live_independently_community
              ? Math.round(row.live_independently_community * 10) / 10
              : "";
          },
          label:
            "Right to live independently and to be included in the community",
        },
        {
          field: "housing_support",
          sortable: true,
          display: (row) => {
            return row.housing_support
              ? Math.round(row.housing_support * 10) / 10
              : "";
          },
          label: "Housing and support",
        },
        {
          field: "education",
          sortable: true,
          display: (row) => {
            return row.education ? Math.round(row.education * 10) / 10 : "";
          },
          label: "Education",
        },
        {
          field: "employment",
          sortable: true,
          display: (row) => {
            return row.employment ? Math.round(row.employment * 10) / 10 : "";
          },
          label: "Employment",
        },
        {
          field: "healthcare",
          sortable: true,
          display: (row) => {
            return row.healthcare ? Math.round(row.healthcare * 10) / 10 : "";
          },
          label: "Healthcare",
        },
        {
          field: "representation",
          sortable: true,
          display: (row) => {
            return row.representation
              ? Math.round(row.representation * 10) / 10
              : "";
          },
          label: "Representation",
        },
      ];
    },
    shownColumns() {
      return this.extraColumns.filter((x, i) =>
        this.visibleColumns.includes(i)
      );
    },
  },
  mounted() {
    this.visibleColumns = this.initTable();
  },
  methods: {
    averageFn(row) {
      let {
        vote_decide,
        live_independently_community,
        housing_support,
        education,
        employment,
        healthcare,
        representation,
      } = row;

      let arr = [
        vote_decide,
        live_independently_community,
        housing_support,
        education,
        employment,
        healthcare,
        representation,
      ].filter((a) => ![null, undefined].includes(a));

      return arr.reduce((a, b) => a + b, 0) / arr.length;
    },
    selectColumn(i) {
      let inArray = this.visibleColumns.indexOf(i);
      if (inArray > -1) this.visibleColumns.splice(inArray, 1);
      else this.visibleColumns.push(i);
    },
    initTable() {
      return this.extraColumns.map((x, i) => i);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/variables.scss";
.countries-ranking {
  max-width: 90vw;
  width: fit-content;
  margin: auto;
  padding-bottom: 30px;

  .data-selector {
    width: $max-width;
    max-width: 80vw;
    margin: auto;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 10px;
  }
}
</style>
<style lang="scss">
@import "@/assets/style/variables.scss";
.vtl {
  width: 100%;

  &-table {
    width: fit-content !important;
    margin: auto;

    th {
      background: $dark-grey !important;
    }

    .countries-row {
      &:nth-child(2n) {
        background: #ececec;
      }
    }
  }
}
</style>
