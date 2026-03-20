'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ApiError } from '@/lib/api-client'
import { cn } from '@/lib/utils'

import { submitContact } from '../api/contact-mutations'

const contactSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Valid email is required'),
    company: z.string().optional(),
    services: z.array(z.string()).min(1, 'Select at least one service'),
    budget: z.string().optional(),
    description: z.string().optional()
})

type ContactFormData = z.infer<typeof contactSchema>

const serviceOptions = ['AI & Agents', 'Full-Stack', 'Blockchain', 'Engineering', 'Strategy']

const budgetOptions = ['Under $10K', '$10K-$25K', '$25K-$50K', '$50K+']

export function ContactForm() {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors }
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            company: '',
            services: [],
            budget: '',
            description: ''
        }
    })

    const selectedServices = watch('services')
    const selectedBudget = watch('budget')

    const toggleService = (service: string) => {
        const current = selectedServices ?? []
        const updated = current.includes(service)
            ? current.filter(s => s !== service)
            : [...current, service]
        setValue('services', updated, { shouldValidate: true })
    }

    const selectBudget = (budget: string) => {
        setValue('budget', budget, { shouldValidate: true })
    }

    const { mutate, isPending } = useMutation({
        mutationFn: submitContact,
        onSuccess: () => {
            toast.success("Thank you! We'll be in touch within 24 hours.")
            reset()
        },
        onError: (error: Error) => {
            const message =
                error instanceof ApiError ? error.detail : 'Something went wrong. Please try again.'
            toast.error(message)
        }
    })

    const onSubmit = (data: ContactFormData) => {
        mutate(data)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn('border-border bg-card rounded-2xl border', 'p-8 shadow-sm')}
        >
            <div className="space-y-5">
                {/* Name */}
                <div>
                    <Label className="text-foreground mb-1.5 text-sm">Name</Label>
                    <Input {...register('name')} placeholder="Your name" />
                    {errors.name && (
                        <p className="text-destructive mt-1 text-xs">{errors.name.message}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <Label className="text-foreground mb-1.5 text-sm">Email</Label>
                    <Input {...register('email')} placeholder="you@example.com" />
                    {errors.email && (
                        <p className="text-destructive mt-1 text-xs">{errors.email.message}</p>
                    )}
                </div>

                {/* Company */}
                <div>
                    <Label className="text-foreground mb-1.5 text-sm">Company (optional)</Label>
                    <Input {...register('company')} placeholder="Your company" />
                </div>

                {/* Service Interest */}
                <div>
                    <Label className="text-foreground mb-1.5 text-sm">Service Interest</Label>
                    <div className="flex flex-wrap gap-2">
                        {serviceOptions.map(service => {
                            const isSelected = selectedServices?.includes(service) ?? false
                            return (
                                <button
                                    key={service}
                                    type="button"
                                    onClick={() => toggleService(service)}
                                    className={cn(
                                        'rounded-full px-4 py-2 text-sm transition-all duration-200',
                                        isSelected
                                            ? 'bg-brand-accent text-white'
                                            : cn(
                                                  'border-border border',
                                                  'text-muted-foreground',
                                                  'hover:border-brand-accent/50 hover:text-foreground'
                                              )
                                    )}
                                >
                                    {service}
                                </button>
                            )
                        })}
                    </div>
                    {errors.services && (
                        <p className="text-destructive mt-1 text-xs">{errors.services.message}</p>
                    )}
                </div>

                {/* Budget */}
                <div>
                    <Label className="text-foreground mb-1.5 text-sm">Budget</Label>
                    <div className="flex flex-wrap gap-2">
                        {budgetOptions.map(budget => {
                            const isSelected = selectedBudget === budget
                            return (
                                <button
                                    key={budget}
                                    type="button"
                                    onClick={() => selectBudget(budget)}
                                    className={cn(
                                        'rounded-full px-4 py-2 text-sm transition-all duration-200',
                                        isSelected
                                            ? 'bg-brand-accent text-white'
                                            : cn(
                                                  'border-border border',
                                                  'text-muted-foreground',
                                                  'hover:border-brand-accent/50 hover:text-foreground'
                                              )
                                    )}
                                >
                                    {budget}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Project Description */}
                <div>
                    <Label className="text-foreground mb-1.5 text-sm">Project Description</Label>
                    <textarea
                        {...register('description')}
                        rows={4}
                        placeholder="Tell us about your project..."
                        className={cn(
                            'border-input bg-background w-full rounded-md border px-3 py-2 text-sm',
                            'transition-[color,box-shadow] outline-none',
                            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                            'placeholder:text-muted-foreground'
                        )}
                    />
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={isPending}
                className={cn(
                    'bg-brand-accent mt-6 w-full rounded-full py-3.5',
                    'inline-flex items-center justify-center gap-2',
                    'font-medium text-white transition-all duration-200',
                    'hover:bg-brand-accent-hover hover:shadow-brand-accent/25 hover:shadow-lg',
                    'disabled:cursor-not-allowed disabled:opacity-50'
                )}
            >
                {isPending ? (
                    'Submitting...'
                ) : (
                    <>
                        Send Message
                        <ArrowRight className="h-4 w-4" />
                    </>
                )}
            </button>
        </form>
    )
}
