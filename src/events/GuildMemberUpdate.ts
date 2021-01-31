import {Blueprint, Member} from "@dxz/blueprint";
import {FullConfig} from "../structures/Types";
import {Guild} from "eris";
import {API} from "../classes/API";

export async function guildMemberUpdate(
    ref: Blueprint<FullConfig>,
    guild: Guild,
    oldMember: Member,
    member: Member
) {
    if (
        !member.roles.includes(ref.core.config.crato.boosterRole)
    ) {
        return;
    } else {
        try {
            const user = await member.user.getDMChannel();
            const api = ref.registry.data.get("api") as API;
            const {code} = await api.generateInvite();
            await user.createMessage({
                embed: {
                    title: "Thanks for boosting!",
                    description: `Hey! Thanks for boosting Crato. As a reward, please take this invite: **${code}**`,
                    color: 0x03fc6b
                }
            })
        } catch (e) {

        }
    }
}