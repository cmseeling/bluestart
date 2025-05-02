import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { db } from "@bluestart/db";
import { eq } from "drizzle-orm";
import { userTable } from "@bluestart/db/schema";

export const load: PageServerLoad = async () => {
    console.log('handling login page request');
    const masterAccount = await db.query.userTable.findFirst({
        where: eq(userTable.isMasterAccount, true)
    });
    if (masterAccount === null || masterAccount === undefined) {
        return redirect(303, '/admin/createmasteraccount');
    }
};