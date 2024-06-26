import { privateProcedure } from '$lib/trpc/t';
import { router } from '$lib/trpc/t';

export const getUser =
    privateProcedure
    .query(async ({ ctx }) => {
        return {
            user: "i am a user"
        };
    });


export const userRouter = router({
	getUser
});
