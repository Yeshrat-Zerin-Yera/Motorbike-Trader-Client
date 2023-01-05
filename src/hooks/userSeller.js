import { useEffect, useState } from "react";

const useSeller = email => {
    // Set Is Seller
    const [isSeller, setIsSeller] = useState('');
    // Set Is Seller Loading
    const [isSellerLoading, setIsSellerLoading] = useState(true);

    // Get User's Role Using Email
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/users/role/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsSeller(data?.role);
                    setIsSellerLoading(false);
                })
        }
    }, [email]);

    return [isSeller, isSellerLoading];
};

export default useSeller;