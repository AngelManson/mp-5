
import {redirect} from "next/navigation";
import getURLByAlias from "@/lib/getURLByAlias";

export default async function AliasPage({params} : {params: Promise<{alias:string}>}){
    const {alias} = await params;

    let url = null;

    try{
        url = await getURLByAlias(alias);
    } catch(err){
        console.log("This error occurred: ", err);
        redirect("/");
    }

    if (!url){
        redirect("/");
    }

    return redirect(url.toString());
}