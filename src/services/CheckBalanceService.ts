import prismaClient from "../prisma";

interface AccountRequest {
    userId: number
}

class CheckBalanceService {
    async execute({ userId }: AccountRequest) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: userId
            }, select: {
                accountId: true
            }
        });

        const account = await prismaClient.account.findFirst({
            where: {
                id: user?.accountId
            }, select: {
                balance: true
            }
        });

        return account;
    }
}

export { CheckBalanceService }