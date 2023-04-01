import React, { ReactElement } from "react";
import Document, { DocumentContext, DocumentInitialProps, Html, Head, Main, NextScript } from 'next/document'
// import MainNavbar from "../components/molecules/MainNavbar";
class MyDocument extends Document {
  static override async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  override render(): ReactElement {
    return(
        <Html>
        <Head>
          <meta name="description" content="FutureFund" />
        </Head>
        <body  className="bg-current"> 
            <Main />
            <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument