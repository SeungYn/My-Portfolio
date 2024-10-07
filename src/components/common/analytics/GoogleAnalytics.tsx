import Script from 'next/script';

export function GoogleAnalytics() {
	return (
		<>
			<noscript>
				<iframe
					src={`https://www.googletagmanager.com/gtag/js?id=${process.env.G_ID}`}
					height="0"
					width="0"
					className="invisible hidden"
				></iframe>
			</noscript>
			{/* <!-- End Google Tag Manager (noscript) --> */}
			{/* <!-- Google Tag Manager --> */}
			<Script id="" strategy="lazyOnload">{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${process.env.G_ID}');
`}</Script>
		</>
	);
}
