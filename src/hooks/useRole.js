import { useEffect, useState } from "react";

const useRole = email => {
    // Set User Role
    const [userRole, setUserRole] = useState('');
    // Set Is User Role Loading
    const [isUserRoleLoading, setIsUserRoleLoading] = useState(true);

    // Get User's Role Using Email
    useEffect(() => {
        if (email) {
            fetch(`https://motorbike-trader-server.vercel.app/users/role/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setUserRole(data?.role);
                    setIsUserRoleLoading(false);
                })
        }
    }, [email]);

    return [userRole, isUserRoleLoading];
};

export default useRole;