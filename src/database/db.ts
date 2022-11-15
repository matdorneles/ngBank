import { Sequelize } from "sequelize";

export const db = new Sequelize('ngBank', 'postgres', 'postgres', {
    dialect: 'postgres'
});