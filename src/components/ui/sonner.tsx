import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast !bg-card !border !border-border !rounded-none !text-foreground !text-xs !font-medium !shadow-md",
          description: "!text-muted-foreground !text-xs",
          actionButton:
            "!bg-primary !text-primary-foreground",
          cancelButton:
            "!bg-muted !text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
