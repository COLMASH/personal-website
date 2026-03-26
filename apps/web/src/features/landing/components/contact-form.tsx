'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Bot, Database, Globe, GraduationCap, Lightbulb, Send, Workflow } from 'lucide-react'
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
    website: z.string().optional(),
    services: z.array(z.string()).min(1, 'Select at least one service'),
    timeline: z.string().min(1, 'Select a timeline'),
    budget: z.string().min(1, 'Select a budget'),
    description: z.string().min(1, 'Describe your business challenge')
})

type ContactFormData = z.infer<typeof contactSchema>

const serviceOptions = [
    { label: 'AI Agents', icon: Bot },
    { label: 'AI Workflows', icon: Workflow },
    { label: 'AI Strategy', icon: Lightbulb },
    { label: 'Web2/3 Software', icon: Globe },
    { label: 'RAG Systems', icon: Database },
    { label: 'Claude Code Training', icon: GraduationCap }
]

const timelineOptions = ['ASAP', '1-3 months', '3-6 months', 'Exploring']

const budgetOptions = ['Under $5K', '$5K-$15K', '$15K-$30K', '$30K+']

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
            website: '',
            services: [],
            timeline: '',
            budget: '',
            description: ''
        }
    })

    const selectedServices = watch('services')
    const selectedTimeline = watch('timeline')
    const selectedBudget = watch('budget')

    const toggleService = (service: string) => {
        const current = selectedServices ?? []
        const updated = current.includes(service)
            ? current.filter(s => s !== service)
            : [...current, service]
        setValue('services', updated, { shouldValidate: true })
    }

    const selectTimeline = (timeline: string) => {
        setValue('timeline', timeline, { shouldValidate: true })
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
                {/* Name + Email */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <Label className="text-foreground mb-1.5 text-sm">
                            Name <span className="text-destructive">*</span>
                        </Label>
                        <Input {...register('name')} placeholder="Your full name" />
                        {errors.name && (
                            <p className="text-destructive mt-1 text-xs">{errors.name.message}</p>
                        )}
                    </div>
                    <div>
                        <Label className="text-foreground mb-1.5 text-sm">
                            Email <span className="text-destructive">*</span>
                        </Label>
                        <Input {...register('email')} placeholder="you@company.com" />
                        {errors.email && (
                            <p className="text-destructive mt-1 text-xs">{errors.email.message}</p>
                        )}
                    </div>
                </div>

                {/* Website URL */}
                <div>
                    <Label className="text-foreground mb-1.5 text-sm">
                        Website URL <span className="text-muted-foreground">(optional)</span>
                    </Label>
                    <Input {...register('website')} placeholder="https://yourcompany.com" />
                </div>

                {/* Service Interest */}
                <div>
                    <Label className="text-foreground mb-1.5 text-sm">
                        Services of Interest <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex flex-wrap gap-2">
                        {serviceOptions.map(({ label, icon: Icon }) => {
                            const isSelected = selectedServices?.includes(label) ?? false
                            return (
                                <button
                                    key={label}
                                    type="button"
                                    onClick={() => toggleService(label)}
                                    className={cn(
                                        'inline-flex items-center gap-1.5',
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
                                    <Icon className="h-4 w-4" />
                                    {label}
                                </button>
                            )
                        })}
                    </div>
                    {errors.services && (
                        <p className="text-destructive mt-1 text-xs">{errors.services.message}</p>
                    )}
                </div>

                {/* Project Timeline */}
                <div>
                    <Label className="text-foreground mb-1.5 text-sm">
                        Project Timeline <span className="text-destructive">*</span>
                    </Label>
                    <div className="flex flex-wrap gap-2">
                        {timelineOptions.map(timeline => {
                            const isSelected = selectedTimeline === timeline
                            return (
                                <button
                                    key={timeline}
                                    type="button"
                                    onClick={() => selectTimeline(timeline)}
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
                                    {timeline}
                                </button>
                            )
                        })}
                    </div>
                    {errors.timeline && (
                        <p className="text-destructive mt-1 text-xs">{errors.timeline.message}</p>
                    )}
                </div>

                {/* Primary Business Challenge */}
                <div>
                    <Label className="text-foreground mb-1.5 text-sm">
                        Primary Business Challenge <span className="text-destructive">*</span>
                    </Label>
                    <textarea
                        {...register('description')}
                        rows={4}
                        placeholder="Tell us about the biggest challenge you'd like AI to solve..."
                        className={cn(
                            'border-input bg-background w-full rounded-md border px-3 py-2 text-sm',
                            'transition-[color,box-shadow] outline-none',
                            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                            'placeholder:text-muted-foreground'
                        )}
                    />
                    {errors.description && (
                        <p className="text-destructive mt-1 text-xs">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                {/* Estimated Budget */}
                <div>
                    <Label className="text-foreground mb-1.5 text-sm">
                        Estimated Budget <span className="text-destructive">*</span>
                    </Label>
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
                    {errors.budget && (
                        <p className="text-destructive mt-1 text-xs">{errors.budget.message}</p>
                    )}
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
                        Book Your Free Consultation
                        <Send className="h-4 w-4" />
                    </>
                )}
            </button>
        </form>
    )
}
