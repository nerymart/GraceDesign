import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://madztctpsaflqyjlcogh.supabase.co'
const supabaseAnonKey = 'sb_publishable_ueYxP2vM3xgFZbdyRE6EPA_bg52lxti'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
