import { DataTypes } from "sequelize";
import { db } from "../db";
import { TransactionModel } from "./transaction";
import { UserModel } from "./user";

export const AccountModel = db.define('account', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    balance: {
        type: DataTypes.FLOAT,
        defaultValue: 100.0,
        allowNull: false
    }
}, {
    timestamps: false
});

AccountModel.hasOne(UserModel);
AccountModel.hasMany(TransactionModel);