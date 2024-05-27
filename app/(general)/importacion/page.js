import 'bootstrap/dist/css/bootstrap.css'
import ScooterCardImportacion from '../components/ScooterCardImportacion';


// Parametos de RapidApi
const url = 'https://aliexpress-datahub.p.rapidapi.com/item_search?q=scooter&page=1&sort=salesDesc&locale=es_ES&region=ES';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'e3c19ec2d6msh8474797d3d63634p1bf81bjsn8ac7e089136f',
        'x-rapidapi-host': 'aliexpress-datahub.p.rapidapi.com'
    }
};

async function getProducts() {
    const res = await fetch(url, options)

    if(!res.ok){
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

// Descripción

export default async function Importacion() {
    const productsJson = await getProducts()
    const products = productsJson.result.resultList

    return (
        <>
            {/* CONTENIDO */}
            <div className="container contPrincipal mb-5">
                <h2>Scooters ({products.length}) </h2>
                <div className="grid">
                    <div className="row mt-3">
                        <div className="col-8">
                            {/*DESTACADOS TARJETAS*/}
                            <div className="d-flex p-2 flex-wrap justify-content-between">
                                {
                                    products.map(product => (
                                        <ScooterCardImportacion key={product.item.id} img={product.item.image} modelo="Desconocido" txt={product.item.title} id={product.item.itemId} />
                                    )
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* CONTENIDO */}
        </>

    )
}