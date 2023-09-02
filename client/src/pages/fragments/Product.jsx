import axios from "axios";
import { useLoaderData } from "react-router-dom"; 
import BreadCrumb from "../../components/Breadcrumb";
import placeholderImg from "../../pages/images/wokey-factory-WKjazStSpUg-unsplash.jpg"
import { useContext } from "react";
import CartContext from "../../CartContext";

const Product = () => { 
    const { addToCart } = useContext(CartContext); 
    const product = useLoaderData(); 
    return (
        <div className="">
            {product.map(el => (
                <div key={el._id}>
                    <BreadCrumb product={el.name}/>

                    <div className="flex flex-col items-center md:flex-row md:gap-8 md:justify-evenly m-10 md:mx-10">
                        <img className="rounded-md md:w-2/5" src={placeholderImg} width={500} />   
                        
                        <div className="space-y-2">
                            <h1 className="text-4xl my-4">{el.name}</h1>
                            <h2>{el.brand}</h2>
                            <p className="mb-6">{el.description}</p>

                            <div className="flex flex-row gap-2 my-4">
                                {el.type === "keyboard" ? el.availableColors.map(color => 
                                
                                    <div key={color}>
                                        <button className="border-solid border-2 px-4 py-2 hover:border-cyan-800">{color}</button>
                                    </div>)
                                
                                : null}

                                {el.type === "keycaps" ? el.availableKits.map(kit => 
                                    <div key={kit}>
                                        <button className="border-solid border-2 px-4 py-2 hover:border-cyan-800">{kit}</button>
                                    </div>)
                                    
                                : null}
                            </div>

                            <button onClick={()=> addToCart(el._id, el.name, el.price["$numberDecimal"])}
                            className="w-full md:w-2/5 bg-cyan-700 hover:bg-cyan-500 active:bg-cyan-900 text-stone-100 px-6 py-4 md:px-4 md:py-2 rounded-md">
                                Add to Cart
                            </button>
                        
                        </div>
                    </div> 
                </div>
                ))}
        </div>
    )
}

//loader funtion 
export const productDetailsLoader = async ({params}) => { 
    const { id } = params;  
    let response = await axios(`http://localhost:3080/products/${id}`);
    return response.data; 
}

export default Product ; 