export const fetchData = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_KEY);
    const data = await response.json();
    return data;
}


