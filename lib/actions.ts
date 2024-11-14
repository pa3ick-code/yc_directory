"use server"

import { auth } from "@/auth"
import { parseServerActionResponse } from "./utils";
import { writeClient } from "@/sanity/lib/write-client";
import slugify from 'slugify';

export const createPitch = async(
    state: any, 
    form: FormData, 
    pitch: string
) => {
    const session = await auth();
    if(!session){ parseServerActionResponse({ error: "user not sign in", status: "ERROR" })}

    const { title, category, image, description } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== "pitch")
    );

    const slug = slugify(title as string, { lower: true, strict: true});

    try {
        const startup = {
            title,
            category,
            description,
            image,
            slug: {
                _type: slug,
                current: slug
            },
            author: {
                _type: 'reference',
                _ref: session?.id,
            },
            pitch,
        }

        const result = await writeClient.create({ _type: 'startup', ...startup});
        return parseServerActionResponse({
            ...result,
            error: "",
            status: "SUCCESS",
        })

    } catch (error) {
        console.log(error);
        return parseServerActionResponse({
            error: JSON.stringify(error),
            status: "ERROR",
        })
    }
}
