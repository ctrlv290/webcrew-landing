interface SectionContainerProps {
  id?: string
  backgroundColor?: string
  className?: string
  children: React.ReactNode
  isFullScreen?: boolean
}

export default function SectionContainer({ 
  id, 
  backgroundColor = '#FFFFFF', 
  className = "",
  children,
  isFullScreen = false
}: SectionContainerProps) {
  return (
    <section 
      id={id}
      className={`${isFullScreen ? 'h-screen min-h-screen' : 'min-h-fit py-16 md:py-20'} flex items-center ${className}`} 
      style={{ backgroundColor }}
    >
      <div className="section-container">
        {children}
      </div>
    </section>
  )
} 