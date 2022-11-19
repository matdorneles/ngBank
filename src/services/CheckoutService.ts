import prismaClient from "../prisma";

interface CheckoutRequest {
    debitUserId: number;
    creditAccountUser: string;
    transferValue: number
}

class CheckoutService {
    async execute({ debitUserId, creditAccountUser, transferValue }: CheckoutRequest) {
        // need to find both accounts IDs and parse them to numbers
        const findDebitAccount = await prismaClient.user.findFirst({
            where: {
                id: debitUserId
            }, select: {
                accountId: true
            }
        });

        const debitAccountId = Number(findDebitAccount?.accountId);
        
        const findCreditAccount = await prismaClient.user.findFirst({
            where: {
                username: creditAccountUser
            }, select: {
                accountId: true
            }
        });

        const creditAccountId = Number(findCreditAccount?.accountId);

        // check if both accounts were found and if credit account is the same as debit account
        if (!findDebitAccount || !findCreditAccount) {
            throw new Error("Username não foi encontrado");
        } else if (debitAccountId === creditAccountId) {
            throw new Error("Não é possível enviar para você mesmo");
        }


        // check if there is enough balance in debit account
        const findDebitAccountBalance = await prismaClient.account.findFirst({
            where: {
                id: debitAccountId
            }, select: {
                balance: true
            }
        });

        const debitAccountBalance = Number(findDebitAccountBalance?.balance);

        if(debitAccountBalance < transferValue) {
            throw new Error("O saldo não é suficiente");
        }

        // add and remove transfer values to account balances
        await prismaClient.account.update({
            where: {
                id: debitAccountId
            }, data: {
                balance: {
                    decrement: transferValue
                }
            }
        });

        await prismaClient.account.update({
            where: {
                id: creditAccountId
            }, data: {
                balance: {
                    increment: transferValue
                }
            }
        });

        // register the transaction in DB
        const transaction = await prismaClient.transaction.create({
            data: {
                debitedAccountId: debitAccountId,
                creditedAccountId: creditAccountId,
                value: transferValue
            }
        });

        return transaction;
    }
}

export { CheckoutService }