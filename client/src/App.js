import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import './App.css'


const CommentCard = ({ comment }) => {
  return (
    <>
      <p>{comment.text}</p>
    </>
  )
}

const InventoryItem = ({ item, order }) => {

  let [stockCount, setStockCouint] = useState(item.stock)

  const handlePlus = () => {
    setStockCouint(stockCount += 1)
    updateStock()
  }

  const handleMinus = () => {
    if (stockCount === 0) return
    setStockCouint(stockCount -= 1)
    updateStock()
  }

  const updateStock = async () => {
    try {
      const { data } = await axios.put(`http://localhost:4000/inventory/${item.id}`,
        { stock: stockCount }
      )
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='border inventoryCard'>
      <div className='border'>
        <h1>{order}. {item.name}</h1>
        <p>{item.description}</p>
        <button>Edit</button>
      </div>
      <div className='border inline'>
        <p>Stock: {stockCount}</p>
        <button onClick={handlePlus}>+</button><button disabled={stockCount <= 0} onClick={handleMinus}>-</button>
      </div>
      {item.comments.length > 0 ? item.comments.map((comment, i) => <CommentCard key={i} comment={comment} />)
        :
        'No Comments'
      }
    </div>
  )
}

const InventoryList = () => {

  const [invetoryList, setInventory] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    const getInventory = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/inventory')
        setInventory(data)
        console.log(data)
      } catch (err) {
        console.log(err)
        setIsError(true)
      }
    }
    getInventory()
  }, [])


  return (
    <>
      {isError ? 'There was an issue...'
        :
        invetoryList ? invetoryList.map((item, i) => {
          return (
            <InventoryItem item={item} key={i} order={i + 1} />
          )
        }) : 'Laoding...'}
    </>
  )
}


const App = () => {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<InventoryList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

