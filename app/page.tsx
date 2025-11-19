"use client";
// import {Textarea} from "@mui/joy";
import {Button, FormHelperText, TextField} from "@mui/material";
import {FormEvent, useState} from "react";
// import {AliasProp} from "@/types/AliasProp";
import createNewAlias from "@/lib/createNewAlias";
import Header from "@/components/Header";


export default function Home() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [newUrl, setNewUrl] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setNewUrl("");
        try{
            const res = await createNewAlias(url, alias);
            const resURL = `${window.location.origin}/${res.alias}`;

            if (encodeURIComponent(res.alias) !== res.alias) {
                setError("Invalid alias: You may only use valid URL characters");
            }

            setNewUrl(resURL);
        }catch(err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Unable to create new alias");
            }
        }

        // createNewAlias(url, alias)
        //     .then((newAlias) => append(newAlias))
        //     .catch((err) => console.error(err));
    }

    return (
        <div className={`min-h-screen flex flex-col items-center font-serif`}>
            <Header/>
            <div className={`flex flex-1 justify-center bg-green-100 w-full`}>
                <form
                    className={`w-130 rounded-xl p-6 bg-green-200 !m-15 h-1/2`}
                    onSubmit={handleSubmit}
                >
                    <p className={`text-center font-bold text-xl`}>URL Shortener</p>
                    <TextField
                        variant="outlined"
                        sx={{backgroundColor: "white", width: "100%", marginY: "2%"}}
                        label="Url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        sx={{backgroundColor: "white", width: "100%", marginY: "2%"}}
                        label="Alias"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                    />

                    <div className="w-full flex justify-center">
                        <Button
                            sx={{width: "80px", marginY: "2%"}}
                            variant="contained"
                            type="submit"
                            disabled={url === "" || alias === ""}
                        >
                            Create
                        </Button>
                    </div>
                    {error && (
                        <p className={`text-red-700 font-semibold text-m text-center`}>{error}</p>
                    )}
                    {newUrl && (
                        <div className={`bg-white p-3 rounded-md`}>
                            <p className={`font-semibold text-center`}>Shortened URL:</p>
                            <p className={`text-blue-700 text-center`}>{newUrl}</p>
                            <div className="w-full flex justify-center">
                                <Button
                                    variant="outlined"
                                    sx={{ marginTop: "2%" , alignItems: "center" }}
                                    onClick={() => navigator.clipboard.writeText(newUrl)}
                                >
                                    Copy
                                </Button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
  // return (
  //   <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
  //
  //   </div>
  // );
}
