import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card component for displaying content in a boxed layout
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.shadow - Whether to show shadow
 * @param {boolean} props.hover - Whether to show hover effect
 * @returns {JSX.Element} - Card component
 */
const Card = ({
  children,
  className = '',
  shadow = true,
  hover = false,
  ...rest
}) => {
  const baseClasses = 'bg-white dark:bg-gray-800 rounded-lg p-6 transition-colors';
  const shadowClasses = shadow ? 'shadow' : '';
  const hoverClasses = hover ? 'hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700' : '';

  const cardClasses = `${baseClasses} ${shadowClasses} ${hoverClasses} ${className}`;

  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  shadow: PropTypes.bool,
  hover: PropTypes.bool,
};

export default Card;
