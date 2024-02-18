import AddProduct from "./addproduct";
import DeleteProduct from "./deleteProduct";
import EditProduct from "./editProduct";
// import editProduct from "./editProduct";

type Product = {
    id: number;
    name: string;
    price: number;
};

async function getProducts() {
    const response = await fetch('http://localhost:5000/products', 
        {cache: 'no-store',}
    );
    return response.json();
}

export default async function ProductList() {
    const products: Product[] = await getProducts();
    return (
        <div className="py-10 px-10"> 
        <div className="py-2">
            <AddProduct/>
        </div>
            <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td  className="flex">
                                <EditProduct {...product} />
                                <DeleteProduct {...product} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table> 
        </div>
    );
}