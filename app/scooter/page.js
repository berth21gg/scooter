import 'bootstrap/dist/css/bootstrap.css'

async function getProducts() {
    const res = await fetch('http://localhost:4000/products')
   
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
  }

export default async function Scooter(){
    const products = await getProducts()
    console.log(products)

    return(
        <main className="contPrincipal">
            <h1>Scooter page</h1>
        </main>
    )
}