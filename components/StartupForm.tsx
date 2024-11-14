"use client"

import { useActionState, useState } from "react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import MDEditor from '@uiw/react-md-editor';
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { createPitch } from "@/lib/actions";
import { useRouter } from "next/navigation";

const StartupForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async(prevState: any, formData: FormData) => {
    try {
      const formValues ={
        title: formData.get('title') as string,
        category: formData.get('category') as string,
        description:  formData.get('description') as string,
        image: formData.get('image') as string,
        pitch
      }
      await formSchema.parseAsync(formValues);
      const result = await createPitch(prevState, formData, pitch)
      if(result?.status == "SUCCESS"){
        toast({
          title: 'Sucess',
          description: 'Pitch submitted successfully',
          variant: "success"
        });
        router.push(`/startup/${result._id}`);
      }
      
    } catch (error) {
      if(error instanceof z.ZodError){
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        return { ...prevState, error: 'Validation failed', status: "Error" }
        toast({
          title: 'Error',
          description: 'Validation failed',
          variant: 'destructive'
        });
      }
      return { ...prevState, error: 'Unexpected error occured', status: 'Error'}
      toast({
        title: 'Error',
        description: 'Unexpected error occured',
        variant: 'destructive'
      });
    }
  }

  const [state, formAction, isPending] = useActionState(
    handleSubmit, 
    { error: "", status: 'Initial' }
  )
  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">Title</label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          placeholder="Startup tilte"
          required
        />

        {errors && (<p className="startup-form_error">{errors.title}</p>)}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">Category</label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          placeholder="Choose your category (eg. health, Education, Tech)"
          required
        />

        {errors && (<p className="startup-form_error">{errors.category}</p>)}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">Description</label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          placeholder="Startup description"
          required
        />

        {errors && (<p className="startup-form_error">{errors.description}</p>)}
      </div>

      <div >
        <label htmlFor="image" className="startup-form_label">Image URL</label>
        <Input
          id="image"
          name="image"
          className="startup-form_input"
          placeholder="Paste a link to your demo or promotional media"
          required
        />

        {errors && (<p className="startup-form_error">{errors.image}</p>)}
      </div>

      <div data-color-mode="light">
        <label htmlFor="pitch" className="startup-form_label">Pitch</label>
        <MDEditor 
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          id="pitch"
          preview="edit"
          height={300}
          style={{ borderRadius: 20, overflow: "hidden"}}
          textareaProps={{
            placeholder: "Briefly describe your idea & the problem it solves",
          }}
          previewOptions={{
            disallowedElements: ["style"]
          }}
        />

        {errors && (<p className="startup-form_error">{errors.pitch}</p>)}
      </div>

      <Button type="submit" className="startup-form_btn text-white" disabled={isPending}>
        {isPending? 'Submitting ...': 'Submit pitch'}
        <Send className="size-6 ml-2"/>
      </Button>
    </form>
  )
}

export default StartupForm