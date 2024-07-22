import { useState } from "react"


interface ProductCardProps {
    productName: string
    productImage: string
    description: string
    price: number
    quantity: number
    handleAddtoCart: (...arg: any) => void
}
const ProductCard: React.FC<ProductCardProps> = ({ productName, productImage, description, price, quantity, handleAddtoCart }) => {
    const [showQuantity, setShowQuantity] = useState(false)
    const [currentQuantity, setCurrentQuantity] = useState(quantity)

    const incrementQuantity = () => {
        setCurrentQuantity((currentQuantity + 1))
        handleAddtoCart(productName, productImage, price, currentQuantity + 1)
    }
    const decrementQuantity = () => {
        if (currentQuantity > 1) {
            handleAddtoCart(productName, productImage, price, currentQuantity - 1);
            return setCurrentQuantity(currentQuantity - 1)
        }
        setShowQuantity(false)
        handleAddtoCart(productName, productImage, price, 0);
    }
    return (
        <>
            <div className="w-full md:max-w-[296px] min-[1400px]:max-w-[320px] flex flex-col shadow-lg justify-between bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                <img className=" rounded-t-lg max-h-[190px] max-w-[190px] m-auto py-2" src={productImage} alt="product image" />
                <div className="px-5 pb-5">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{productName.length > 25 ? `${productName.slice(0, 25)}...` : productName}</h3>
                        <h5 className="text-sm tracking-tighter mb-4 text-gray-700 leading-5 dark:text-white">{description.length > 40 ? `${description.slice(0, 40)}...` : description}</h5>
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-800 dark:text-white">₹{price}</span>
                            {!showQuantity ? <div onClick={() => { setShowQuantity(true), handleAddtoCart(productName, productImage, price, currentQuantity) }} className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 whitespace-nowrap dark:focus:ring-blue-800">Add to cart</div>
                                : (<div className="flex gap-2 items-center">
                                    <div onClick={decrementQuantity} className="bg-blue-700 cursor-pointer px-1 text-white font-bold text-xl">-</div>
                                    <div>{currentQuantity}</div>
                                    <div onClick={incrementQuantity} className="bg-blue-700 px-1 cursor-pointer text-white font-bold text-xl">+</div>
                                </div>)}</div>

                    </div>
                </div>

            </div>

        </>
    )
}

export default ProductCard