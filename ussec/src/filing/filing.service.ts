import { Injectable } from "@nestjs/common";
import { ApidbService } from "src/apidb/apidb.service";
import { IFiling } from "src/types/external";

const FILETYPES = {
    htm: "HTML",
    html: "HTML",
    xml: "XML",
    unknown: "UNKNOWN",
};

@Injectable()
export class FilingService {
    constructor(private readonly apiDbService: ApidbService) {}

    createDocumentPath(cik: string, accessionNumber: string) {
        // Strip - Character From Accession Numbers
        const nAcession = accessionNumber.replaceAll("-", "");
        return `${cik}/${nAcession}`;
    }

    createDocumentType(primaryDocument) {
        const extension = primaryDocument.split(".").pop().toLowerCase();
        return FILETYPES[extension] || FILETYPES.unknown;
    }

    createFilingsFromSubmissions(submissions): IFiling[] {
        const { cik } = submissions;
        const filings = submissions.filings.recent;
        return filings.accessionNumber.map((accessionNumber, index) => {
            const primaryDocument = filings.primaryDocument[index];
            const format = this.createDocumentType(primaryDocument);

            const path = this.createDocumentPath(cik, accessionNumber);

            return {
                apidbId: accessionNumber,
                form: filings.form[index],
                name: filings.primaryDocDescription[index],
                period: filings.reportDate[index],
                filedOn: filings.filingDate[index],
                format,
                path,
                filename: primaryDocument,
            };
        });
    }

    async get(company: string): Promise<IFiling[]> {
        const submissions = await this.apiDbService.getSubmissions(company);
        return this.createFilingsFromSubmissions(submissions);
    }
}
