import { useEffect, useState } from 'react';

const navigation = [
  { name: 'Product Tour', href: '#' },
  { name: 'Science', href: '#' },
  { name: 'Test Library', href: '#' },
  { name: 'Pricing', href: '#' },
];

export default function Navigation(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 5) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });
  let navbarClasses = ['bg-white'];
  if (scrolled) {
    navbarClasses.push('scrolled');
  }
  return (
    <header className={navbarClasses.join(' ')}>
      <nav
        className='mx-auto max-w-10xl px-4 sm:px-6 lg:px-12'
        aria-label='Top'
      >
        <div className='flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none'>
          <div className='flex items-center'>
            <a href='/#'>
              <span className='sr-only'>Test Ape</span>
              <img className='h-10 w-auto' src='/logo.svg' alt='' />
            </a>
            <div className='ml-10 hidden space-x-8 lg:block'>
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className='text-lg font-bold text-black hover:text-indigo-900'
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
          <div className='ml-10 space-x-4'>
            <a
              href='#'
              className='inline-block rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-opacity-75'
            >
              Request Demo
            </a>
            <a
              href='#'
              className='inline-block rounded-md border border-indigo-500 bg-white py-2 px-4 text-base font-medium text-indigo-600 hover:bg-indigo-50'
            >
              Try For Free
            </a>
          </div>
        </div>
        <div className='flex flex-wrap justify-center space-x-6 py-4 lg:hidden'>
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className='text-lg font-bold text-indigo-900 hover:text-indigo-600'
            >
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
