<template>
  <div class="reported_numbers">
    <table class="reported_numbers-table">
      <tbody>
        <tr>
          <th colspan="2">
            Reported numbers of people with intellectual disabilities in
          </th>
        </tr>
        <tr>
          <td>Mainstream education</td>
          <td>
            {{ tableData.mainstream_education
            }}{{ '*'.repeat(tableData.mainstream_education_note + 1) }}
          </td>
        </tr>
        <tr>
          <td>Special education</td>
          <td>
            {{ tableData.special_education
            }}{{ '*'.repeat(tableData.special_education_note + 1) }}
          </td>
        </tr>
        <tr>
          <td>No education</td>
          <td>
            {{ tableData.no_education
            }}{{ '*'.repeat(tableData.no_education_note + 1) }}
          </td>
        </tr>
        <tr class="spacer-row">
          <td />
          <td />
        </tr>
        <tr>
          <td>Larger institutions</td>
          <td>
            {{ tableData.larger_institutions
            }}{{ '*'.repeat(tableData.larger_institutions_note + 1) }}
          </td>
        </tr>
        <tr>
          <td>Smaller institutions</td>
          <td>
            {{ tableData.smaller_institutions
            }}{{ '*'.repeat(tableData.smaller_institutions_note + 1) }}
          </td>
        </tr>
        <tr v-if="year > 2023">
          <td>Small care homes</td>
          <td>
            {{ tableData.small_care_homes
            }}{{ '*'.repeat(tableData.small_care_homes_note + 1) }}
          </td>
        </tr>
        <tr>
          <td>Psychiatric hospitals</td>
          <td>
            {{ tableData.psychiatric_hospitals
            }}{{ '*'.repeat(tableData.psychiatric_hospitals_note + 1) }}
          </td>
        </tr>
        <tr v-if="year > 2023">
          <td>Living with family</td>
          <td>
            {{ tableData.living_with_family
            }}{{ '*'.repeat(tableData.living_with_family_note + 1) }}
          </td>
        </tr>
        <tr v-if="year > 2023">
          <td>Living in their own home</td>
          <td>
            {{ tableData.living_in_own_place
            }}{{ '*'.repeat(tableData.living_in_own_place_note + 1) }}
          </td>
        </tr>
        <tr v-if="year > 2023">
          <td>In foster care</td>
          <td>
            {{ tableData.in_foster_care
            }}{{ '*'.repeat(tableData.in_foster_care_note + 1) }}
          </td>
        </tr>
        <tr v-if="year > 2023">
          <td>Homeless</td>
          <td>
            {{ tableData.homeless
            }}{{ '*'.repeat(tableData.homeless_note + 1) }}
          </td>
        </tr>
      </tbody>
    </table>
    <div class="reported_numbers-notes">
      <p v-for="(note, i) in tableData.notes" :key="'asterisk-note-' + i">
        {{ '*'.repeat(i + 1) }} {{ note }}
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CountryTable',
  props: {
    tableData: {
      type: Object,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.reported_numbers {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  &-table {
    width: fit-content;
    border-collapse: collapse;

    th,
    td {
      border: 1px solid black;
      padding: 0.5rem 0.8rem;
    }

    th {
      font-family: GilroyBold;
    }

    .spacer-row {
      height: 1.1rem;

      td {
        border: none;
      }
    }
  }

  &-notes {
    max-width: 80%;
    p {
      margin: 0 auto;
    }
  }
}
</style>
