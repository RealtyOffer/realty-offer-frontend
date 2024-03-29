/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet-async';
import { useStaticQuery, graphql } from 'gatsby';
import { useLocation } from '@reach/router';

type SeoType = {
  description?: string;
  meta?: Array<{
    content: string;
    name: string;
  }>;
  title?: string;
  lang?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  script?: Array<{
    innerHTML?: string;
    src?: string;
    type?: string;
    async?: boolean;
  }>;
};

const Seo: FunctionComponent<SeoType> = ({
  title,
  description,
  image,
  lang,
  meta,
  imageWidth,
  imageHeight,
  children,
  script,
}) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            author
            defaultDescription: description
            siteUrl: url
            defaultImage: image
          }
        }
      }
    `
  );

  const { defaultTitle, defaultDescription, siteUrl, defaultImage } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
    imageWidth: imageWidth || 1920,
    imageHeight: imageHeight || 1080,
  };

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          property: 'og:url',
          content: seo.url,
        },
        {
          name: 'image',
          content: seo.image,
        },
        {
          property: 'og:image',
          content: seo.image,
        },
        {
          property: 'og:image:width',
          content: seo.imageWidth,
        },
        {
          property: 'og:image:height',
          content: seo.imageHeight,
        },
        {
          name: 'description',
          content: seo.description,
        },
        {
          property: 'og:title',
          content: `${seo.title} | ${site.siteMetadata.title}`,
        },

        {
          property: 'og:description',
          content: seo.description,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: `${seo.title} | ${site.siteMetadata.title}`,
        },
        {
          name: 'twitter:description',
          content: seo.description,
        },
        {
          name: 'twitter:image',
          content: seo.image,
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent',
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'msapplication-TileColor',
          content: '#0077CC',
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover',
        },
        {
          'http-equiv': 'ScreenOrientation',
          content: 'autoRotate:disabled',
        },
      ].concat(meta || [])}
      script={[
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-ZMBNYQ44PK',
          async: true,
          type: 'text/javascript',
        },
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=AW-325206149',
          async: true,
          type: 'text/javascript',
        },
        {
          type: 'text/javascript',
          innerHTML: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-ZMBNYQ44PK');
          gtag('config', 'AW-325206149');`,
        },
        {
          type: 'text/javascript',
          innerHTML: `!function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '180914303755621');
        fbq('track', 'PageView');`,
        },
        //       {
        //         type: 'text/javascript',
        //         innerHTML: `window.addEventListener('load', function(){
        //   document.addEventListener('click',function(e){
        //     if(event.target.closest('a') && event.target.closest('a').innerText.includes('Get Started')){
        //       gtag('event', 'conversion', {'send_to': 'AW-10961963802/9iBfCO-v6YUYEJqWieso'});
        //     }
        //     if(event.target.closest('button') && event.target.closest('button').innerText.includes('Sell Your Home') && window.location.pathname.includes('/consumer/start')){
        //       gtag('event', 'conversion', {'send_to': 'AW-10961963802/bHpaCIbb6YUYEJqWieso'});
        //     }
        //     if(event.target.closest('button') && event.target.closest('button').innerText.includes('Buy A Home') && window.location.pathname.includes('/consumer/start')){
        //       gtag('event', 'conversion', {'send_to': 'AW-10961963802/bHpaCIbb6YUYEJqWieso'});
        //     }
        //     if(event.target.closest('button') && event.target.closest('button').innerText.includes('Buy & Sell A Home') && window.location.pathname.includes('/consumer/start')){
        //       gtag('event', 'conversion', {'send_to': 'AW-10961963802/DYzgCOed5IUYEJqWieso'});
        //     }
        //   });
        // });`,
        //       }
      ].concat(script || [])}
    >
      {children}
    </Helmet>
  );
};

Seo.defaultProps = {
  lang: 'en',
  meta: [],
  description: '',
};

export default Seo;
