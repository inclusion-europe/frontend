<template>
  <div class="board_page post_page">
      <article>
          <header>
              <div class="header_texts">
                  <h1>Board and staff</h1>
              </div>
          </header>
          <section>
              <h2 class="section-title section-title--blue">Board</h2>
              <p>
                  The Board is elected by Inclusion Europe members to represent their interests and to lead the work of the organisation.
                  <br>
                  The Board is composed, as minimum:
                  <ul>
                      <li>3 self-advocates, appointed by the European Platform of Self-Advocates</li>
                      <li>3 family members of people with intellectual disabilities</li>
                      <li>Other advocates representing our members.</li>
                  </ul>
              </p>
              <div class="staff-grid">
                  <StaffMember
                      v-for="(member, i) in execBoard"
                      :key="`exec_board_${i}`"
                      :member="member"
                      big
                  />
              </div>
              <h3 class="section-subtitle section-subtitle--blue">Non-executive Board members</h3>
              <div class="staff-list">
                  <StaffMember
                      v-for="(member, i) in nonExecBoard"
                      :key="`non_exec_board_${i}`"
                      :member="member"
                  />
              </div>
          </section>
          <section>
              <h2 class="section-title section-title--blue">Staff</h2>
              <div class="staff-grid">
                  <StaffMember
                      v-for="(member, i) in staffMembers"
                      :key="`staff_member_${i}`"
                      :member="member"
                  />
              </div>
          </section>
      </article>
  </div>
</template>
<script setup>
import StaffMember from '~/elements/StaffMember.vue';
import staff from '~/assets/datasets/staff.json';

const execBoard = staff.filter((member) => member.inBoard && member.executive);
const nonExecBoard = staff.filter(
  (member) => member.inBoard && !member.executive
);
const staffMembers = staff.filter((member) => !member.inBoard);
</script>
<style lang="scss" scoped>
.staff-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.staff-list {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}
</style>
