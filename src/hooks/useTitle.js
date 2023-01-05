import { useEffect } from 'react';

const useTitle = title => {
    useEffect(() => {
        document.title = `Motorbike Trader ${title}`;
    }, [title]);
};

export default useTitle;