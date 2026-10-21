package edu.ku.book_api.controller;

import edu.ku.book_api.model.Course;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {

    private final List<Course> courses = new ArrayList<>(List.of(
            new Course(1L, "EWA301", "Advanced Enterprise Web App", 3),
            new Course(2L, "DB201", "Database Systems", 3),
            new Course(3L, "SE202", "Software Engineering", 3)));

    @GetMapping
    public List<Course> getCourses() {
        return courses;
    }

    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        courses.add(course);
        return course;
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable Long id, @RequestBody Course updatedCourse) {
        Optional<Course> existing = courses.stream()
                .filter(c -> c.getId().equals(id))
                .findFirst();

        if (existing.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Course course = existing.get();
        course.setCode(updatedCourse.getCode());
        course.setTitle(updatedCourse.getTitle());
        course.setCredits(updatedCourse.getCredits());
        return ResponseEntity.ok(course);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        boolean removed = courses.removeIf(c -> c.getId().equals(id));
        if (!removed) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();
    }
}