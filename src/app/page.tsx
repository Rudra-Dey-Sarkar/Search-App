import SearchButton from "../../components/SearchButton/SearchButton";

export default function Home() {
  return (
    <div className="flex w-[100vw] h-[100vh] justify-center items-center">
      <div className="grid gap-y-10 justify-center items-center">
        <div>
        <p className="font-semibold text-[30px]">Find The Latest Tech Blogs</p>
        <p className="font-[600] text-[15px]">Search with key words like C, C++, Java Etc.</p>
        </div>
        <SearchButton />
      </div>

    </div>

  );
}
