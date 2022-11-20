import prismaClient from "../prisma";

interface UserRequest {
    userId: number
}

class CheckTransactionService {
    async execute({ userId }: UserRequest) {
        const account = await prismaClient.user.findFirst({
            where: {
                id: userId
            }
        });

        if(!account) {
            throw new Error("Conta não encontrada");
        }

        const transactions = await prismaClient.transaction.findMany({
            where: {
                OR: [
                    {
                        debitedAccountId: account.accountId
                    },
                    {
                        creditedAccountId: account.accountId
                    }
                ]
            }
        });

        if(!transactions) {
            throw new Error("Não foram encontradas transações");
        }

        return transactions;
    }
}

export { CheckTransactionService }