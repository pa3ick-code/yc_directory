import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from 'next/image';

import UserStartups from "@/components/UserStartups";
import { Suspense } from "react";
import { StartupCardSkeleton } from "@/components/StartupCard";

export const experimental_ppr = true;

const page = async({ params }: { params: Promise<{ id: string }> }) => {
    const id = (await params).id;
    const session = await auth();

    const user = await client.fetch(AUTHOR_ID_QUERY, {id});
    if(!user){ return notFound() }
  return (
    <>
        <section className="profile_container">
            <div className="profile_card">
                <div className="profile_title">
                    <h3 className="text-24-black uppercase text-center line-clamp-1">
                        {user.name}
                    </h3>
                </div>

                <Image 
                    src={user.image}
                    alt={user.image}
                    width={220}
                    height={220}
                    className="profile_image"
                />

                <p className="text-30-extrabold mt-7 text-center">
                    @{user?.name}
                </p>
                <p className="mt-1 text-14-normal text-center">
                    {user?.bio}
                </p>
            </div>

            <div className="flex flex-1 flex-col gap-5 lg:mt-1">
                <p className="text-30-bold">
                    {session?.id === id? `Your` : 'All'} Startups
                </p>
                <ul className="card_grid-sm">
                    <Suspense fallback={<StartupCardSkeleton />}>
                        <UserStartups id={id} />
                    </Suspense>
                </ul>
            </div>
        </section>
    </>
  )
}

export default page