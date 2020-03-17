/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
      },
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "first_name"
      },
      lastName: {
        type: DataTypes.STRING(255),
        field: "last_name"
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
            msg: "invalid email"
          }
        },
        unique: {
          args: true,
          msg: "Email address already in use!"
        },

        field: "email"
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: "password"
      },
      role: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "user",
        field: "role"
      },
      avatar: {
        type: DataTypes.STRING(255),
        field: "avatar"
      },
      rememberToken: {
        type: DataTypes.STRING(100),
        allowNull: true,
        field: "remember_token"
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
      tableName: "users"
    }
  );
};
