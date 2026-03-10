
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://madztctpsaflqyjlcogh.supabase.co'
const supabaseAnonKey = 'sb_publishable_ueYxP2vM3xgFZbdyRE6EPA_bg52lxti'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function moveItems() {
    console.log('Moving items from p3d-alfabeto to p3d-dijes-alfa...');
    const { data, error } = await supabase
        .from('catalog_items')
        .update({ category: 'p3d-dijes-alfa' })
        .eq('category', 'p3d-alfabeto')
        .select();

    if (error) {
        console.error('Error moving items:', error);
    } else {
        console.log('Successfully moved items:', data.length);
    }
}

moveItems();
