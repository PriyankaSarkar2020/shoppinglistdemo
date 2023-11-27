import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Dropdown, Button, ListGroup} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import categoriesData from "./ShoppingList.json";

interface Item{
  id: number;
  name: string;
  category: string;
}

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [newItem, setNewItem] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [style, setStyle] = useState({display: 'none'});
   const totalCount = items.length;
 useEffect(() => {
  setCategories(categoriesData.categories);

 }, []);

 const handleAddItem = () => {
  if (newItem && selectedCategory) {
    setItems((prevItems) => [
      ...prevItems,	
      {id: Date.now(), name: newItem, category: selectedCategory}
  ]);
  setNewItem("");
  }
 };
 const handleDeleteItem =(id: number) => {
  setItems((prevItems) => prevItems.filter((item)=> item.id !== id));
 };


  return (
    <div className="App">
     <Container>
        <h1>Shopping List</h1>
        <Row>
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
               {selectedCategory || "Select Category"}
               </Dropdown.Toggle>
              <Dropdown.Menu>
                {categories.map((category) => (
                <Dropdown.Item key={category} onClick={() => setSelectedCategory(category)}>{category}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
              </Dropdown>
              <input type="text" placeholder="Add Item" value={newItem} onChange={(e) => setNewItem(e.target.value)}></input>
              <Button variant="primary" onClick={handleAddItem}>Add Item</Button>
            
          </Col>
        </Row>
        <Row>
          <Col>
          {categories.map((category) => (
            <ListGroup key={category}>
              <ListGroup.Item variant="info">
              {category}
              </ListGroup.Item>
              {items.filter((item) => item.category === category).map((item) => (              
              <ListGroup.Item key={item.id} onMouseEnter={e => {setStyle({display: 'inline'});}} onMouseLeave={e => {setStyle({display: 'none'})}}>
               
                <span>{item.name}</span>
                <Button variant="danger" style={style} onClick={() => handleDeleteItem(item.id)} >Delete</Button>
              </ListGroup.Item>
              ))}
            </ListGroup>
           ))}
          </Col> 
                
        </Row>
        <Row>
          
        <Col md={2}>Total Number of Items</Col> 
        <Col md={2}>{totalCount}</Col> 
          
        </Row>
     </Container>
    </div>
  );
}

export default App;
