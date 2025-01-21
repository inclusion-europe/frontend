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
          The Board is elected by Inclusion Europe members to represent their
          interests and to lead the work of the organisation.
          <br />
          The Board is composed, as minimum:
        </p>
        <ul>
          <li>
            3 self-advocates, appointed by the European Platform of
            Self-Advocates
          </li>
          <li>3 family members of people with intellectual disabilities</li>
          <li>Other advocates representing our members.</li>
        </ul>
        <StaffMember
          v-for="(member, i) in execBoard"
          :key="`exec_board_${i}`"
          :member="member"
          is-board
        />
        <h3 class="section-title section-title--blue">
          Non-executive Board members
        </h3>
        <StaffMember
          v-for="(member, i) in nonExecBoard"
          :key="`non_exec_board_${i}`"
          :member="member"
          is-board
        />
      </section>
      <section>
        <h2 class="section-title section-title--blue">Staff</h2>
        <StaffMember
          v-for="(member, i) in staffMembers"
          :key="`staff_member_${i}`"
          :member="member"
        />
      </section>
    </article>
  </div>
</template>
<script setup>
import StaffMember from './StaffMember.vue';
import staff from '@/assets/datasets/staff.json';

const execBoard = staff.filter((member) => member.inBoard && member.executive);
const nonExecBoard = staff.filter(
  (member) => member.inBoard && !member.executive
);
const staffMembers = staff.filter((member) => !member.inBoard);
</script>
