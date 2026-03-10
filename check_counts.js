
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const supabaseUrl = 'https://madztctpsaflqyjlcogh.supabase.co'
const supabaseAnonKey = 'sb_publishable_ueYxP2vM3xgFZbdyRE6EPA_bg52lxti'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function getStats() {
    console.log('Fetching all catalog items...');
    const { data: items, error } = await supabase
        .from('catalog_items')
        .select('name, category');

    if (error) {
        console.error('Error fetching items:', error);
        return;
    }

    const categoryStats = {};
    items.forEach(item => {
        const cat = item.category || 'NO_CATEGORY';
        if (!categoryStats[cat]) {
            categoryStats[cat] = { count: 0, examples: [] };
        }
        categoryStats[cat].count++;
        if (categoryStats[cat].examples.length < 10) {
            categoryStats[cat].examples.push(item.name);
        }
    });

    const sortedCats = Object.keys(categoryStats).sort();

    let report = '=== CATALOG DISTRIBUTION ===\n\n';
    sortedCats.forEach(cat => {
        const stat = categoryStats[cat];
        report += `Category: [${cat}]\n`;
        report += `  Count: ${stat.count}\n`;
        report += `  Examples: ${stat.examples.join(', ')}\n`;
        report += '---------------------------\n';
    });

    fs.writeFileSync('catalog_audit.txt', report);
    console.log('Report written to catalog_audit.txt');
}

getStats();
