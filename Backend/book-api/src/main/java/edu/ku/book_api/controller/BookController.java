package edu.ku.book_api.controller;

import edu.ku.book_api.model.Books;

import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

import java.util.List;

@RestController

@RequestMapping("/api/v1/books")

public class BookController {

    private final List<Books> books = new ArrayList<>(List.of(

        new Books(

            1L,

            "Clean Code",

            "Robert C. Martin",

            "9780132350884",

            2008,

            "Software Engineering"

        ),

        new Books(

            2L,

            "Effective Java",

            "Joshua Bloch",

            "9780134685991",

            2018,

            "Java"

        ),

        new Books(

            3L,

            "Designing Data-Intensive Applications",

            "Martin Kleppmann",

            "9781449373320",

            2017,

            "Distributed Systems"

        ),

        new Books(

            4L,

            "Spring in Action",

            "Craig Walls",

            "9781617297571",

            2022,

            "Spring"

        ),

        new Books(

            5L,

            "Computer Networks",

            "Andrew S. Tanenbaum",

            "9780132126953",

            2010,

            "Networking"

        ),

        new Books(

            6L,

            "Information Systems Security",

            "Hedayat Lodin",

            "9780132126953",

            2026,

            "Security"

        )

    ));

    @GetMapping

    public List<Books> getAllBooks() {

        return books;

    }

    @GetMapping("/{id}")

    public Books getBookById(@PathVariable Long id) {

        for (Books book : books) {

            if (book.getId().equals(id)) {

                return book;

            }

        }

        return null;

    }

    @PutMapping("/{id}")

    public Books updateBook(

            @PathVariable Long id,

            @RequestBody Books updatedBook

    ) {

        for (Books book : books) {

            if (book.getId().equals(id)) {

                book.setTitle(updatedBook.getTitle());

                book.setAuthor(updatedBook.getAuthor());

                book.setIsbn(updatedBook.getIsbn());

                book.setPublishedYear(updatedBook.getPublishedYear());

                book.setCategory(updatedBook.getCategory());

                return book;

            }

        }

        return null;

    }

    @DeleteMapping("/{id}")

    public String deleteBook(@PathVariable Long id) {

        boolean removed = books.removeIf(

            book -> book.getId().equals(id)

        );

        if (removed) {

            return "Book with ID " + id + " deleted successfully";

        }

        return "Book with ID " + id + " not found";

    }

}