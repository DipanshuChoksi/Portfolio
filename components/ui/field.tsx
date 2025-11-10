'use client'

import { useMemo } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

/**
 * Renders a fieldset that stacks children vertically and applies spacing with slot-based gap adjustments for nested checkbox or radio groups.
 *
 * @param className - Additional CSS classes to append to the component's default layout classes
 * @returns A fieldset element with data-slot="field-set", a vertical flex layout, default gap spacing, and reduced gaps when direct child checkbox or radio groups are present
 */
function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn(
        'flex flex-col gap-6',
        'has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Renders a legend element used as the field group title with a slot and variant metadata.
 *
 * @param variant - Controls typography: `'legend'` applies the base text size, `'label'` applies a smaller text size.
 * @returns The rendered `<legend>` element with `data-slot="field-legend"`, `data-variant`, and the appropriate styling classes.
 */
function FieldLegend({
  className,
  variant = 'legend',
  ...props
}: React.ComponentProps<'legend'> & { variant?: 'legend' | 'label' }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        'mb-3 font-medium',
        'data-[variant=legend]:text-base',
        'data-[variant=label]:text-sm',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Renders a container div acting as a field group with consistent layout and slot metadata.
 *
 * The element has data-slot="field-group" and applies layout classes for vertical stacking and responsive gaps,
 * while preserving any additional classes or props passed through.
 *
 * @returns A div configured as a field group container with slot metadata and composed class names.
 */
function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        'group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4',
        className,
      )}
      {...props}
    />
  )
}

const fieldVariants = cva(
  'group/field flex w-full gap-3 data-[invalid=true]:text-destructive',
  {
    variants: {
      orientation: {
        vertical: ['flex-col [&>*]:w-full [&>.sr-only]:w-auto'],
        horizontal: [
          'flex-row items-center',
          '[&>[data-slot=field-label]]:flex-auto',
          'has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
        ],
        responsive: [
          'flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto',
          '@md/field-group:[&>[data-slot=field-label]]:flex-auto',
          '@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
        ],
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  },
)

/**
 * Renders a field group wrapper that applies orientation-aware layout and exposes slot attributes for composition.
 *
 * @param orientation - Layout orientation for the field content; one of `"vertical"`, `"horizontal"`, or `"responsive"`. Defaults to `"vertical"`.
 * @returns A div element that serves as a field group wrapper with role="group" and data-slot="field", styled according to the selected orientation.
 */
function Field({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

/**
 * Renders the content container for a field with layout and slot attributes.
 *
 * @returns A div element that serves as the field's content area and includes `data-slot="field-content"` and default layout classes.
 */
function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-content"
      className={cn(
        'group/field-content flex flex-1 flex-col gap-1.5 leading-snug',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Renders a styled Label configured as the field's label slot.
 *
 * @param className - Additional CSS classes to merge with the component's defaults
 * @param props - All other props are forwarded to the underlying `Label` component
 */
function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        'group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50',
        'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4',
        'has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Renders a field title element placed in the label slot.
 *
 * Applies `data-slot="field-label"` and styling for inline alignment, spacing, and typography,
 * and forwards all received props to the underlying div.
 *
 * @returns A div element configured as a field title (slot: `field-label`) with layout and typography classes.
 */
function FieldTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        'flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Renders a paragraph used as a field description with slot data and responsive styling.
 *
 * @param className - Additional CSS class names merged with the component's defaults
 * @returns A <p> element with data-slot="field-description" and the component's descriptive styles
 */
function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        'text-muted-foreground text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance',
        'last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className,
      )}
      {...props}
    />
  )
}

/**
 * Renders a horizontal visual separator for field groups, optionally showing centered inline content.
 *
 * @param children - Optional inline content to display centered over the separator line.
 * @param className - Additional CSS classes applied to the container.
 * @returns A `div` element containing the separator line; includes a centered content `span` when `children` is provided.
 */
function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  children?: React.ReactNode
}) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn(
        'relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2',
        className,
      )}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span
          className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  )
}

/**
 * Renders a field-level validation area when error content is available.
 *
 * If `children` is provided it is used as the error content. Otherwise `errors`
 * is inspected: a single error message is rendered as plain text, multiple
 * error messages are rendered as a bulleted list. If neither produces content,
 * nothing is rendered.
 *
 * @param children - Optional custom content to render inside the error area; takes precedence over `errors`.
 * @param errors - Optional array of error objects; each object may include a `message` string.
 * @returns A div with `role="alert"` containing the resolved error content, or `null` when there is no content to show.
 */
function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<'div'> & {
  errors?: Array<{ message?: string } | undefined>
}) {
  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors) {
      return null
    }

    if (errors.length === 1 && errors[0]?.message) {
      return errors[0].message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-1">
        {errors.map(
          (error, index) =>
            error?.message && <li key={index}>{error.message}</li>,
        )}
      </ul>
    )
  }, [children, errors])

  if (!content) {
    return null
  }

  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn('text-destructive text-sm font-normal', className)}
      {...props}
    >
      {content}
    </div>
  )
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}