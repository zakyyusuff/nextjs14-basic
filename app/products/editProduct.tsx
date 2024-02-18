'use client';

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
    id: number;
    name: string;
    price: number;
};

export default function EditProduct(product: Product) {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    
    const router = useRouter();
    
    async function handleEdit(e: SyntheticEvent){
        e.preventDefault();
        setIsMutating(true);
        await fetch(`http://localhost:5000/products/${product.id}`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name, 
                price: price,
            }),
        });
        setIsMutating(false);
        router.refresh();
        setModal(false);
    }

    function handleChange() {
        setModal(!modal);
    }
    
    return (
        <div> 
            <button className="btn btn-info btn-sm" onClick={handleChange}>Edit</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit {product.name}</h3>
                    <form onSubmit={handleEdit}>
                        <div className="form-control">
                            <label  className="label font-bold">Name</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="" id="" 
                            className="input w-full input-bordered" placeholder="Product Name"/>
                        </div>
                        <div className="form-control">
                            <label  className="label font-bold">Price</label>
                            <input type="text" value={price} onChange={(e) => setPrice(Number(e.target.value))}
                             name="" id="" className="input w-full input-bordered" placeholder="Price"/>
                        </div>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleChange}>close</button>
                            {!isMutating ? (
                               <button type="submit" className="btn btn-primary">edit</button> 
                            ):(
                                <button type="button" className="btn loading">Editing...</button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}