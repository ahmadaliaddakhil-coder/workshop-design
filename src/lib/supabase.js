import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://ppdlmklysflitosfskwh.supabase.co"
const supabaseAnon = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwZGxta2x5c2ZsaXRvc2Zza3doIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwOTMyODksImV4cCI6MjA3OTY2OTI4OX0.21YmrzP0zeT_0wP3Gujdy9BBl8HDsItrdRKji8yGxDQ"

export const supabase = createClient(supabaseUrl, supabaseAnon)
