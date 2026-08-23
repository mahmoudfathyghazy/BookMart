import { Fragment } from "react";
import { EditFormTable } from "./EditFormTable";
import { useState } from "react";
export function ProductsTable ({products , setProducts}){
    let [index , setIndex] = useState(0);

    function deleteProduct(index){
        let temp = [...products];
        temp.splice(index,1);
        localStorage.setItem('products',JSON.stringify(temp));
        setProducts(temp);
    }

    if (products.length > 0){
        return(
            <>
                <table className="table table-hover align-middle mb-0">
                    <thead>
                        <tr className="bg-light">
                            <th
                                scope="col"
                                className="text-uppercase small fw-semibold text-secondary py-3 px-3"
                            >
                                Product
                            </th>
                            <th
                                scope="col"
                                className="text-uppercase small fw-semibold text-secondary py-3"
                            >
                                Category
                            </th>
                            <th
                                scope="col"
                                className="text-uppercase small fw-semibold text-secondary py-3"
                            >
                                Price
                            </th>
                            <th
                                scope="col"
                                className="text-uppercase small fw-semibold text-secondary py-3"
                            >
                                Stock
                            </th>
                            <th
                                scope="col"
                                className="text-uppercase small fw-semibold text-secondary py-3"
                            >
                                Featured
                            </th>
                            <th
                                scope="col"
                                className="text-uppercase small fw-semibold text-secondary py-3"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {   
                            products.map((product , index)=>{
                                return(
                                    <Fragment key={index}>
                                        <tr className="border-top border-dark-subtle" >
                                            <td className="px-3 py-2">
                                                <div className="d-flex align-items-center gap-2">
                                                    <img
                                                        src= {product.imageURL}
                                                        alt={product.productNameEn}
                                                        className="rounded-2 bg-light"
                                                        width="36"
                                                        height="36"
                                                    />
                                                    <span className="fw-semibold text-dark">
                                                        {product.productNameEn}
                                                    </span>
                                                </div>
                                            </td>
                
                                            <td className="text-secondary">
                                                {product.category}
                                            </td>
                
                                            <td>
                                                <span className="text-primary fw-semibold">
                                                    {product.price} EGP
                                                </span>
                                            </td>
                
                                            <td>
                                                <span className="badge rounded-pill bg-success-subtle text-success px-2 py-1">
                                                    {product.stock}
                                                </span>
                                            </td>
                
                                            <td>
                                                <span className="text-warning fs-5">
                                                    {product.featured ? "⭐" : ""}
                                                </span>
                                            </td>
                
                                            <td>
                                                <a href="#" 
                                                className="text-primary text-decoration-none small me-2" 
                                                data-bs-toggle="modal" 
                                                data-bs-target="#exampleModal"
                                                onClick={() =>setIndex(index)}
                                                >
                                                    Edit
                                                </a>
                                                <a href="#" 
                                                className="text-danger text-decoration-none small"
                                                onClick={() => deleteProduct(index)}
                                                >
                                                    Delete
                                                </a>
                                            </td>
                                        </tr>
                                        
                                    </Fragment>
                
                                    );
                                })
                            }
                    </tbody>
                </table>
                <EditFormTable 
                    setProducts = {setProducts}
                    index = {index}
                    products={products}
                />
            </>
        );
    }if(products == []){
        <tr className="border-top border-dark-subtle"></tr>
    }
}