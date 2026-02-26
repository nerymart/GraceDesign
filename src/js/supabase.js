import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://madztctpsaflqyjlcogh.supabase.co'
const supabaseAnonKey = 'sb_publishable_ueYxP2vM3xgFZbdyRE6EPA_bg52lxti'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function uploadImage(file, bucket = 'jewelry') {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

    return data.publicUrl;
}
