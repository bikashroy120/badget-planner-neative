import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database 
export const supabase = createClient(
  "https://ikurtkbsvdpzdriuxoie.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrdXJ0a2JzdmRwemRyaXV4b2llIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE1MDgwNTksImV4cCI6MjAyNzA4NDA1OX0.l9Z4naoi4Pt1MOaTlJUQ6zNqGCJVumLiUCBm8uNC4To"
);
