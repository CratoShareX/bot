import req from "@helperdiscord/centra";
import {HTTPMethod} from "@helperdiscord/centra/dist/lib/CentraRequest";
import {Blueprint} from "@dxz/blueprint";
import {FullConfig} from "../structures/Types";

interface Req {
    endpoint: string,
    method: HTTPMethod,
    body?: any
}

export class API {
    config: Blueprint<FullConfig>;
    constructor(config: Blueprint<FullConfig>) {
        this.config = config;
    }

    async request(data: Req) {
        try {
            const baseURL = this.config.core.config.crato.baseUrl;
            const apiKey = this.config.core.config.crato.apiKey;

            const res = await req(`${baseURL}${data.endpoint}`)
                .header("Authorization", apiKey)
                .method(data.method)
                .body(data.body)
                .send();

            return res.json();
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async getFileCount() {
        return await this.request({
            endpoint: "/files",
            method: "GET"
        });
    }

    async getStats() {
        const totalUsers = (await this.request({
            endpoint: '/users',
            method: 'GET',
        })).total;

        const totalFiles = (await this.getFileCount()).total;

        return {
            totalUsers,
            totalFiles,
        };
    }

    async generateInvite() {
        return await this.request({
            endpoint: '/admin/invites',
            method: 'POST',
        });
    }

    async blacklist(id: string, reason: string) {
        return await this.request({
            endpoint: '/admin/blacklist',
            method: 'POST',
            body: {
                id,
                reason: reason ? reason : 'No reason provided',
            },
        });
    }

    async whitelist(id: string, reason: string) {
        return await this.request({
            endpoint: '/admin/whitelist',
            method: 'POST',
            body: {
                id,
                reason: reason ? reason : 'No reason provided',
            },
        });
    }

    async getUser(id: string) {
        return await this.request({
            endpoint: `/admin/users/${id}`,
            method: 'GET',
        });
    }

    async addDomain(name: string, wildcard: boolean, donated: boolean, donatedBy: string, userOnly: boolean) {
        return await this.request({
            endpoint: `/domains/`,
            method: 'POST',
            body: [{
                name: name,
                wildcard: wildcard || false,
                donated: donated || false,
                donatedBy: donatedBy || "null",
                userOnly: userOnly || false
            }]
        });
    }

    async deleteDomain(name: string) {
        return await this.request({
            endpoint: `/domains/${name}`,
            method: 'DELETE'
        });
    }

    async inviteWave() {
        return await this.request({
            endpoint: `/invites/inviteWave`,
            method: 'POST'
        });
    }
}
