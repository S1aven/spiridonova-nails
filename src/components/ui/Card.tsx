import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

export default function Card({
                               children,
                               className = '',
                               padding = 'md',
                               shadow = 'md',
                               border = false,
                               hover = false,
                               onClick,
                             }: CardProps) {

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  // Базовые классы
  const baseClasses = 'rounded-xl transition-all duration-200';

  // Классы по умолчанию
  const defaultClasses = 'bg-white';

  const borderClasses = border ? 'border border-gray-200' : '';
  const hoverClasses = hover ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : '';

  // Собираем все классы
  const allClasses = twMerge(
    baseClasses,
    paddingClasses[padding],
    shadowClasses[shadow],
    borderClasses,
    hoverClasses,
    defaultClasses,
    className
  );

  return (
    <div className={allClasses} onClick={onClick}>
      {children}
    </div>
  );
}