import {BaseConfig, Blueprint, Command, Executor, Message} from "@dxz/blueprint";
import {dispatch_error_embed, dispatch_success_embed} from "../../structures/EmbedTypes";
import {API} from "../../classes/API";

@Command({
    aliases: ['invitewave'],
    groups: ['Owners'],
    name: 'invite_wave'
})
export class InviteWave implements Executor {
    async callback(ctx: Message, args: string[], ref: Blueprint<BaseConfig>) {
        try {
            const api = ref.registry.data.get("api") as API;
            await api.inviteWave();
            return await dispatch_success_embed(ctx, "Invite wave sent out successfully.");
        } catch (e) {
            return await dispatch_error_embed(ctx, `An error occurred while generating an invite:\n**${e.message}**.`);
        }
    }
}