import React, { useState } from 'react'

function Products({ success, user })
{
  const {products, setProducts} = useState({})
  
  const jwtToken = localStorage.getItem('AuthToken')

  const show = async () =>
  {
    const url = 'http://localhost:8080/products/'

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": 'application/json',
        'Authorization': jwtToken
      }
    }).then(async (response) =>
    {
      const result = await response.json()
      const {message, error, success} = result;
      

      console.log("Login Result : ", result)
      setProducts(result);

    })
    .catch((error) => {
      console.log("Error from Product page", error)
    })
  }


  return (
    <div>
      User Details will be displayed here
      <p>Username : {localStorage.getItem('username')}</p>
      <p>Email : {localStorage.getItem('email')}</p>
    </div>
  )
}

export default Products
