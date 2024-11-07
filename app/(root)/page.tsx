import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({searchParams}: {searchParams: Promise<{ query?: string}>}) {
  const query = (await searchParams).query;
  const posts = [
    {
      _createdAt: new Date(),
      id: 1,
      views:  55,
      title: "We Robots",
      category: "Robots",
      description: "We robots are here to help you",
      image: "https://images.unsplash.com/photo-1634912314704-c646c586b131?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      author: { _id: 1, name: "Patrick" }
    }
  ]

  return (
    <>
      <section className="pink_container">
        <div className="heading">Pitch your startup, <br /> connect with entrepreneurs</div>
        <p className="sub-heading !max-w-2xl">Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Competitions</p>

        <SearchForm query={query}/>
      </section>

      {/* startups section */}
      <section className="section_container">
        <p className="text-30-semibold">
          {query?  `Search results for "${query}"`: 'All Startups'}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post) => (
              <StartupCard  key={post.id} post={post} />
            ))
          ):
          (
            <p className="no-results">No Startup Found</p>
          )}
        </ul>
      </section>
    </>
  );
}
