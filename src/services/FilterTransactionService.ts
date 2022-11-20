import prismaClient from "../prisma";

interface FilterRequest {
    userId: number;
    debit: boolean;
    credit: boolean;
    date: boolean;
    initDate: string;
    finalDate: string
}

class FilterTransactionService {
    async execute({ userId, debit, credit, date, initDate, finalDate }: FilterRequest) {
        const account = await prismaClient.user.findFirst({
            where: {
                id: userId
            }
        });

        if(!account) {
            throw new Error("Erro ao encontrar usuário")
        }

        const accountId = account.accountId;

        if(debit && !date) {

            const transactions = await prismaClient.transaction.findMany({
                where: {
                    debitedAccountId: accountId
                }
            });

            return transactions

        } else if (debit && date) {

            const transactions = await prismaClient.transaction.findMany({
                where: {
                    debitedAccountId: accountId,
                    createdAt: {
                        gte: initDate,
                        lte: finalDate
                    }
                }
            });

            return transactions

        } else if (credit && !date) {

            const transactions = await prismaClient.transaction.findMany({
                where: {
                    creditedAccountId: accountId
                }
            });

            return transactions

        } else if (credit && date) {

            const transactions = await prismaClient.transaction.findMany({
                where: {
                    creditedAccountId: accountId,
                    createdAt: {
                        gte: initDate,
                        lte: finalDate
                    }
                }
            });
            
            return transactions

        } else {

            throw new Error("Não foram encontradas transações");
        }
    }
}

export { FilterTransactionService }