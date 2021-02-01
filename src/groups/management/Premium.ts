import {BaseConfig, Blueprint, Command, Executor, Message} from "@dxz/blueprint";
import {dispatch_error_embed, dispatch_success_embed} from "../../structures/EmbedTypes";
import {API} from "../../classes/API";

@Command({
    aliases: [],
    groups: ["owners"],
    name: "premium"
})
export class Premium implements Executor {
    async callback(ctx: Message, args: string[], ref: Blueprint<BaseConfig>) {
        if (args[0] && !parseInt(args[0])) {
            return await dispatch_error_embed(ctx, "UID is not a number.");
        }
        try {
            const uid = parseInt(args[0]);
            const api = ref.registry.data.get("api") as API;
            await api.premium(uid);
            return await dispatch_success_embed(ctx, `Added **${uid}** as premium.`);
        } catch (e) {
            return await dispatch_error_embed(ctx, `An error occurred while trying to premium a user:\n**${e.message}**.`);
        }
    }
}