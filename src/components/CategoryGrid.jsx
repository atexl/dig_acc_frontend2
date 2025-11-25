import { motion } from 'framer-motion';

export default function CategoryGrid({ title, items = [], columns = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3", openInNewTab = true }) {
    if (!items || items.length === 0) return null;

    const renderDescription = (desc, opts = {}) => {
        if (!desc) return null;
        const parts = String(desc).split(/[\.\n•]+/).map(s => s.trim()).filter(Boolean);
        const spacing = opts.noMargin ? '' : 'mt-2';
        const baseClass = `${spacing} text-sm ${opts.className || ''}`;
        if (parts.length > 1) {
            return (
                <ul className={`${baseClass} list-disc list-inside space-y-1`}>
                    {parts.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
            );
        }
        return <p className={baseClass}>{desc}</p>;
    };

    return (
        <section aria-label={title} className='mt-6'>
            <h4 className='text-lg font-semibold text-black mb-4'>{title}</h4>
            <div className={`grid gap-6 ${columns}`}>
                {items.map((item, idx) => (

                    <motion.a
                        key={item.id}
                        href={item.href || '#'}
                        target={openInNewTab ? "_blank" : "_self"}
                        rel={openInNewTab ? "noopener noreferrer" : undefined}
                        className='group relative block rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]'
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ delay: idx * 0.06, type: "spring", stiffness: 200, damping: 18 }}
                        whileHover={{ scale: 1.03 }}>

                       
                        <div className='rounded-2xl p-px bg-gradient-to-br from-white/80 via-slate-50 to-white/60'>
                          
                            <div className='relative w-full bg-white/60 backdrop-blur-sm rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col'>
                                
                             
                                <div className='relative w-full h-40 bg-slate-50 overflow-hidden shrink-0'>
                                    {item.img ? (
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className='w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105'
                                            onError={(e) => (e.currentTarget.style.display = 'none')} />
                                    ) : (
                                        <div className='w-full h-full flex items-center justify-center text-slate-400'>No Image</div>
                                    )}

                                    
                                    <div className='absolute inset-0 pointer-events-none'>
                                        <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent' />
                                    </div>

                                   
                                    <div className='absolute top-3 right-3 z-20'>
                                        <span className='inline-flex items-center text-xs text-slate-800 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-md ring-1 ring-slate-200 shadow-sm'>
                                            Demo
                                        </span>
                                    </div>

                                   
                                    <div className='absolute left-[-75%] top-0 w-3/4 h-full bg-gradient-to-r from-white/10 via-white/30 to-white/10 rotate-12 transform transition-transform duration-700 group-hover:translate-x-[200%]' />
                                </div>

                                {/* content: title, subtitle, description (scrollable) and tags */}
                                <div className='p-3 flex-1 flex flex-col'>
                                    <div className='flex-0'>
                                        <div className="text-lg font-semibold text-center text-slate-900 truncate">
                                            {item.title}
                                        </div>
                                        {item.subtitle && <div className='text-sm text-slate-500 mt-1 text-center'>{item.subtitle}</div>}
                                    </div>

                                    <div className=' text-sm text-slate-700 flex-1 overflow-y-auto pr-1 mt-2'>
                                        {renderDescription(item.desc, { className: 'text-slate-700', noMargin: true })}
                                    </div>

                                    {/* footer row: tags + CTA button + status */}
                                   <div className='flex-none flex flex-col items-center justify-center gap-2 mt-2'>
                                        <div className='flex flex-wrap gap-2 justify-center'>
                                            {Array.isArray(item.tags) && item.tags.slice(0, 4).map((t, i) => (
                                                <span key={i} className='text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 ring-1 ring-transparent'>{t}</span>
                                            ))}
                                        </div>

                                     <div>
                                            <span className='inline-flex items-center gap-2 rounded-full text-white text-xs font-semibold px-4 py-2 shadow-sm transform transition duration-200 group-hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300'
                                                style={{
                                                    background: "linear-gradient(90deg, #00C6FB 0%, #005BEA 100%)",
                                                }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4' viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                                                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className='pr-1 text-sm'>{item.href ? 'Open Demo' : 'View'}</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.a>


                ))}
            </div>
        </section>
    )
}