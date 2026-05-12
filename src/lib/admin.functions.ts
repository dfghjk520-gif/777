import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { assertAdmin, getUserFromAccessToken, listAdminUsers } from "./admin.server";

export const getAdminUsers = createServerFn({ method: "GET" })
  .inputValidator((data: { accessToken?: string }) => data)
  .handler(async ({ data }) => {
    if (!data.accessToken) throw new Response("Unauthorized", { status: 401 });
    const user = await getUserFromAccessToken(data.accessToken);
    await assertAdmin(user.id);
    return listAdminUsers();
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    return { isAdmin: !!data };
  });
