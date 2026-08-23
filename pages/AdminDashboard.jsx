import { Link } from 'react-router-dom';
import {BookMartAdmin} from '../components/BookMartAdmin'
import { ProductsTable } from '../components/ProductsTable';
export function AdminDashboard({products ,setProducts}){

    /* {
        productNameEn:'',
        productNameAr:'',
        descriptionEn: '',
        descriptionAr: '',
        price:0,
        stock:0,
        rating:0,
        category:'',
        imageURL : '',
        featured: false
    } */
    return(
        <section className="admin-dashboard">
            <BookMartAdmin />
            <div className="welcome-back-admin">
                <div className="container text-con">
                    <div>
                        <h2>
                            Admin Dashboard
                        </h2>
                        <p className="card-text"><small className="text-body-secondary">Welcom Back , Admin</small></p>
                    </div>
                    <Link className="btn btn-primary" to="/NewProductForm"><i className="fa-solid fa-plus"></i>Add Products</Link>
                </div>
                <div className="container text-center m-0 my-3">
                    <div className="row row-cols-4 justify-content-between">
                        <div className="col">
                            <div className="card bg-white">
                                <div className="card-body">
                                    This is some text within a card body.
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card bg-white">
                                <div className="card-body">
                                    This is some text within a card body.
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card bg-white">
                                <div className="card-body">
                                    This is some text within a card body.
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card bg-white">
                                <div className="card-body">
                                    This is some text within a card body.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container table-con bg-white border">  
                    <div>
                        {/* Header */}
                        <div className="d-flex justify-content-between align-items-center px-3 py-3 border-bottom">
                            <h6 className="mb-0 fw-semibold text-dark">Product Management</h6>
                        </div>

                        <div className="table-responsive">
                            {<ProductsTable products={products} setProducts = {setProducts}/>}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}