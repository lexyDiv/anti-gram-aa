/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const chat = [{
      name: 'Общий чат',
      status: '',
      type: 'all',
      foto: 'https://avatars.mds.yandex.net/i?id=c3b27c0e63f8714a06b3a802c278a412_l-5244405-images-thumbs&n=13',
      creator_id: 0,
      users: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }];
    await queryInterface.bulkInsert('Chats', chat);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Chats');
  },
};
