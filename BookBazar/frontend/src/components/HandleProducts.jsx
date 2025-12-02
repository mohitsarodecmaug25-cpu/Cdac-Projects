import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { BOOKS_API_URL } from "../constants/APIConstants";
import { useNavigate } from "react-router-dom";

export function HandleProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newProduct, setNewProduct] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    imageUrl: "",
    isbn: ""
  });

  const navigate = useNavigate();

  // ---------- FETCH BOOKS ----------
  async function fetchProducts() {
    try {
      const response = await axios.get(BOOKS_API_URL);
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching books:", error);
      toast.error("Failed to load books");
    } finally {
      setLoading(false);
    }
  }

  // ---------- ADD BOOK ----------
  async function handleAddProduct(e) {
    e.preventDefault();
    try {
      const response = await axios.post(BOOKS_API_URL, newProduct);
      toast.success("Book added successfully!");

      setNewProduct({
        title: "",
        author: "",
        category: "",
        price: "",
        quantity: "",
        description: "",
        imageUrl: "",
        isbn: ""
      });

      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add book");
    }
  }

  // ---------- DELETE BOOK ----------
  async function handleDelete(id) {
    if (!window.confirm("Delete this book?")) return;

    try {
      await axios.delete(`${BOOKS_API_URL}/${id}`);
      toast.success("Book deleted");
      fetchProducts();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete");
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Container className="my-4">
      <h2 className="text-center mb-4">Manage Books</h2>

      {/* ADD BOOK FORM */}
      <Card className="p-4 mb-5 shadow-sm">
        <h4>Add New Book</h4>
        <Form onSubmit={handleAddProduct}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Book Title</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Author</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.author}
                  onChange={(e) => setNewProduct({ ...newProduct, author: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Price (₹)</Form.Label>
                <Form.Control
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
          </Form.Group>

          <Row>
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.imageUrl}
                  onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>ISBN</Form.Label>
                <Form.Control
                  type="text"
                  value={newProduct.isbn}
                  onChange={(e) => setNewProduct({ ...newProduct, isbn: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button type="submit" variant="primary">Add Book</Button>
        </Form>
      </Card>

      {/* BOOK LIST */}
      <h4 className="mb-3">All Books</h4>

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row xs={1} md={4} className="g-4">
          {products.map((book) => (
            <Col key={book.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={book.imageUrl || "https://via.placeholder.com/300"}
                  style={{ height: "400px"}}
                />
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p>{book.author}</p>
                  <p><strong>₹{book.price}</strong> | Qty: {book.quantity}</p>

                  <div className="d-flex justify-content-between">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => navigate(`/edit-product/${book.id}`)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
