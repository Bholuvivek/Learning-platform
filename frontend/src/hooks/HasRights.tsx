
import { useEffect, useState } from "react";
import { useOne } from './useOne';

interface HasAcces {
  permission: number[];
  children: React.ReactNode;
}

const HasRight :React.FC<HasAcces> = (props) => {
  const { children, permission,  } = props;

  const [hasAccess, setHasAccess] = useState<boolean>(false);

  const { data, status } = useOne();
  const isSuccess = status.isSuccessful;
  const permisions = data.data.permissions;

  useEffect(() => {
    if (isSuccess) {
      if (permission && permisions && permisions.length > 0) {
        const insertSection = permisions.filter((value) => permission.includes(value.id));
        if (insertSection.length > 0) setHasAccess(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  if (hasAccess) {
    return <div>{children}</div>;
  }

 

  return null
      

};


export default HasRight;
