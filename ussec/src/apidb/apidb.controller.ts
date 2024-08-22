import { Request } from "express";
import { Get, Controller, Next, Req, Res } from "@nestjs/common";
import { createProxyMiddleware, responseInterceptor } from "http-proxy-middleware";
// Have To Import Via Require (For Some Reason)
const htmlFindReplace = require("html-find-replace-element-attrs");

const SEC_DATA_URL = "https://www.sec.gov/Archives/edgar/data";
const ASSET_URL = "http://localhost:3005/apidbdocproxy/asset";

function htmlImgTagSrcSetProxy(html: string, path) {
    // Repoint The Image SRC To Run Through Proxy
    const query = `?path=${path}&filename`;
    return htmlFindReplace.replace(html, (item: any) => `${ASSET_URL}${query}=${item.value}`, {
        tag: "img",
        attr: "src",
    });
}

// TODO - THIS ALSO NEEDS TO PROXY OTHER LINKS THAT ARE NOT ANCHORS BUT EXTERNAL LINKS TO OTHER DOCUMENTS
function htmlHRefAnchorSrcSetProxy(html: string) {
    // Adjust Hyperlink HRef Anchors To Work Within The IFrame
    // https://stackoverflow.com/questions/42475012/how-to-make-href-anchors-in-iframe-srcdoc-actually-work
    return htmlFindReplace.replace(
        html,
        (item: any) => {
            const href = item.value;
            return href.startsWith("#") ? `about:srcdoc${href}` : href;
        },
        {
            tag: "a",
            attr: "href",
        }
    );
}

const requestRouter = (req: Request) => {
    // Strip Out The Doc Proxy URL Prefix
    const { path, filename } = req.query;
    return `${SEC_DATA_URL}/${path}/${filename}`;
};

const headerProxy = (proxyReq, req) => {
    proxyReq.setHeader("USER-AGENT", "testsecapi@gmail.com");
};

// Documents (Filings)
const docProxy = createProxyMiddleware({
    router: requestRouter,
    on: {
        proxyReq: headerProxy,
        proxyRes: responseInterceptor(async (responseBuffer, _proxyRes, req) => {
            const response = responseBuffer.toString("utf8");
            const { path } = req.query;
            // TODO - Would Be More Performant To Do These On HTML Once (Lib Limiting Factor Atm)
            let parsed = htmlImgTagSrcSetProxy(response, path);
            return htmlHRefAnchorSrcSetProxy(parsed);
        }),
    },
    ignorePath: true,
    changeOrigin: true,
    selfHandleResponse: true,
});

// Assets On A Document (Images)
const assetProxy = createProxyMiddleware({
    router: requestRouter,
    on: {
        proxyReq: headerProxy,
    },
    ignorePath: true,
    changeOrigin: true,
});

@Controller("apidbdocproxy")
export class ApidbController {
    @Get("/document")
    document(@Req() req, @Res() res, @Next() next) {
        docProxy(req, res, next);
    }
    @Get("/asset")
    asset(@Req() req, @Res() res, @Next() next) {
        assetProxy(req, res, next);
    }
}
