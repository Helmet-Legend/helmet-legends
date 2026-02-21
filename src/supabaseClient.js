import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ytaxxjlpkrcucduiltup.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl0YXh4amxwa3JjdWNkdWlsdHVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2NjQ4MTAsImV4cCI6MjA4NzI0MDgxMH0.r3k-Kl9hWNoCAis42riwNJaq4D8k0kLpDfk-kYxMtnc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
