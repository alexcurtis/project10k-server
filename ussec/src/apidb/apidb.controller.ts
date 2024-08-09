import { Request } from 'express';
import { Get, Controller, Next, Req, Res } from '@nestjs/common';
import {
  createProxyMiddleware,
  responseInterceptor,
} from 'http-proxy-middleware';
const htmlFindReplace = require('html-find-replace-element-attrs');

const SEC_DATA_URL = 'https://www.sec.gov/Archives/edgar/data';

function htmlImgTagSrcSetProxy(html: string, path) {
  const url = `http://localhost:3005/apidbdocproxy/asset`;
  const query = `?path=${path}&filename`;
  return htmlFindReplace.replace(
    html,
    (item: any) => `${url}${query}=${item.value}`,
    {
      tag: 'img',
      attr: 'src',
    },
  );
}

const requestRouter = (req: Request) => {
  // Strip Out The Doc Proxy URL Prefix
  const { path, filename } = req.query;
  console.log('doc request', `${SEC_DATA_URL}/${path}/${filename}`);
  return `${SEC_DATA_URL}/${path}/${filename}`;
};

const headerProxy = (proxyReq, req) => {
  proxyReq.setHeader('USER-AGENT', 'testsecapi@gmail.com');
};

const docProxy = createProxyMiddleware({
  router: requestRouter,
  on: {
    proxyReq: headerProxy,
    proxyRes: responseInterceptor(async (responseBuffer, _proxyRes, req) => {
      const response = responseBuffer.toString('utf8');
      //   console.log('req', req.baseUrl, req);
      const { path } = req.query;
      console.log('query', req.query);
      return htmlImgTagSrcSetProxy(response, path);
    }),
  },
  ignorePath: true,
  changeOrigin: true,
  selfHandleResponse: true,
});

const assetProxy = createProxyMiddleware({
  router: requestRouter,
  on: {
    proxyReq: headerProxy,
  },
  ignorePath: true,
  changeOrigin: true,
});

@Controller('apidbdocproxy')
export class ApidbController {
  @Get('/document')
  document(@Req() req, @Res() res, @Next() next) {
    docProxy(req, res, next);
  }
  @Get('/asset')
  asset(@Req() req, @Res() res, @Next() next) {
    assetProxy(req, res, next);
  }
}
