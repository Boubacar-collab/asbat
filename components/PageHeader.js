export default function PageHeader({ title, subtitle, badge }) {
  return (
    <section className="gradient-hero relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
      <div className="relative mx-auto max-w-7xl">
        {badge && (
          <span className="mb-4 inline-block rounded-full border border-asbat-green-light/40 bg-asbat-green/20 px-4 py-1 text-sm font-medium text-asbat-green-light">
            {badge}
          </span>
        )}
        <h1 className="animate-fade-up max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="animate-fade-up animation-delay-100 mt-4 max-w-2xl text-lg text-zinc-300 opacity-0 [animation-fill-mode:forwards]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
