/**
 * This is the entry point to the program
 *
 * @param {array} input Array of student objects
 */

const dateYearsDiff = require('date-fns/difference_in_calendar_years');
function classifier(input) {

  // Your code should go here.


  //Verify if input is array

  if (!Array.isArray(input)) {
    throw new Error('Input not an array.');
  }

  const input_duplicate = input.map((person) => {

    const now = new Date(); //current year
    const duplicate = {};
    Object.assign(duplicate, person);
    duplicate.age = Math.abs(dateYearsDiff(now, duplicate.dob));
    return duplicate;
  }).sort((a, b) => a.age - b.age );


  const groupings = {
    noOfGroups: 0
  };

  const group = {
    members: [],
    oldest: 0,
    sum: 0,
    regNos: []
  };
  if (input_duplicate.length === 1) {

    const student = input_duplicate[0];

    group.members.push(student);
    group.oldest = student.age;
    group.sum += student.age;
    group.regNos.push(student.regNo);
    groupings.noOfGroups++;

    groupings[`group${groupings.noOfGroups}`] = (group);
  }
  else {
    /* Sort input decreasingly by age */
    for (let i = 0; i < input_duplicate.length; i++) {
      const student = input_duplicate[i];
      let new_student = {};
      Object.assign(new_student, student);
      const reg_no = student.regNo;
      if (group.members.length === 0) {

        group.members.push(new_student);
        group.oldest = new_student.age;
        group.sum += new_student.age;
        group.regNos.push(parseInt(reg_no));
        continue;
      }
      if (group.members.length === 3) {
        const group_copy = {};
        group.regNos.sort((a, b) => a - b);
        Object.assign(group_copy, group);
        groupings.noOfGroups++;
        groupings[`group${groupings.noOfGroups}`] = (group_copy);
        group.members = [];

        group.oldest = 0;
        group.sum = 0;
        group.regNos = [];
        group.members.push(new_student);

        group.oldest = new_student.age;
        group.sum += new_student.age;
        group.regNos.push(parseInt(reg_no));
      }
      else {
        const age_diff = Math.abs(group.members[group.members.length - 1].age - new_student.age);
        const age_diff_status = age_diff > 5;
        if (age_diff_status) {
          const group_copy = {};
          group.regNos.sort((a, b) => a - b);
          Object.assign(group_copy, group);
          groupings.noOfGroups++;
          groupings[`group${groupings.noOfGroups}`] = (group_copy);
          group.members = [];

          group.oldest = 0;
          group.sum = 0;
          group.regNos = [];
          group.members.push(new_student);

          group.oldest = new_student.age;
          group.sum += new_student.age;
          group.regNos.push(parseInt(reg_no));
          group.regNos.sort((a, b) => a - b);
        }
        else {
          group.members.push(new_student);
          group.oldest = new_student.age > group.oldest ? new_student.age : group.oldest;
          group.sum += new_student.age;
          group.regNos.push(parseInt(reg_no));
          group.regNos.sort();
        }
        new_student = {};
      }
      if (i === input_duplicate.length - 1 && group.members.length > 0){
        group.regNos.sort((a, b) => a - b);
        groupings.noOfGroups++;
        groupings[`group${groupings.noOfGroups}`] = group;
      }
    }
  }
  return groupings;

}

module.exports = classifier;
