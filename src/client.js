import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://oljaxmjwpjzxpchlyuim.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9samF4bWp3cGp6eHBjaGx5dWltIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM3MzEzMDIsImV4cCI6MTk3OTMwNzMwMn0.LY3-ksJIKhvavTL2gWk2j7iCetORTV_eiFVB9UWcq7Y" 
)