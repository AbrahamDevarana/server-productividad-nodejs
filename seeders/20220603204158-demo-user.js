'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('users', [{
        name: "Fátima",
        email: "fatimaortiz@devarana.mx",
        password: bcrypt.hashSync("Devarana#1234*", bcrypt.genSaltSync(10)),
        lastName: "B",
        short_name: "FO",
        nick_name: "Fátima Ortiz",
        secondLastName: "Ortiz",
        profile_description: "",
        birth_date: "1993/08/25",
        admission_date: "2022/02/15",
        phone: "1234567890"
     },
     {
      name: "Abraham",
      email: "abrahamalvarado@devarana.mx",
      lastName: "Alvarado",
      password: bcrypt.hashSync("Devarana#1234*", bcrypt.genSaltSync(10)),
      secondLastName: "Guevara",
      short_name: "AAG",
      nick_name: "Abraham Alvarado",
      profile_description: "",
      birth_date: "1993/08/25",
      admission_date: "2022/02/15",
      phone: "1234567890"
     },
     {
      name: "José",
      email: "josejimenez@devarana.mx",
      lastName: "Jimenez",
      password: bcrypt.hashSync("Devarana#1234*", bcrypt.genSaltSync(10)),
      secondLastName: "",
      short_name: "JJ",
      nick_name: "",
      profile_description: "",
      birth_date: "1990/01/01",
      admission_date: "2022/03/15",
      phone: "1234567890"
     }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});

  }
};
