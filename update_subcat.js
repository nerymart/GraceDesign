
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://madztctpsaflqyjlcogh.supabase.co'
const supabaseAnonKey = 'sb_publishable_ueYxP2vM3xgFZbdyRE6EPA_bg52lxti'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function updateSubcategory() {
    console.log('Updating subcategory name in Supabase...');
    const { data, error } = await supabase
        .from('subcategories')
        .update({ name: 'Anillos Promesa' })
        .eq('id', 'p3d-comp-finos')
        .select();

    if (error) {
        console.error('Error updating subcategory:', error);
    } else {
        console.log('Subcategory updated successfully:', data);
    }
}

updateSubcategory();
