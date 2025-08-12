
import pandas as pd
import yaml
import json
from collections import defaultdict

def combine_csv_yaml_to_json(csv_file, yaml_file, output_json_file, merge_key='nanyangSiteId'):
    """
    Combine CSV and YAML files into a single JSON document based on a common key.
    
    Args:
        csv_file (str): Path to the CSV file
        yaml_file (str): Path to the YAML file
        output_json_file (str): Path to save the output JSON file
        merge_key (str): The key to use for merging the data
    """
    try:
        # Read CSV file with pandas
        csv_data = pd.read_csv(csv_file, encoding='utf-8')
        
        # Read YAML file
        with open(yaml_file, 'r', encoding='utf-8') as f:
            yaml_data = yaml.safe_load(f)
        
        # Convert YAML data to a dictionary with merge_key as the key
        yaml_dict = defaultdict(dict)
        for item in yaml_data:
            if merge_key in item:
                key = item[merge_key]
                yaml_dict[key] = item
        
        # Convert CSV data to dictionary format
        csv_data.fillna('', inplace=True)  # Replace NaN with empty string
        csv_records = csv_data.to_dict('records')
        
        # Combine the data
        combined_data = []
        for csv_record in csv_records:
            if merge_key in csv_record:
                key = csv_record[merge_key]
                combined_record = csv_record.copy()
                
                # Add YAML data if key exists
                if key in yaml_dict:
                    combined_record.update(yaml_dict[key])
                
                combined_data.append(combined_record)
        
        # Save to JSON file with proper formatting
        with open(output_json_file, 'w', encoding='utf-8') as f:
            json.dump(combined_data, f, indent=4, ensure_ascii=False)
        
        print(f"Successfully combined files and saved to {output_json_file}")
    
    except Exception as e:
        print(f"An error occurred: {str(e)}")