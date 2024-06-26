import { useState } from 'react'
import { products as productsObject } from './data/products'
import ImgNotSelected from './components/ImgNotSelected'
import ImgContainer from './components/ImgContainer'


function App() { 
  const [products, setProducts] = useState(productsObject)
  const [activeProduct, setActiveProduct] = useState(
    products.find(item => item.isActive)
    )
    console.log(activeProduct)

  // fetch("./src/data/products.json").then(res=>res.json()).then(res=>console.log(res.data))

  function handleProductSelect(productId) {
    const selectedProduct=productsObject.find(item => item.id===productId)
    selectedProduct.isActive = true

    setActiveProduct(selectedProduct)

    const notSelectedProducts = productsObject.filter(
      item=>item.id!==productId
    ).map(item=> {
      return {
        ...item,
        isActive: false
      }
    })
    console.log("App Not Selected Product:",notSelectedProducts)
    console.log("App Product Id:",productId)
    console.log("App Product:",selectedProduct)
    
    const newProducts = [
      ...notSelectedProducts,
      selectedProduct
    ].sort((a,b)=>a.id - b.id)
    setProducts(newProducts)

  }

  return (
    <>
      <main className="container"> 
      {
        activeProduct ? <img src={activeProduct.imgName} style={{width:750, marginBottom:5}} /> : <ImgNotSelected />
      }
      <ImgContainer products={products} handleProductSelect={handleProductSelect} />
      </main>
    </> 
  )
}

export default App
