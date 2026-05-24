import React from 'react';

interface JasonCodeProps {
    label?: string;
    url?: string;
    className?: string;
    classNames?: {
        content?: string;
        image?: string;
    };
    type?: 'button' | 'link';
    render?: (data: {
        title?: string;
        favicon?: string;
        url?: string;
        isLoading: boolean;
    }) => React.ReactNode;
}
declare const JasonCode: React.FC<JasonCodeProps>;

export { JasonCode, type JasonCodeProps };
