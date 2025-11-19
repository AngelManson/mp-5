"use server";
import getCollection, {URL_COLLECTION} from "@/db";
import { AliasProp } from "@/types/AliasProp";

export default async function createNewAlias(
    url: string,
    alias: string,
): Promise<AliasProp> {
    console.log("Creating new alias");

    try {
        const validation = await fetch(url);
    } catch (err) {
        throw new Error("Invalid url");
    }

    const urlCollection = await getCollection(URL_COLLECTION);

    const oldAlias = await urlCollection.findOne({ alias });
    if (oldAlias) {
        throw new Error("Alias already exists");
    }

    const p = {
        alias: alias,
        url: url,
    };

    const res = await urlCollection.insertOne({...p});

    if (!res.acknowledged){
        throw new Error("DB insert failed");
    }

    //get id from DB (also next week)
    return p;
    // return {...p, id: "newId"};
}