package gae.piaz.performance.model;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import javax.persistence.*;

@Entity
@Table(name="orders")
@NamedQuery(name="Order.findAll", query="SELECT o FROM Order o")
@Getter
@Setter
public class Order implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="ORDERS_ORDERID_GENERATOR", sequenceName="ORDERS_ORDER_ID_SEQ",initialValue = 1, allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="ORDERS_ORDERID_GENERATOR")
	@Column(name="order_id")
	private Integer orderId;

	private Integer quantity;

	@ManyToOne
	@JoinColumn(name="book_id")
	private Book book;

	@ManyToOne
	@JoinColumn(name="user_id")
	private User user;

	public Order() {
	}


}