import { Link , useNavigate} from "react-router-dom"
import {useEffect} from 'react';
export function NewProductForm({setProducts}){
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('products')){
            localStorage.setItem('products',JSON.stringify([]));
        }
    },[]);
    

    let temp = {};

    // 2. Use a single dynamic handler for all inputs
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        temp[name] =  (type === "checkbox" ? checked : value);
    };

    const addNewProduct = (event) => {

        
        event.preventDefault();
        
        if(!localStorage.getItem('products')){
            localStorage.setItem('products',JSON.stringify([]));
        }

        let currentProducts = JSON.parse(localStorage.getItem('products'));
        currentProducts.push(temp);
        localStorage.setItem('products', JSON.stringify(currentProducts));
        setProducts(currentProducts);
        navigate('/')
        
    };
    return(
        <div className="container bg-white border rounded-4 p-4 mt-5">
            <h3 className="fw-semibold mb-4">Add New Product</h3>

            <form onSubmit={addNewProduct}>
                {/* Product Names */}
                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <label htmlFor="productNameEn" className="form-label fw-semibold">
                            Product Name (EN) *
                        </label>

                        <input
                            onChange={handleChange}
                            type="text"
                            id="productNameEn"
                            name="productNameEn"
                            className="form-control bg-light"
                            placeholder="e.g. Blue Ballpoint Pen"
                            value={temp.productNameEn}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label
                            htmlFor="productNameAr"
                            className="form-label fw-semibold"
                        >
                            اسم المنتج (عربي) *
                        </label>

                        <input
                            onChange={handleChange}
                            type="text"
                            id="productNameAr"
                            name="productNameAr"
                            className="form-control bg-light text-end"
                            placeholder="مثال: قلم جاف أزرق"
                            dir="rtl"
                            value={temp.productNameAr}
                            required
                        />
                    </div>
                </div>

                {/* English Description */}
                <div className="mb-4">
                    <label
                        htmlFor="descriptionEn"
                        className="form-label fw-semibold"
                    >
                        Description (EN)
                    </label>

                    <textarea
                        onChange={handleChange}
                        id="descriptionEn"
                        name="descriptionEn"
                        className="form-control bg-light"
                        rows="3"
                        placeholder="Product description..."
                        value={temp.descriptionEn}
                    ></textarea>
                </div>

                {/* Arabic Description */}
                <div className="mb-4">
                    <label
                        htmlFor="descriptionAr"
                        className="form-label fw-semibold"
                    >
                        الوصف (عربي)
                    </label>

                    <textarea
                        onChange={handleChange}
                        id="descriptionAr"
                        name="descriptionAr"
                        className="form-control bg-light text-end"
                        rows="3"
                        placeholder="وصف المنتج..."
                        dir="rtl"
                        value={temp.descriptionAr}
                    ></textarea>
                </div>

                {/* Price / Stock / Rating */}
                <div className="row g-3 mb-4">
                    <div className="col-md-4">
                        <label
                            htmlFor="price"
                            className="form-label fw-semibold"
                        >
                            Price (EGP) *
                        </label>

                        <input
                            onChange={handleChange}
                            type="number"
                            id="price"
                            name="price"
                            className="form-control bg-light"
                            placeholder="0"
                            min="0"
                            value={temp.price}
                            required
                        />
                    </div>

                    <div className="col-md-4">
                        <label
                            htmlFor="stock"
                            className="form-label fw-semibold"
                        >
                            Stock *
                        </label>

                        <input
                            onChange={handleChange}
                            type="number"
                            id="stock"
                            name="stock"
                            className="form-control bg-light"
                            placeholder="0"
                            min="0"
                            value={temp.stock}
                            required
                        />
                    </div>

                    <div className="col-md-4">
                        <label
                            htmlFor="rating"
                            className="form-label fw-semibold"
                        >
                            Rating (1-5) *
                        </label>

                        <input
                            onChange={handleChange}
                            type="number"
                            id="rating"
                            name="rating"
                            className="form-control bg-light"
                            value={temp.rating}
                            min="1"
                            max="5"
                            step="0.1"
                            required
                            
                        />
                    </div>
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label
                        htmlFor="category"
                        className="form-label fw-semibold"
                    >
                        Category *
                    </label>

                    <select
                        onChange={handleChange}
                        id="category"
                        name="category"
                        className="form-select bg-light"
                        value={temp.category}
                        required
                    >
                        <option value="Stationery" defaultValue >Stationery</option>
                        <option value="Notebooks & Paper">
                            Notebooks &amp; Paper
                        </option>
                        <option value="Books">Books</option>
                        <option value="Accessories">Accessories</option>
                    </select>
                </div>

                {/* Image URL */}
                <div className="mb-3">
                    <label
                        htmlFor="imageUrl"
                        className="form-label fw-semibold"
                    >
                        Image URL
                    </label>

                    <input
                        onChange={handleChange}
                        type="url"
                        id="imageURL"
                        name="imageURL"
                        className="form-control bg-light"
                        placeholder="https://images.unsplash.com/..."
                        value={temp.imageURL}
                    />
                </div>

                {/* Featured */}
                <div className="form-check mb-4">
                    <input
                        onChange={handleChange}
                        className="form-check-input"
                        type="checkbox"
                        id="featured"
                        name="featured"
                        value={temp.featured}
                    />

                    <label
                        className="form-check-label fw-semibold"
                        htmlFor="featured"
                    >
                        ⭐ Featured Product
                    </label>
                </div>

                {/* Buttons */}
                <div className="d-flex gap-3">
                    
                        <button
                            type="submit"
                            className="btn btn-primary fw-semibold flex-grow-1 py-2"
                        >
                            Add Product
                        </button>
                        <Link to="/" 
                        className="btn btn-outline-secondary px-4 py-2"
                        >
                            Cancel
                        </Link> 
                </div>
            </form>
        </div>
    )
}