
import CountryPage from "@/app/ui/CountryPage";
import Image from "next/image"
export default async function Page({ params }) {
    const {id}= await params;
    const countryData=await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
    const country=await countryData.json();
    const data=country[0];
    console.log(data)
    return <div className="flex justify-start gap-20">
        <div>
        <h1 className="text-lg font-bold" >{data.name.official}</h1>
        <Image width={500} height={300} src={data.flags.png} alt={data.flags.alt} />
        </div>
        <div className="p-10">
            <CountryPage/>
        <p>{id}</p>

            </div>
    </div>
}



