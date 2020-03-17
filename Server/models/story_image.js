'use strict';
module.exports = function (sequelize, DataTypes) {
    var Story = sequelize.define(
        "Stroy_image",
        {
            story_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                field: "story_id"
            },
            path: {
                type: DataTypes.STRING(255),
                allowNull: false,
                field: "path"
            },
            userId: {
                type: DataTypes.BIGINT,
                allowNull: false,
                field: "userId"
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: "created_at"
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: "updated_at"
            }
        },
        {
            tableName: "story_image"
        },
    );
    return Story;
};