import { Ship, Calendar, Users } from 'lucide-react'

const stats = [
  {
    icon: Ship,
    value: '7',
    label: 'Premium vessels',
  },
  {
    icon: Calendar,
    value: '15+',
    label: 'Years of experience',
  },
  {
    icon: Users,
    value: '500+',
    label: 'Happy guests',
  },
]

export default function InfoSection() {
  return (
    <section className="bg-deep-navy px-5 pb-16 pt-40 md:px-10 md:pb-24 md:pt-32 lg:px-16 lg:pb-32 lg:pt-40">
      <div className="mx-auto max-w-5xl">
        {/* Large Text */}
        <h2 className="text-[7vw] font-medium leading-[1.1] tracking-[-0.02em] text-warm-white md:text-4xl lg:text-5xl">
          Experience the <span className="text-sand">crystal clear waters</span> of Kvarner Bay,
          where every journey becomes <span className="text-sand">an unforgettable adventure.</span>
        </h2>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4 md:mt-16 md:gap-6 lg:mt-20 lg:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-2xl border border-warm-white/10 bg-warm-white/5 px-4 py-6 text-center md:items-start md:px-6 md:py-8 md:text-left lg:px-8 lg:py-10"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-sand/10 md:mb-4 md:h-12 md:w-12">
                <stat.icon className="h-5 w-5 text-sand md:h-6 md:w-6" />
              </div>
              <span className="text-2xl font-semibold text-warm-white md:text-3xl lg:text-4xl">
                {stat.value}
              </span>
              <span className="mt-1 text-xs text-warm-white/50 md:text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
