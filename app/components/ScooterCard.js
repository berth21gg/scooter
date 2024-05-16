export default function ScooterCard({img, modelo, txt}) {
    return (
        <div className="card mb-2" style={{ width: "15rem" }}>
            <img
                src={"./img/" + img}
                className="card-img-top p-4"
                alt="..."
            />
            <div className="card-body">
                <h5 className="card-title">{modelo}</h5>
                <p className="card-text text-truncate">
                    {txt}
                </p>
                <a href="product.html" className="btn btn-primary">
                    Más Info
                </a>
            </div>
        </div>
    )
}