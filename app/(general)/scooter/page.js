import 'bootstrap/dist/css/bootstrap.css'
import ScooterCard from '../components/ScooterCard'
import ScooterTop from '../components/ScooterTop'
import SearchNav from '../components/SearchNav'

async function getTopProducts() {
    const res = await fetch('http://localhost:4000/products?destacado=1', {next: { revalidate: 3600 }})

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

async function getProducts(precio) {
    let res

    // Comprobar que precio no sea nulo
    if(precio) res = await fetch('http://localhost:4000/products?precio_lte=' + precio)
    else res = await fetch('http://localhost:4000/products')

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Scooter({ searchParams }) {
    const products = await getProducts(searchParams.precio)
    const topProducts = await getTopProducts()
    //console.log(searchParams)
    //console.log(products)
    //console.log(topProducts)

    return (
        <>
            <SearchNav/>
            {/* CONTENIDO */}
            <div className="container mb-5 mt-5">
                <h2>Scooters ({products.length}) </h2>
                <div className="grid">
                    <div className="row mt-3">
                        <div className="col-8">
                            {/*DESTACADOS TARJETAS*/}
                            <div className="d-flex p-2 flex-wrap justify-content-between">
                                {
                                    products.map(product => (
                                        <ScooterCard key={product.id} img={product.img} modelo={product.modelo} txt={product.txt} id={product.id} />
                                        )
                                    )
                                }
                            </div>
                        </div>
                        <div className="col-4">
                            {/*DESTACADOS APILADOS*/}
                            <div className="card">
                                <div className="card-header">
                                    <h4>Top</h4>
                                </div>
                                <ul className="list-group list-group-flush">
                                    {
                                        topProducts.map(topProduct=>(
                                                <ScooterTop key={topProduct.id} modelo={topProduct.modelo} precio={topProduct.precio}/>
                                            )
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* CONTENIDO */}
        </>

    )
}