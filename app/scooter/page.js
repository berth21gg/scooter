import 'bootstrap/dist/css/bootstrap.css'
import ScooterCard from '../components/ScooterCard'

async function getProducts() {
    const res = await fetch('http://localhost:4000/products')

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default async function Scooter() {
    const products = await getProducts()
    console.log(products)

    return (
        <>
            {/* CONTENIDO */}
            <div className="contPrincipal container mb-5">
                <h2>Scooters ({products.length}) </h2>
                <div className="grid">
                    <div className="row mt-3">
                        <div className="col-8">
                            {/*DESTACADOS TARJETAS*/}
                            <div className="d-flex p-2 flex-wrap justify-content-between">
                                {
                                    products.map(product => (
                                        <ScooterCard key={product.id} img={product.img} modelo={product.modelo} txt={product.txt} />
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
                                    <li className="list-group-item">
                                        Xiaomi Mi Electric Scooter Pro{" "}
                                        <span className="badge text-bg-dark float-end">546 €</span>
                                    </li>
                                    <li className="list-group-item">
                                        Bongo Serie S{" "}
                                        <span className="badge text-bg-dark float-end">375 €</span>
                                    </li>
                                    <li className="list-group-item">
                                        Xiaomi Mi Electric Scooter{" "}
                                        <span className="badge text-bg-dark float-end">250 €</span>
                                    </li>
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