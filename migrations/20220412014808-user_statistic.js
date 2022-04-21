module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.DataTypes.INTEGER });
         */
        return queryInterface.createTable('UserStatistic', {

            // user_id is a foreign key not a primary key
            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: { model: 'User', key: 'user_id' },
                allowNull: false,
                unique: true,
            },

            num_wins: {
                type: Sequelize.DataTypes.INTEGER,
                defaultValue: 0,
            },

            num_loss: {
                type: Sequelize.DataTypes.INTEGER,
                defaultValue: 0,
            },

            date_joined: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('NOW()'),
                allowNull: false,
            },

        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        return queryInterface.dropTable('UserStatistic');
    },
};
