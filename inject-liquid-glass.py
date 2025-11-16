#!/usr/bin/env python3
"""
Script to inject Liquid Glass styles and dark mode into all HTML files
"""

import os
import re
from pathlib import Path

# Configuration
BASE_DIR = Path(__file__).parent
CSS_LINK = '<link rel="stylesheet" href="/assets/liquid-glass.css">'
JS_SCRIPT = '<script src="/assets/dark-mode.js"></script>'

# Files to skip
SKIP_FILES = {'inject-liquid-glass.py'}

def inject_into_html(file_path):
    """Inject CSS and JS into an HTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if already injected
        if 'liquid-glass.css' in content and 'dark-mode.js' in content:
            print(f"✓ Already injected: {file_path}")
            return False

        modified = False

        # Inject CSS before </head>
        if 'liquid-glass.css' not in content:
            if '</head>' in content:
                content = content.replace('</head>', f'    {CSS_LINK}\n</head>')
                modified = True

        # Inject JS before </body>
        if 'dark-mode.js' not in content:
            if '</body>' in content:
                content = content.replace('</body>', f'    {JS_SCRIPT}\n</body>')
                modified = True

        # Write back if modified
        if modified:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Injected: {file_path}")
            return True

        return False

    except Exception as e:
        print(f"✗ Error processing {file_path}: {e}")
        return False

def main():
    """Main function to process all HTML files"""
    html_files = list(BASE_DIR.rglob('*.html'))

    print(f"Found {len(html_files)} HTML files")
    print("=" * 60)

    injected_count = 0

    for html_file in html_files:
        # Skip if in .git directory
        if '.git' in str(html_file):
            continue

        if inject_into_html(html_file):
            injected_count += 1

    print("=" * 60)
    print(f"✓ Complete! Injected into {injected_count} files")
    print(f"✓ Skipped {len(html_files) - injected_count} files (already injected or errors)")

if __name__ == '__main__':
    main()
