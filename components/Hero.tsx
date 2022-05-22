export const Hero = () => {
  return (
    <section className="h-[calc(100vh_-_80px)] max-h-[550px] bg-primary ">
      <div className="centered-container flex h-full items-center md:justify-between">
        <div className="space-y-5">
          <h1 className="max-w-xl font-serif text-6xl">
            <span className="underline">Medium</span> is a place to write, read
            and connect
          </h1>
          <p className="sm text-lg font-semibold">
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </p>
        </div>
        <div className=" hidden font-serif text-[250px] font-bold md:ml-12 md:block  lg:text-[300px]">
          M
        </div>
      </div>
    </section>
  )
}
