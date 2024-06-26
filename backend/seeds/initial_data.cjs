
require('dotenv').config()
const bcrypt = require('bcrypt')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const password = 1234
const hash = bcrypt.hashSync(password + "", 10)

exports.seed = async function(knex) {
  await knex('users').insert([
    { first_name: 'Ziv', last_name: 'Chen', email: 'ziv@email.com', password: hash, isadmin: true, step: 3, biography: `Hello I'm Ziv`, isverified: true, profile_picture: 'https://res.cloudinary.com/dfo5dyaua/image/upload/v1717932930/profile_pictures/frxr3ythr0a1plikokpr.webp',  },
    { first_name: 'Yoni', last_name: 'F', email: 'yoni@email.com', password: hash, isadmin: true, step: 2},
    { first_name: 'Harry', last_name: 'Potter', email: 'harry@email.com', password: hash, cohort_id: 10, isadmin: false, isverified:false, step:2},
    { first_name: 'Ron', last_name: 'Weasley', email: 'ron@email.com', password: hash, cohort_id: 10, isadmin: false, isverified:false, step:2},
    { first_name: 'Hermoine', last_name: 'Granger', email: 'hermoine@email.com', password: hash, cohort_id: 10, isverified: false, isadmin: false,step:2}
  ]);


  // await knex('cohort').insert([
  //   { name: 'TTA1_July_2023' },
  //   { name: 'TTA2-March_2023'},
  //   { name: 'TTA3-April_2023'},
  //   { name: 'TTA4-August_2023'},
  //   { name: 'TTA5-November_2023'},
  //   { name: 'TTA6-July_2023' },
  //   { name: 'TTA7_August_2023'},
  //   { name: 'TTA8_February_2024'},
  //   { name: 'TTA10_October_2023'},
  //   { name: 'TTA11_February_2024'},
  //   { name: 'TTA12_February_2024'},
  //   { name: 'TTA13_April_2024'},
  //   { name: 'TTA14_June_2024'},
  // ])

}

