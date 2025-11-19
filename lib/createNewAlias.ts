"use server";
import getCollection, {URL_COLLECTION} from "@/db";
import { AliasProp } from "@/types/AliasProp";

export default async function createNewAlias(
    url: string,
    alias: string,
): Promise<AliasProp | { error: string }> {
    console.log("Creating new alias");

    try {
        const validation = await fetch(url);
    } catch (err) {
        return {error:"Invalid url"};
    }

    const urlCollection = await getCollection(URL_COLLECTION);

    const oldAlias = await urlCollection.findOne({ alias });
    if (oldAlias) {
       return {error: "Alias already exists"};
    }

    const p = {
        alias: alias,
        url: url,
    };

    const res = await urlCollection.insertOne({...p});

    if (!res.acknowledged){
        return {error: "DB insert failed"};
    }

    //get id from DB (also next week)
    return p;
    // return {...p, id: "newId"};
}