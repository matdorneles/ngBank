import prismaClient from "../prisma";

interface FilterRequest {
    userId: number;
    initDate: string;
    finalDate: string
}

class FilterTransactionService {
    async execute({ userId, initDate, finalDate }: FilterRequest) {
        const account = await prismaClient.user.findFirst({
            where: {
                id: userId
            }
        });

        if(!account) {
            throw new Error("Erro ao encontrar usuário")
        }

        const accountId = account?.accountId;

        const transactions = await prismaClient.transaction.findMany({
            where: {
                debitedAccountId: accountId,
                createdAt: {
                    gte: initDate,
                    lte: finalDate
                }
            }
        });

        if(!transactions) {
            throw new Error("Não existem transações");
        }

        return transactions;
    }
}

export { FilterTransactionService }