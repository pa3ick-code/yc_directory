import SearchForm from "@/components/SearchForm";

export default async function Home({searchParams}: {searchParams: Promise<{ query?: string}>}) {
  const query = (await searchParams).query
  return (
    <>
      <section className="pink_container">
        <div className="heading">Pitch your startup, <br /> connect with entrepreneurs</div>
        <p className="sub-heading !max-w-2xl">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions</p>

        <SearchForm query={query}/>
      </section>
    </>
  );
}
