import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUP_QUERY } from "@/sanity/lib/queries";

export default async function Home({searchParams}: {searchParams: Promise<{ query?: string}>}) {
  const query = (await searchParams).query;
  const { data: posts } = await sanityFetch({ query: STARTUP_QUERY });

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
            posts.map((post: StartupCardType) => (
              <StartupCard  key={post._id} post={post} />
            ))
          ):
          (
            <p className="no-results">No Startup Found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </>
  );
}
