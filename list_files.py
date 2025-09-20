# Save this code in a file named list_files.py
import os
import sys

def list_directory_two_levels(root_dir):
    """
    Prints the structure of a directory and its immediate subdirectories (2 levels deep).
    """
    if not os.path.isdir(root_dir):
        print(f"Error: Directory '{root_dir}' not found.")
        return

    print(f"Structure of: {root_dir}\n")
    
    # --- Directories to ignore for a clean output ---
    ignore_dirs = {'venv', '__pycache__', '.git', 'node_modules'}

    try:
        # Loop through items in the root directory
        for item in sorted(os.listdir(root_dir)):
            path = os.path.join(root_dir, item)

            # If it's a directory, print its name and then its contents
            if os.path.isdir(path):
                if item in ignore_dirs:
                    print(f"├── {item}/ (ignored)")
                    continue
                print(f"├── {item}/")
                try:
                    for sub_item in sorted(os.listdir(path)):
                        print(f"│   ├── {sub_item}")
                except Exception:
                    print(f"│   └── [Cannot read directory]")

            # If it's a file, just print its name
            else:
                print(f"├── {item}")

    except Exception as e:
        print(f"Error reading directory: {e}")

if __name__ == "__main__":
    start_path = sys.argv[1] if len(sys.argv) > 1 else '.'
    list_directory_two_levels(start_path)