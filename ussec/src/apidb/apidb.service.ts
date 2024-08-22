import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

const SEC_API = "https://data.sec.gov";
const SEC_API_HEADER = { "USER-AGENT": "testsecapi@gmail.com" };

// CIKs are 10 digit numbers with leading zeros
const normaliseCik = (cik: string) => String(cik).padStart(10, "0");

@Injectable()
export class ApidbService {
    constructor(private readonly httpService: HttpService) {}

    //https://data.sec.gov/submissions/CIK0000320193.json
    async getSubmissions(cik: string) {
        const ncik = normaliseCik(cik);
        const request = `${SEC_API}/submissions/CIK${ncik}.json`;
        console.log("request", request);
        const { data } = await firstValueFrom(
            this.httpService.get(request, {
                headers: SEC_API_HEADER,
            })
        );
        return data;
    }
}
