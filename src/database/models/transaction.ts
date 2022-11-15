import { DataTypes } from "sequelize";
import { db } from "../db";
import { AccountModel } from "./account";

export const TransactionModel = db.define('transaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    debitedAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AccountModel,
            key: "id"
        }
    },
    creditedAccountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: AccountModel,
            key: "id"
        }
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    updatedAt: false
});

TransactionModel.belongsTo(AccountModel, { as: 'debitedAccountId' });
TransactionModel.belongsTo(AccountModel, { as: 'creditedAccountId' });