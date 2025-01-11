"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { aspectRatioOptions, defaultValues, transformationTypes } from "@/constants"
import
    {
        Form,
        FormControl,
        FormDescription,
        FormField,
        FormItem,
        FormLabel,
        FormMessage,
    } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CustomField } from "./CustomField"
import
    {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
    } from "@/components/ui/select"
import { useState } from "react"
import { AspectRatioKey } from "@/lib/utils"
import { config } from "process"


export const formSchema = z.object({
    title: z.string().nonempty(),
    aspectRatio: z.string().optional(),
    color: z.string().optional(),
    prompt: z.string().optional(),
    publicId: z.string(),
})

const TransformationForm = ({ action, data= null, userId, type, creditBalance, config=null  }: TransformationFormProps) => {

    const transformation = transformationTypes[type]

    const [image, setImage] = useState(false)
    const [newTransformation, setNewTransformation] = useState<Transformations | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isTransforming, setIsTransforming] = useState(false)
    const [transformationConfig, setTransformationConfig] = useState(config)

    const onInputChangeHandler = ( fieldName:string, value:string, type:string, onChange:( (type:string) => void ) ) => {

    }

    const initialValues = data && action === "Update" ? {
        title: data?.title,
        aspectRatio: data?.aspectRatio,
        color: data?.color,
        prompt: data?.prompt,
        publicId: data?.publicId,
    }: defaultValues;

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>)
    {
        console.log(values)
    }

    const onTransformHandler = () =>{
        // pass
    }

    const onSelectFieldHandler = (value:string , onChange:(value:string)=>void) =>
    {
        // Pass
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CustomField
                    control={form.control}
                    name="title"
                    formLabel="Image Title"
                    className="w-full"
                    render={({ field }) => (
                        <Input {...field} placeholder="Enter the image title" className="input-field"/>
                    )}
                />
                {
                    type === 'fill' && (
                        <CustomField
                            control={form.control}
                            name="aspectRatio"
                            formLabel="Aspect Ratio"
                            className="w-full"
                            render={ ({ field }) => (
                                <Select
                                    onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}
                                >
                                    <SelectTrigger className="select-fill">
                                        <SelectValue placeholder="Select Size" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            Object.keys( aspectRatioOptions ).map((key) => (
                                                <SelectItem key={key} value={key} className="select-item">
                                                    {aspectRatioOptions[key as AspectRatioKey].label}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                </Select>  
                            )}
                        />
                    )
                }
                {
                    (type === 'remove' || type === 'recolor') && (
                        <div className="prompt-field">
                            <CustomField
                                control={form.control}
                                name="prompt"
                                formLabel={ type === 'remove' ? "Remove Background" : "Recolor Image"}
                                className="w-full"
                                render={({ field }) => (
                                    <Input 
                                        value={field.value}
                                        onChange={(e) => { onInputChangeHandler('prompt',e.target.value, type, field.onChange) }}
                                        className="input-field"
                                    />
                                )}
                            />
                            {  type === 'recolor' && (
                                <CustomField
                                    control={form.control}
                                    name="recolor"
                                    formLabel="Replacement Color"
                                    className="w-full"
                                    render={({ field }) => (
                                        <Input 
                                            value={field.value}
                                            onChange={(e) => { onInputChangeHandler('color',e.target.value, 'recolor', field.onChange) }}
                                            className="input-field"
                                        />
                                    )}
                                />
                            )}
                        </div>
                    )
                }
                <div className="flex flex-col gap-4">
                    <Button 
                        type="submit" 
                        className="submit-button capitalize"
                        disabled={isSubmitting }
                        > 
                        { isSubmitting ? "Submitting" : "Save Image" } 
                    </Button>
                    <Button
                        type="button"
                        className="submit-button capitalize"
                        disabled={isTransforming || newTransformation === null}
                        onClick={onTransformHandler}
                    >
                        { isTransforming ? "Transforming" : "Apply Transformation" }
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default TransformationForm