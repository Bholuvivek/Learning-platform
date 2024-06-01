import { useEffect, useState } from 'react';
import { userRights } from '../TypeDefinition/Rights';



export const useAccessControl= (userRole, requiredRight) => {
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        if (userRole && userRights[userRole]) {
            setHasAccess(userRights[userRole].includes(requiredRight));
        } else {
            setHasAccess(false);
        }
    }, [userRole, requiredRight]);

    return hasAccess;
};
