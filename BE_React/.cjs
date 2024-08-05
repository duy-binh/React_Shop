const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/connectDB');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Routes for Products
app.get('/products', (req, res) => {
  const { keyword, category } = req.query;
  let sql = 'SELECT * FROM products';
  const params = [];

  if (keyword) {
    sql += ' WHERE name LIKE ?';
    params.push(`%${keyword}%`);
  } else if (category) {
    sql += ' WHERE category = ?';
    params.push(category);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (results.length > 0) {
      res.json(results);
    } else {
      res.status(404).json({ message: 'No products found' });
    }
  });
});

app.get('/products/:id', (req, res) => {
  const productId = req.params.id;
  const sql = 'SELECT * FROM products WHERE id = ?';

  db.query(sql, productId, (err, result) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });
});

app.post('/products', (req, res) => {
  const { name, price, img, description, category } = req.body;
  if (!name || !price || !img || !description || !category) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO products (name, price, img, description, category) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [name, price, img, description, category], (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
      res.status(500).json({ message: 'Failed to register products' });
    } else {
      res.status(201).json({ message: 'User registered successfully' });
    }
  });
});
app.put('/products/:id', (req, res) => {
  const productId = req.params.id;
  const { name, category, price, description, img } = req.body;

  // Xây dựng câu truy vấn SQL động dựa trên các trường có mặt trong body của yêu cầu
  let query = "UPDATE products SET ";
  const params = [];

  if (name !== undefined) {
    query += "`name` = ?, ";
    params.push(name);
  }
  if (category !== undefined) {
    query += "`category` = ?, ";
    params.push(category);
  }
  if (price !== undefined) {
    query += "`price` = ?, ";
    params.push(price);
  }
  if (description !== undefined) {
    query += "`description` = ?, ";
    params.push(description);
  }
  if (img !== undefined) {
    query += "`img` = ?, ";
    params.push(img);
  }
  // Nếu không có trường nào để cập nhật
  if (params.length === 0) {
    return res.status(400).json({ message: "Không có dữ liệu để cập nhật" });
  }
  // Xóa dấu phẩy cuối cùng và thêm điều kiện WHERE
  query = query.slice(0, -2);
  query += " WHERE `id` = ?";
  params.push(productId);
  // Thực hiện truy vấn cập nhật
  db.query(query, params, (error, results) => {
    if (error) {
      console.error("Lỗi truy vấn: ", error);
      return res.status(500).json({ error: "Lỗi truy vấn" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại" });
    }
    res.status(200).json({ message: "Sản phẩm đã được cập nhật" });
  });
});
app.delete("/products/:id", (req, res) => {
  const productId = req.params.id;
  db.query(
    "DELETE FROM products WHERE id = ?",
    [productId],
    (error, results) => {
      if (error) {
        console.error("Lỗi truy vấn: ", error);
        return res.status(500).json({ error: "Lỗi truy vấn" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Sản phẩm không tồn tại" });
      }
      res.status(200).json({ message: "Sản phẩm đã được xóa" });
    }
  );
});

// Route for Categories
app.get('/category', (req, res) => {
  const sql = 'SELECT * FROM category';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

app.post('/category', (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: 'Tên danh mục là bắt buộc' });
  }
  
  const sql = 'INSERT INTO category (name) VALUES (?)';
  
  db.query(sql, [name], (err, results) => {
    if (err) {
      console.error('Lỗi khi thực thi truy vấn: ', err);
      res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
      return;
    }
    res.status(201).json({ id: results.insertId, name });
  });
});

app.put('/category/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: 'Tên danh mục là bắt buộc' });
  }
  
  const sql = 'UPDATE category SET name = ? WHERE id = ?';
  
  db.query(sql, [name, id], (err, results) => {
    if (err) {
      console.error('Lỗi khi thực thi truy vấn: ', err);
      res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
      return;
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Danh mục không tìm thấy' });
    }
    res.json({ id, name });
  });
});

app.delete('/category/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM category WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Lỗi khi thực thi truy vấn: ', err);
      res.status(500).json({ message: 'Lỗi máy chủ nội bộ' });
      return;
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Danh mục không tìm thấy' });
    }
    res.status(204).send(); // Không có nội dung
  });
});


app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (error, results) => {
    if (error) {
      console.error('Error executing query: ', error);
      res.status(500).json({ message: 'Failed to register user' });
    } else {
      res.status(201).json({ message: 'User registered successfully' });
    }
  });
});

// login
app.post('/login', (req, res) => {
  const { name, password } = req.body || {};
  if (!name || !password) {
    return res.status(400).json({ message: 'Name and password are required' });
  }
  const sql = 'SELECT * FROM user WHERE name = ? AND password = ?';

  db.query(sql, [name, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Incorrect name or password' });
    }

    const user = results[0];
    const { id, email, address } = user;

    res.status(200).json({
      message: 'Login successful',
      id,
      name,

      email,

    });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
