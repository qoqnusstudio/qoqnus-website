import Reveal from "@/components/ui/Reveal";

export default function Mission() {
  return (
    <section className="bg-gradient-to-b from-maroon-700/15 to-transparent px-6 py-28">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-2xl leading-relaxed text-ivory sm:text-3xl">
          <span className="text-gold-500">«</span>
          شرور داستان، تا زمانی شرور است که داستان را قهرمان نوشته باشد. ما
          معتقدیم باید قهرمان داستان خودمان باشیم.
          <span className="text-gold-500">»</span>
        </p>
        <p className="mt-6 text-sm tracking-widest text-gold-500">
          — حیدر صادقیان
        </p>
      </Reveal>
    </section>
  );
}
