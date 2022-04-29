module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.DataTypes.INTEGER });
         */
        await queryInterface.createTable('CardState', {

            card_state_id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                unique: true,
            },

            // Information about what kind of card this card state is
            card_info_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: 'CardInfo',
                    key: 'card_info_id',
                },
                onDelete: 'CASCADE',
                allowNull: false, // Required
                unique: false, // False because you can have duplicates of a card in a game as well as this table tracks all the card states throughout all games
            },

        });

        return queryInterface.addColumn('Collection', 'card_state_id', {
            type: Sequelize.DataTypes.INTEGER,
            references: {
                model: 'CardState',
                key: 'card_state_id',
            },
            onDelete: 'CASCADE',
            allowNull: false,
            unique: true,
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */

        await queryInterface.removeColumn(
            'Collection',
            'card_state_id',
        );

        return queryInterface.dropTable('CardState');
    },
};
