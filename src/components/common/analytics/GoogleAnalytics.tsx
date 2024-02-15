import Script from 'next/script';

export function GoogleAnalytics() {
	return (
		<>
			{/* <!-- Google Tag Manager (noscript) --> */}
			<noscript>
				<iframe
					src={`https://www.googletagmanager.com/ns.html?id=${process.env.G_ID}`}
					height="0"
					width="0"
					className="invisible hidden"
				></iframe>
			</noscript>
			{/* <!-- End Google Tag Manager (noscript) --> */}
			{/* <!-- Google Tag Manager --> */}
			<Script id="google-tag-management">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer',"${process.env.G_ID}");

`}</Script>
		</>
	);
}
