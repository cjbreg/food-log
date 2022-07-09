import { Request, Response } from "express";
import got from "got";
import { fetch } from "undici";
import createMetascraper from "metascraper";
import metascraperDescription from "metascraper-description";
import metascraperImage from "metascraper-image";
import metascraperTitle from "metascraper-title";

const metascraper = createMetascraper([
  metascraperDescription(),
  metascraperImage(),
  metascraperTitle(),
]);

interface MetascraperInterface {
  fetchData(req: Request, res: Response): Promise<void>;
}

class MetascraperController implements MetascraperInterface {
  constructor() {}

  fetchData = async (req: Request, res: Response): Promise<void> => {
    try {
      const { targetUrl } = req.query ?? "";
      const query = targetUrl?.toString() ?? "";
      const { html, url } = await fetch(query).then(async (res) => ({
        url: res.url,
        html: await res.text(),
      }));

      const metadata = await metascraper({ html, url });

      res.status(200).send({ data: metadata });
    } catch (error) {
      res.status(500).send({ error: "Something went wrong, try again later." });
    }
  };
}

export default MetascraperController;
