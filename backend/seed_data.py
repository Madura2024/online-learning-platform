import os
import django
import random

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from django.contrib.auth import get_user_model
from courses.models import Course, Module, Lesson, Quiz, Question, Enrollment

User = get_user_model()

def seed_data():
    print("Starting massive enriched data seeding...")

    # 1. Create Instructors
    instructors_data = [
        {
            "username": "dr_smith",
            "email": "smith@eduvantage.com",
            "password": "password123",
            "role": User.IS_INSTRUCTOR,
            "bio": "PhD in Backend Systems. 15 years experience in Python and Enterprise Architecture."
        },
        {
            "username": "jane_doe",
            "email": "jane@eduvantage.com",
            "password": "password123",
            "role": User.IS_INSTRUCTOR,
            "bio": "Lead Designer at a Fortune 500 company. Specialist in Accessibility and Design Systems."
        }
    ]

    instructors = []
    for data in instructors_data:
        user, created = User.objects.get_or_create(
            username=data["username"],
            email=data["email"],
            defaults={"role": data["role"], "bio": data["bio"]}
        )
        if created:
            user.set_password(data["password"])
            user.save()
        instructors.append(user)

    # 2. Courses with Extensive Subject-Relevant Data
    courses_data = [
        {
            "title": "Mastering React 18: Build Production-Ready Apps",
            "description": "Unlock the power of React 18. Dive deep into Hooks, Concurrent Mode, and high-performance patterns.",
            "instructor": instructors[1],
            "modules": [
                {
                    "title": "Modern React Fundamentals",
                    "lessons": [
                        {
                            "title": "The Evolution of Virtual DOM",
                            "content": "React's primary 혁신 was the Virtual DOM. In this lesson, we breakdown exactly how Reconciliation works. You'll learn how React maintains a lightweight representation of the real DOM in memory, calculates the minimal number of changes, and batches updates for peak performance. We will compare this with traditional DOM manipulation and other modern frameworks like Svelte or Vue.",
                            "video_url": "https://www.youtube.com/watch?v=N3AkSS5hXMA"
                        },
                        {
                            "title": "JSX and the Build Pipeline",
                            "content": "JSX isn't just magic—it's a syntax extension for JavaScript. We'll explore how Babel transpiles your components into React.createElement calls. Learn how to debug build errors, optimize your bundle size, and understand why we need a build step in modern web development. We'll also touch upon Vite and how it revolutionized the development experience.",
                            "video_url": "https://www.youtube.com/watch?v=NCwa_xi0Uuc"
                        }
                    ]
                },
                {
                    "title": "Advanced State Management",
                    "lessons": [
                        {
                            "title": "Custom Hooks: The Power of Extraction",
                            "content": "Hooks are more than just useState and useEffect. The true power of React 18 lies in creating custom hooks to share logic between components. We'll build a useFetch hook from scratch, handling loading states, errors, and caching. You'll learn how to separate your UI from your business logic, leading to more maintainable and testable codebases.",
                            "video_url": "https://www.youtube.com/watch?v=NCwa_xi0Uuc"
                        }
                    ]
                }
            ]
        },
        {
            "title": "UI/UX Design Masterclass: From Theory to High-Fidelity",
            "description": "Learn the psychological and mathematical principles behind world-class design.",
            "instructor": instructors[1],
            "modules": [
                {
                    "title": "The Science of Layout",
                    "lessons": [
                        {
                            "title": "The Golden Ratio in UI Design",
                            "content": "The Golden Ratio (1.618) isn't just for classical art; it's a vital tool for creating balanced digital interfaces. In this lesson, we study how to apply mathematical proportions to your grids, typography scales, and negative spacing. We'll analyze why landing pages that follow these proportions feel more 'natural' and professional to the human eye vs randomly placed elements.",
                            "video_url": "https://www.youtube.com/watch?v=68f7J20N9B0"
                        },
                        {
                            "title": "Typography and Visual Hierarchy",
                            "content": "Typography is 90% of design. Learn how to choose font pairings, set optimal line heights for readability, and establish a clear visual hierarchy. We'll discuss the difference between Display and Body fonts, and how to use weight and color to guide the user's eye towards the Call to Action (CTA).",
                            "video_url": "https://www.youtube.com/watch?v=W-6AL-OOnX0"
                        }
                    ]
                }
            ]
        },
        {
            "title": "Complete Django Masterclass: Scalable Backend Development",
            "description": "Learn to build industrial-strength backends with Python's most popular framework.",
            "instructor": instructors[0],
            "modules": [
                {
                    "title": "The Django Architecture",
                    "lessons": [
                        {
                            "title": "Middleware and the Request Lifecycle",
                            "content": "Every request to a Django server passes through a layer of Middleware. In this lesson, we deep dive into how Django handles security headers, session management, and CSRF protection automatically. You'll learn how to write your own custom middleware to log requests or inject headers, giving you full control over your server's ingress and egress.",
                            "video_url": "https://www.youtube.com/watch?v=F5mRW0jo-U4"
                        }
                    ]
                }
            ]
        },
        {
            "title": "Python for Beginners: From Zero to Hero",
            "description": "Master the world's most popular programming language with hands-on projects and clear explanations.",
            "instructor": instructors[0],
            "modules": [
                {
                    "title": "Python Basics",
                    "lessons": [
                        {
                            "title": "Variables, Data Types, and Operators",
                            "content": "In this lesson, we cover the building blocks of Python. You'll learn about integers, floats, strings, and booleans. We'll explore how to perform arithmetic operations, use comparison operators, and understand the dynamic typing nature of Python.",
                            "video_url": "https://www.youtube.com/watch?v=_uQrJ0TkZlc"
                        },
                        {
                            "title": "Control Flow: If-Else and Loops",
                            "content": "Logic is the heart of programming. We'll dive into conditional statements (if, elif, else) and loops (for, while). You'll learn how to iterate over sequences using the range() function and how to use break and continue to control loop execution.",
                            "video_url": "https://www.youtube.com/watch?v=6iF8Xb7Z3wI"
                        }
                    ]
                }
            ]
        },
        {
            "title": "JavaScript: The Essential Guide",
            "description": "Deep dive into modern JavaScript (ES6+), DOM manipulation, and asynchronous programming.",
            "instructor": instructors[1],
            "modules": [
                {
                    "title": "ES6+ Features",
                    "lessons": [
                        {
                            "title": "Arrow Functions and Destructuring",
                            "content": "Modern JS is concise and powerful. We'll learn how to use arrow functions for shorter syntax and lexical scoping. Then, we'll master array and object destructuring to easily extract data from complex structures.",
                            "video_url": "https://www.youtube.com/watch?v=NIqHuW88yKM"
                        },
                        {
                            "title": "Promises and Async/Await",
                            "content": "Handling asynchronous operations is crucial for web dev. We'll move beyond callbacks to Promises and then learn the elegant async/await syntax. You'll understand how to fetch data from APIs without blocking the main thread.",
                            "video_url": "https://www.youtube.com/watch?v=V_Kr9OSfDeU"
                        }
                    ]
                }
            ]
        },
        {
            "title": "Data Science Foundations",
            "description": "Learn the essential libraries for data analysis and visualization in Python.",
            "instructor": instructors[0],
            "modules": [
                {
                    "title": "Data Manipulation with Pandas",
                    "lessons": [
                        {
                            "title": "Series and DataFrames",
                            "content": "Pandas is the workhorse of data science. We'll learn how to create and manipulate Series and DataFrames, clean missing data, and perform basic aggregations.",
                            "video_url": "https://www.youtube.com/watch?v=dcqPhpY7hlk"
                        },
                        {
                            "title": "Filtering and Sorting Data",
                            "content": "Learn how to query your data effectively. We'll cover boolean indexing, the .loc and .iloc accessors, and how to sort data by one or more columns.",
                            "video_url": "https://www.youtube.com/watch?v=Lwo2LpS779o"
                        }
                    ]
                }
            ]
        },
        {
            "title": "Machine Learning with Scikit-Learn",
            "description": "Jumpstart your AI career by learning supervised and unsupervised learning algorithms.",
            "instructor": instructors[0],
            "modules": [
                {
                    "title": "Supervised Learning",
                    "lessons": [
                        {
                            "title": "Linear and Logistic Regression",
                            "content": "We'll explore the basics of regression and classification. You'll learn how to train models using Scikit-Learn, evaluate their performance, and understand the difference between continuous and categorical predictions.",
                            "video_url": "https://www.youtube.com/watch?v=4b5d3muPQmA"
                        },
                        {
                            "title": "Decision Trees and Random Forests",
                            "content": "Go beyond linear models. We'll learn about tree-based algorithms, how they handle non-linear relationships, and how ensemble methods like Random Forest improve accuracy and reduce overfitting.",
                            "video_url": "https://www.youtube.com/watch?v=v6VJ2RO66Ag"
                        }
                    ]
                }
            ]
        },
        {
            "title": "Advanced CSS Techniques",
            "description": "Master Grid, Flexbox, and Animations to create stunning, responsive user interfaces.",
            "instructor": instructors[1],
            "modules": [
                {
                    "title": "Modern Layouts",
                    "lessons": [
                        {
                            "title": "CSS Grid Deep Dive",
                            "content": "Grid is the most powerful layout system in CSS. We'll master grid-template-areas, fractional units (fr), and the repeat() function to create complex 2D layouts with ease.",
                            "video_url": "https://www.youtube.com/watch?v=7kVeCqQCxlk"
                        },
                        {
                            "title": "Mastering Flexbox",
                            "content": "Learn when to use Flexbox over Grid. We'll cover justify-content, align-items, flex-grow, and flex-shrink to build responsive component layouts.",
                            "video_url": "https://www.youtube.com/watch?v=fYq5PXgSsbE"
                        }
                    ]
                }
            ]
        }
    ]

    for c_data in courses_data:
        course, created = Course.objects.update_or_create(
            title=c_data["title"],
            defaults={
                "description": c_data["description"],
                "instructor": c_data["instructor"]
            }
        )
        
        # Reset modules and lessons for a clean, enriched state
        course.modules.all().delete()
        print(f"Feeding detailed data for: {course.title}")

        for m_data in c_data["modules"]:
            module = Module.objects.create(course=course, title=m_data["title"])
            for i, l_data in enumerate(m_data["lessons"]):
                Lesson.objects.create(
                    module=module,
                    title=l_data["title"],
                    content=l_data["content"],
                    video_url=l_data.get("video_url", ""),
                    order=i
                )

    print("Subect-relevant data feeding complete!")

if __name__ == "__main__":
    seed_data()
