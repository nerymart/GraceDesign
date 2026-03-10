
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://madztctpsaflqyjlcogh.supabase.co'
const supabaseAnonKey = 'sb_publishable_ueYxP2vM3xgFZbdyRE6EPA_bg52lxti'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function checkSubcategories() {
    console.log('Fetching subcategories from Supabase...');
    const { data, error } = await supabase
        .from('subcategories')
        .select('*');

    if (error) {
        console.error('Error fetching subcategories:', error);
    } else {
        console.log('Subcategories found:', JSON.stringify(data, null, 2));
    }
}

checkSubcategories();
