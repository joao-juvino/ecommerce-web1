import { ShoppingCart } from "lucide-react";

export default function Home() {
  return (
    <>
      <header className="w-full bg-[#ffe600]">
        <nav className="flex py-2 px-100 justify-center items-center gap-10">
          <div className="h-20 w-20">
            <img className="w-full h-full cover" src="/img/logo.png"/>
          </div>
          <input className="grow-1 bg-white px-7 py-3" type="search" placeholder="pesquisar"/>
          <ul className="flex gap-10">
            <li className="flex items-center"><ShoppingCart /></li>
            <li className="bg-white text-gray-800  py-3 px-6">Login</li>
          </ul>
        </nav>
      </header>
      <section>
        <div>
          <div className="!w-70 w-100 flex flex-col items-center">
            <div className="h-70 w-70">
              <img src="/img/watch.png" className="w-full h-full cover" />
            </div>
            <p className="text-gray">Samsumg smart watch</p>
          </div>
        </div>
      </section>
    </>
  );
}
