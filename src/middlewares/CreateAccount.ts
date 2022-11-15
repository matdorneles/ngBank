import { AccountModel } from "../database/models/account";

export async function createAccount() {
    const account = AccountModel.create({
        balance: 100.0
    });

    return JSON.stringify(account);
}