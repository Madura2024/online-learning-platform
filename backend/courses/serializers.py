from rest_framework import serializers
from .models import Course, Module, Lesson, Enrollment, Quiz, Question, Grade

class LessonSerializer(serializers.ModelSerializer):
    course_id = serializers.SerializerMethodField()
    class Meta:
        model = Lesson
        fields = ('id', 'module', 'title', 'content', 'video_url', 'order', 'course_id')

    def get_course_id(self, obj):
        return obj.module.course.id

class ModuleSerializer(serializers.ModelSerializer):
    lessons = LessonSerializer(many=True, read_only=True)
    class Meta:
        model = Module
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    modules = ModuleSerializer(many=True, read_only=True)
    instructor_name = serializers.ReadOnlyField(source='instructor.username')
    
    class Meta:
        model = Course
        fields = ('id', 'title', 'description', 'instructor', 'instructor_name', 'thumbnail', 'modules', 'created_at')

class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    class Meta:
        model = Quiz
        fields = ('id', 'course', 'title', 'questions')

class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = '__all__'
