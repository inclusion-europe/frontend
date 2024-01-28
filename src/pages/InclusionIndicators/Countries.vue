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
import country_data from "@/assets/datasets/inclusion-indicators-2023.json";
import countrycodes from "@/assets/datasets/countries.json";
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
      let arr = country_data.data;
      arr.forEach((country) => {
        country.average = Math.round(this.averageFn(country) * 10) / 10;
      });
      return arr;
    },
    labels() {
      return country_data.labels;
    },
    columns() {
      return [
        {
          field: "country",
          sortable: true,
          label: this.labels["country"],
          isKey: true,
          display: (row) => {
            let code = this.countryCode(row);
            return code
              ? `<a href="/indicators/${code.toLowerCase()}">${row.country}</a>`
              : row.country;
          },
        },
        {
          field: "average",
          sortable: true,
          label: this.labels["average"],
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
            return row.vote_decide
              ? Math.round(row.vote_decide.score * 10) / 10
              : "";
          },
          label: this.labels["vote_decide"],
        },
        {
          field: "live_independently_community",
          sortable: true,
          display: (row) => {
            return row.live_independently_community
              ? Math.round(row.live_independently_community.score * 10) / 10
              : "";
          },
          label: this.labels["live_independently_community"],
        },
        {
          field: "housing_support",
          sortable: true,
          display: (row) => {
            return row.housing_support
              ? Math.round(row.housing_support.score * 10) / 10
              : "";
          },
          label: this.labels["housing_support"],
        },
        {
          field: "education",
          sortable: true,
          display: (row) => {
            return row.education
              ? Math.round(row.education.score * 10) / 10
              : "";
          },
          label: this.labels["education"],
        },
        {
          field: "employment",
          sortable: true,
          display: (row) => {
            return row.employment
              ? Math.round(row.employment.score * 10) / 10
              : "";
          },
          label: this.labels["employment"],
        },
        {
          field: "healthcare",
          sortable: true,
          display: (row) => {
            return row.healthcare
              ? Math.round(row.healthcare.score * 10) / 10
              : "";
          },
          label: this.labels["healthcare"],
        },
        {
          field: "representation",
          sortable: true,
          display: (row) => {
            return row.representation
              ? Math.round(row.representation.score * 10) / 10
              : "";
          },
          label: this.labels["representation"],
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
        vote_decide?.score,
        live_independently_community?.score,
        housing_support?.score,
        education?.score,
        employment?.score,
        healthcare?.score,
        representation?.score,
      ].filter((a) => ![null, undefined, false].includes(a));

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
    countryCode(row) {
      let countryCode =
        Object.keys(countrycodes)[
          Object.values(countrycodes).findIndex((el) => el === row.country)
        ];
      if (!countryCode) {
        console.log(row);
      }
      return countryCode || null;
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
    width: $width;
    max-width: $max-width;
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
