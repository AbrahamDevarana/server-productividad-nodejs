'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
	await queryInterface.bulkInsert('corporativos', [{
		proposito: 'Proposito',
		mision: 'Mision',
		vision: 'Vision',
		logotipo: 'Logotipo',
		isotipo: 'Isotipo',
		fortaleza: 'Fortaleza',
		oportunidades: 'Oportunidades',
		debilidades: 'Debilidades',
		amenazas: 'Amenazas',
		createdAt: new Date(),
		updatedAt: new Date()
	}], {});
    
  },

	async down (queryInterface, Sequelize) {
   
		await queryInterface.bulkDelete('corporativos', null, {});

  }
};
