'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
    id: number;
    name: string;
    price: number;
};

export default function DeleteProduct(product: Product) {
    const [modal, setModal] = useState(false);
    const [isMutating, setIsMutating] = useState(false);
    
    const router = useRouter();
    
    async function handleDelete(productId: number){
        setIsMutating(true);

        await fetch(`http://localhost:5000/products/${productId}`, {
            method: 'DELETE',
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
            <button className="btn btn-error btn-sm" onClick={handleChange}>delete</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Are U sure delete this data {product.name} ?</h3>
                        <div className="modal-action">
                            <button type="button" className="btn" onClick={handleChange}>close</button>
                            {!isMutating ? (
                               <button type="button" onClick={() => handleDelete(product.id)} className="btn btn-primary">delete</button> 
                            ):(
                                <button type="button" className="btn loading">deleting...</button>
                            )}
                        </div>
                </div>
            </div>
        </div>
    )
}