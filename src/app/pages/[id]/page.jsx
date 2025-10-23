import CountryPage from "@/app/ui/CountryPage";
import Image from "next/image"
export default async function Page({ params }) {
    const {id}= await params;
    return <div>
        <CountryPage countryCode={id}/>
    </div>
}



