import Statistics from "@/components/Statistics";
import UploadDocument from "@/components/UploadDocument";
import UploadExplainer from "@/components/UploadExplainer";

export default function Home() {
  return (
    <main className="main-container">
      <section className="w-full h-full p-10">
        <div className="w-full bg-white shadow-sm rounded-[20px] h-fit px-10 py-5 grid lg:grid-cols-2 justify-items-end">
          <UploadExplainer />
          <UploadDocument />
        </div>
      </section>

      <section className="w-full h-full">
        <Statistics />
      </section>
    </main>
  );
}
