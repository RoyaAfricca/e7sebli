import re
import os

data_file = r'e:\Nouveau dossier (12)\src\data.js'
with open(data_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Regular expression to match subjects like { name: '...', coef: ... }
# We want to find cases where 'التاريخ' and 'الجغرافيا' are adjacent or near each other within the same array.
# But it's easier to just find all occurrences of 'التاريخ' and 'الجغرافيا' arrays and merge them.

# Approach: Replace the entire SUBJECTS_DATA block to be clean and accurate.
# But I already have a lot of sections. I'll try to use a regex to replace substrings.

def merge_hist_geo(text):
    # Pattern to find History and Geography in the same section block
    # We'll just search for { name: 'التاريخ', coef: (\d+(\.\d+)?) ... }
    # and { name: 'الجغرافيا', coef: (\d+(\.\d+)?) ... }
    
    # Let's find specific sections to be more precise.
    sections = re.findall(r"'(lycee_[^']+)'\s*:\s*\[(.*?)\],", text, re.DOTALL)
    
    new_text = text
    for sec_id, sec_content in sections:
        if 'التاريخ' in sec_content and 'الجغرافيا' in sec_content:
            # Extract coefficients
            h_match = re.search(r"{\s*name:\s*'التاريخ',\s*coef:\s*([^,]+).*?}", sec_content)
            g_match = re.search(r"{\s*name:\s*'الجغرافيا',\s*coef:\s*([^,]+).*?}", sec_content)
            
            if h_match and g_match:
                h_coef = float(h_match.group(1).replace(',', '.'))
                g_coef = float(g_match.group(1).replace(',', '.'))
                total_coef = h_coef + g_coef
                
                # Create merged entry
                merged_entry = f"{{ name: 'تاريخ وجغرافيا', coef: {total_coef:g}, hasOral: true }}"
                
                # Remove both and insert new one
                new_sec_content = sec_content
                new_sec_content = re.sub(r"{\s*name:\s*'التاريخ',.*?}", "", new_sec_content)
                new_sec_content = re.sub(r"{\s*name:\s*'الجغرافيا',.*?}", merged_entry, new_sec_content)
                
                # Clean up commas
                new_sec_content = re.sub(r",\s*,", ",", new_sec_content)
                new_sec_content = re.sub(r"\[\s*,", "[", new_sec_content)
                
                # Replace back into text
                new_text = new_text.replace(sec_content, new_sec_content)
    
    return new_text

updated_content = merge_hist_geo(content)

with open(data_file, 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("Successfully merged History and Geography.")
