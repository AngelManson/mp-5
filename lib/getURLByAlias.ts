import getCollection, { URL_COLLECTION } from "@/db";
// import { ObjectId} from "mongodb";
import {AliasProp} from "@/types/AliasProp";

export default async function getURLByAlias(
    alias: string,
): Promise<AliasProp | null> {

    const urlCollection = await getCollection(URL_COLLECTION);

    // const oldAlias = await postsCollection.findOne({ alias });
    // if (oldAlias) {
    //     return null; //have an actual error msg show for the user
    // }

    // let newAlias;
    //
    // try {
    //     newAlias = new ObjectId(alias);
    // }catch {
    //     return null;
    // }

    // const data = await urlCollection.findOne(newAlias);
    const data = await urlCollection.findOne({alias});

    if (!data) {
        return null;
    }

    return data.url;
}