import { Link } from "react-router-dom"
export function BookMartAdmin(){
    return(
    <div className="book-mart text-center bg-white pt-2 border-end">
        <h4>
            <span>
                <i className="fa-solid fa-b"></i>
            </span>BookMart Admin
        </h4>
        <div className="container">
            <div className="btn-con border-top">
                <Link className="rounded"><i className="fa-solid fa-chart-line"></i>Dashboard</Link>
                <Link className="rounded"> <i className="fa-solid fa-boxes-stacked"></i>Products</Link>
                <Link className="rounded" to="/NewProductForm"><i className="fa-solid fa-plus"></i>Add Products</Link>
            </div>
            <div className="btn-con border-top mt-auto">
                <Link className="rounded">Back to site</Link>
                <Link className="rounded text-danger">Log Out</Link>
            </div>
        </div>
    </div> 
       
    );
}