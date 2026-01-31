import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from courses.models import Course, Module, Lesson

def populate_lessons():
    print("🚀 Starting FINAL STABLE lesson content population...")

    # Origin parameter to help with localhost embedding issues
    O = "?enablejsapi=1&origin=http://localhost:5173"

    content_data = {
        # React 18
        "The Evolution of Virtual DOM": {
            "content": """# The Virtual DOM\n\nReact maintains a lightweight representation of the Real DOM in memory.\n\n## Why?\nUpdating the Real DOM is slow. React updates the Virtual DOM first, calculates the minimal changes (Diffing), and batches the real updates (Reconciliation).""",
            "video_url": f"https://www.youtube.com/embed/BYbgopx44vo{O}"
        },
        "JSX and the Build Pipeline": {
            "content": """# JSX Theory\n\nJSX is syntactic sugar for `React.createElement()`. It allows you to write HTML-like code inside your JavaScript components.""",
            "video_url": f"https://www.youtube.com/embed/kuG4o_F4Xys{O}"
        },
        "Custom Hooks: The Power of Extraction": {
            "content": """# Custom Hooks\n\nExtract component logic into reusable functions. Custom hooks must start with 'use'.""",
            "video_url": f"https://www.youtube.com/embed/J7gE-W9P-kI{O}"
        },

        # UI/UX Design
        "The Golden Ratio in UI Design": {
            "content": """# The Golden Ratio in UI\n\nA mathematical ratio (1.618) used to create aesthetically pleasing layouts and typography scales.""",
            "video_url": f"https://www.youtube.com/embed/ceNqN_Xn8nU{O}"
        },
        "The Golden Ratio": {
            "content": """# Mastering The Golden Ratio\n\nApply the 1.618 ratio to your grids, margins, and font sizes to achieve natural balance in your designs.""",
            "video_url": f"https://www.youtube.com/embed/ceNqN_Xn8nU{O}"
        },
        "Typography and Visual Hierarchy": {
            "content": """# Typography Design\n\nUse font weight, size, and color to guide the user's eye and establish a clear information hierarchy.""",
            "video_url": f"https://www.youtube.com/embed/wJpS29T3lEw{O}"
        },
        "Color Psychology": {
            "content": """# Color Psychology\n\nDifferent colors evoke different emotions. Blue conveys trust, while red conveys urgency.""",
            "video_url": f"https://www.youtube.com/embed/zC1cR7Sg1C4{O}"
        },

        # Django
        "Installing Django": {
            "content": """# Django Setup\n\nInstall using `pip install django` and start a project with `django-admin startproject`.""",
            "video_url": f"https://www.youtube.com/embed/OTmQOjslB58{O}"
        },
        "The MVT Pattern": {
            "content": """# Django MVT\n\nModel (Data), View (Logic), Template (UI).""",
            "video_url": f"https://www.youtube.com/embed/hN_j3oM1B5o{O}"
        },
        "Introduction to DRF": {
            "content": """# Introduction to DRF\n\nBuild powerful REST APIs with Django REST Framework using Serializers and ViewSets.""",
            "video_url": f"https://www.youtube.com/embed/p_yS_xZtZ5U{O}"
        },
        "Middleware and the Request Lifecycle": {
            "content": """# Django Middleware\n\nA layer-based system to process requests before they reach the view.""",
            "video_url": f"https://www.youtube.com/embed/eI2Xz09D_uY{O}"
        },

        # Python
        "Variables, Data Types, and Operators": {
            "content": """# Python Foundations\n\nLearn about integers, floats, strings, and booleans. Master the basic arithmetic and logical operators.""",
            "video_url": f"https://www.youtube.com/embed/kqtD5dpn9C8{O}"
        },
        "Control Flow: If-Else and Loops": {
             "content": """# Python Logic\n\nUse `if`, `elif`, and `else` for decision making. Use `for` and `while` loops for iteration.""",
            "video_url": f"https://www.youtube.com/embed/vLqTf2b6GZw{O}"
        },

        # JavaScript
        "Arrow Functions and Destructuring": {
            "content": """# ES6 Essentials\n\nFaster function syntax and easy data extraction from objects/arrays.""",
            "video_url": f"https://www.youtube.com/embed/h33Srr5J9nY{O}"
        },
        "Promises and Async/Await": {
            "content": """# Async JS\n\nHandle asynchronous operations efficiently using Promises and the Async/Await syntax.""",
            "video_url": f"https://www.youtube.com/embed/dp_0_B906j8{O}"
        },

        # Data Science & ML
        "Series and DataFrames": {
            "content": """# Pandas Intro\n\nMaster the core data structures of Pandas for data manipulation.""",
            "video_url": f"https://www.youtube.com/embed/s_xapq0h7E8{O}"
        },
        "Filtering and Sorting Data": {
            "content": """# Pandas Queries\n\nFilter and sort your dataframes to find hidden insights.""",
            "video_url": f"https://www.youtube.com/embed/s_xapq0h7E8{O}"
        },
        "Linear and Logistic Regression": {
            "content": """# ML Regression\n\nPredict numeric values and categorical classes using Scikit-Learn.""",
            "video_url": f"https://www.youtube.com/embed/Zz4tqfP67X8{O}"
        },
        "Decision Trees and Random Forests": {
            "content": """# Tree Algorithms\n\nEnsemble learning with Random Forests for higher accuracy.""",
            "video_url": f"https://www.youtube.com/embed/J4W_zU5BwP4{O}"
        },

        # CSS
        "CSS Grid Deep Dive": {
            "content": """# CSS Grid\n\nAdvanced 2D layout control for modern web design.""",
            "video_url": f"https://www.youtube.com/embed/tS002Hk8J0M{O}"
        },
        "Mastering Flexbox": {
             "content": """# Flexbox Guide\n\nThe industry standard for one-dimensional layouts.""",
            "video_url": f"https://www.youtube.com/embed/fA1wF9s-vT0{O}"
        }
    }

    lessons = Lesson.objects.all()
    updated_count = 0

    for lesson in lessons:
        if lesson.title in content_data:
            lesson.content = content_data[lesson.title]["content"]
            lesson.video_url = content_data[lesson.title]["video_url"]
            lesson.save()
            print(f"✅ Updated: {lesson.title}")
            updated_count += 1

    print(f"\n✨ Done! Updated {updated_count} lessons with FINAL STABLE links.")

if __name__ == "__main__":
    populate_lessons()
