import Header from "@/components/Header";
import HomeComponent from "@/components/Home";


export default function Home() {

    return (
        <div className={`min-h-screen flex flex-col items-center font-serif`}>
            <Header/>
            <div className={`flex flex-1 justify-center bg-green-100 w-full`}>
                <HomeComponent/>
            </div>
        </div>
    );
  // return (
  //   <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
  //
  //   </div>
  // );
}
