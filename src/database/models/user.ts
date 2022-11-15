import { DataTypes } from "sequelize";
import { db } from "../db";

export const UserModel = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});