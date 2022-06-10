'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('areas', [{
        nombre: "Dirección",
        descripcion: "Dirección General",
      },
      {
        nombre: "Comercial",
        descripcion: "Comercial",
      },
      {
        nombre: "Operaciones",
        descripcion: "Operaciones",
      },
      {
        nombre: "Staff",
        descripcion: "Staff",
      },
      {
        nombre: "Finanzas",
        descripcion: "Finanzas",
      },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('areas', null, {});
    
  }
};
