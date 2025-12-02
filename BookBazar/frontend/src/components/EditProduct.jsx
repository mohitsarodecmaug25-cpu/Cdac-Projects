import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Form, Button, Spinner, Card } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { BOOKS_API_URL } from "../constants/APIConstants";

export function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    imageUrl: "",
    isbn: ""
  });
  const [loading, setLoading] = useState(true);

  // FETCH SINGLE BOOK
  useEffect(() => {
    axios
      .get(`${BOOKS_API_URL}/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch(() => toast.error("Failed to load book"))
      .finally(() => setLoading(false));
  }, [id]);

  // UPDATE BOOK
  async function handleUpdate(e) {
    e.preventDefault();
    try {
      await axios.put(`${BOOKS_API_URL}/${id}`, product);
      toast.success("Book updated successfully!");
      setTimeout(() => {
        navigate("/products/handle");
      }, 1500);
    } catch (err) {
      toast.error("Failed to update book");
    }
  }

  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <Container className="my-4">
      <Card className="p-4 shadow-sm">
        <h3>Edit Book</h3>
        <Form onSubmit={handleUpdate}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={product.title || ""}
              onChange={(e) => setProduct({ ...product, title: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={product.author || ""}
              onChange={(e) => setProduct({ ...product, author: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              value={product.category || ""}
              onChange={(e) => setProduct({ ...product, category: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price (₹)</Form.Label>
            <Form.Control
              type="number"
              value={product.price || ""}
              onChange={(e) => setProduct({ ...product, price: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              value={product.quantity || ""}
              onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={product.description || ""}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              value={product.imageUrl || ""}
              onChange={(e) => setProduct({ ...product, imageUrl: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              value={product.isbn || ""}
              onChange={(e) => setProduct({ ...product, isbn: e.target.value })}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Update Book
          </Button>
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => navigate("/handle-products")}
          >
            Cancel
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
