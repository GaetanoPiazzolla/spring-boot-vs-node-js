package gae.piaz.performance.model;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.List;
import javax.persistence.*;


@Entity
@Table(name="books")
@NamedQuery(name="Book.findAll", query="SELECT b FROM Book b")
@Getter
@Setter
public class Book implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="BOOKS_BOOKID_GENERATOR", sequenceName="BOOKS_BOOK_ID_SEQ",initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="BOOKS_BOOKID_GENERATOR")
	@Column(name="book_id")
	private Integer bookId;

	private String author;

	private String isbn;

	private String title;

	private Integer year;

	@OneToMany(mappedBy="book")
	private List<Order> orders;

}