import { createServerFn } from "@tanstack/react-start";

// Verifies the admin password against the ADMIN_PASSWORD secret.
export const verifyAdminPassword = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string }) => {
    if (!input || typeof input.password !== "string") throw new Error("Invalid payload");
    return input;
  })
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) throw new Error("Server not configured: ADMIN_PASSWORD is not set");
    return { ok: data.password === expected };
  });

// Saves the site content to Lovable Cloud. Gated by ADMIN_PASSWORD.
export const saveSiteContent = createServerFn({ method: "POST" })
  .inputValidator((input: { password: string; data: unknown }) => {
    if (!input || typeof input.password !== "string" || typeof input.data !== "object" || input.data === null) {
      throw new Error("Invalid payload");
    }
    return input;
  })
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected) throw new Error("Server not configured: ADMIN_PASSWORD is not set");
    if (data.password !== expected) throw new Error("Invalid password");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("site_content")
      .upsert({ id: "main", data: data.data as never, updated_at: new Date().toISOString() });
    if (error) throw new Error(error.message);
    return { ok: true };
  });
