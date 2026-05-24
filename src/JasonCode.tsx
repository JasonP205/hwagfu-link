"use client";
import React, { useEffect, useState } from 'react';
import { Button, Link, Spinner } from '@heroui/react';

export interface JasonCodeProps {
  label?: string;
  url?: string;
  className?: string;
  classNames?: {
    content?: string;
    image?: string;
  };
  type?: 'button' | 'link' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  render?: (data: { title?: string; favicon?: string; url?: string; isLoading: boolean }) => React.ReactNode;
}

export const JasonCode: React.FC<JasonCodeProps> = ({ 
  label = "Jason Code Space", 
  url = "https://hwagfu.dev",
  className = "",
  classNames = {},
  type = "button",
  size = "md",
  render
}) => {
  const [ogData, setOgData] = useState<{ title?: string; favicon?: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOGData = async () => {
      try {
        setIsLoading(true);
        // Lấy dữ liệu favicon và title nhanh qua microlink
        const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
        const json = await res.json();
        
        let hostname = "";
        try { hostname = new URL(url).hostname; } catch(e) {}

        const fallbackFavicon = hostname ? `https://s2.googleusercontent.com/s2/favicons?domain=${hostname}&sz=64` : undefined;

        setOgData({
          title: json.data?.title,
          favicon: json.data?.logo?.url || fallbackFavicon
        });
      } catch (error) {
        console.error("Failed to fetch OG data", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (url) {
      fetchOGData();
    }
  }, [url]);

  const displayTitle = ogData?.title || label;
  
  let hostname = "";
  try { hostname = new URL(url).hostname; } catch(e) {}
  const displayFavicon = ogData?.favicon || (hostname ? `https://s2.googleusercontent.com/s2/favicons?domain=${hostname}&sz=64` : "");

  // Nếu người dùng cung cấp hàm render custom, trả về kết quả ngay
  if (render) {
    return <>{render({ title: displayTitle, favicon: displayFavicon, url, isLoading })}</>;
  }

  const innerContent = isLoading ? (
    <Spinner size="sm" color="current" />
  ) : (
    <>
      {displayFavicon && (
        <img 
          src={displayFavicon} 
          alt={displayTitle} 
          className={`w-4 h-4 object-contain shrink-0 ${classNames.image || ""}`}
        />
      )}
      <span className={`truncate ${classNames.content || ""}`}>{displayTitle}</span>
    </>
  );

  const wrapperProps = {
    href: url,
    target: "_blank",
    rel: "noopener noreferrer",
  };

  // Kích thước dành cho type="icon"
  const iconSizeMap = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };

  if (type === 'icon') {
    return (
      <Link 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex shrink-0 ${className}`}
      >
        {isLoading ? (
          <Spinner size={size === 'xl' || size === 'lg' ? 'md' : 'sm'} color="current" />
        ) : (
          displayFavicon && (
            <img 
              src={displayFavicon} 
              alt={displayTitle} 
              className={`${iconSizeMap[size] || iconSizeMap.md} object-contain ${classNames.image || ""}`}
            />
          )
        )}
      </Link>
    );
  }

  // Render dạng link của HeroUI
  if (type === 'link') {
    return (
      <Link 
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 max-w-full truncate ${className}`}
      >
        {innerContent}
      </Link>
    );
  }

  // Mặc định render dạng Button của HeroUI
  // HeroUI v3 thay thế `as="a"` bằng thủ thuật khác hoặc dùng thẻ a wrapper tĩnh
  return (
    <Button 
      className={`inline-flex flex-nowrap items-center gap-2 max-w-[300px] ${className}`}
      onPress={() => window.open(url, '_blank')}
    >
      {innerContent}
    </Button>
  );
};
