import Image from "next/image";

export default function HomeHero() {
  return (
    <section className="bg-black">
      <div className="relative mx-auto min-h-[650px] w-full overflow-hidden md:aspect-video md:min-h-0 md:max-w-[1600px]">

        {/* Imagen de fondo */}
        <Image
          src="/images/bg-inicio.png"
          alt="Rick y Morty frente a un paisaje del multiverso"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1600px) 100vw, 1600px"
          className="object-cover object-center"
        />

        {/* Degradado para escritorio */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-black/90 via-black/60 to-transparent md:block" />

        {/* Degradado para móvil */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/95 md:hidden" />

        {/* ========================= */}
        {/* CONTENIDO */}
        {/* ========================= */}

        <div
          className="
            absolute z-10
            left-1/2 top-[52%]
            w-[88%]
            -translate-x-1/2 -translate-y-1/2
            text-center

            md:left-[6%] md:top-1/2
            md:w-[40%]
            md:translate-x-0
            md:-translate-y-1/2
            md:text-left
          "
        >
          {/* Logo */}
          <Image
            src="/images/logo.svg"
            alt="Rick and Morty"
            width={700}
            height={300}
            priority
            className="
              mx-auto h-auto w-[90%]
              md:mx-0 md:w-full
            "
          />

          {/* Subtítulo */}
          <p
            className="
              mt-4
              text-[clamp(0.8rem,4vw,1.4rem)]
              font-bold uppercase
              tracking-[0.15em]
              text-brand-lime
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]
            "
          >
            Explorador del multiverso
          </p>

          {/* Descripción */}
          <p
            className="
              mx-auto mt-3 max-w-[550px]
              text-sm leading-relaxed
              text-zinc-200
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]

              md:mx-0
              md:text-[clamp(0.7rem,1.1vw,1rem)]
            "
          >
            Prepárate para viajar entre dimensiones, conocer personajes
            increíbles y descubrir los lugares más extraños del universo
            de Rick y Morty.
          </p>

          {/* Botón */}
          <a
            href="/characters"
            className="
              mt-6 inline-flex
              items-center gap-2
              rounded-full
              border-2 border-brand
              bg-black/60
              px-6 py-3
              text-sm font-bold
              text-brand
              backdrop-blur-sm
              transition
              duration-300
              hover:scale-105
              hover:bg-brand
              hover:text-black
            "
          >
            Comenzar a explorar
            <Image
              src="/images/dimension.png"
              alt="Rick y Morty"
              width={45}
              height={45}
              className="h-10 w-auto object-contain"
            />
          </a>
        </div>
      </div>
    </section>
  );
}