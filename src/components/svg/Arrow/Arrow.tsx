import React, { forwardRef } from 'react';

interface ArrowProps {}

const Arrow = forwardRef<SVGSVGElement, ArrowProps>((props, ref) => {
    return (
        <svg ref={ref} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.4 20L9 12L15.4 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
});

Arrow.displayName = 'Arrow';

export default Arrow;
