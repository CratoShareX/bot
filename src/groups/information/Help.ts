import {BaseConfig, Blueprint, Command, Executor, Message} from "@dxz/blueprint";
import {getCommandList} from "../../structures/GetCommandList";
import {MessageEmbed} from "helperis";
import {stripIndents} from "common-tags";
import {dispatch_error_embed} from "../../structures/EmbedTypes";

@Command({
    aliases: [],
    groups: ["User"],
    name: "help"
})
export class Help implements Executor {
    async callback(ctx: Message, args: string[], ref: Blueprint<BaseConfig>) {
        if (args[0]) {
            try {
                const commandList = await getCommandList(ref);
                if (commandList.find((command) => command.cmdName === args[0])) {
                    const resolvedCmd = commandList.find((command) => command.cmdName === args[0]);
                    const embed = new MessageEmbed()
                        .setTitle(`Help for ${resolvedCmd?.cmdName}`)
                        .setColor("0x03fc6b")
                        .addField("Aliases", `${resolvedCmd?.cmdAliases.join(", ") ? resolvedCmd?.cmdAliases.join(", ") : "None"}`, true)
                        .addField("Groups", `${resolvedCmd?.cmdGroups.join(", ") ? resolvedCmd?.cmdGroups.join(", ") : "Everyone"}`, true);
                    await ctx.channel.createMessage({ embed: embed.code });
                    return;
                } else {
                    return await dispatch_error_embed(ctx, "Couldn't find a command matching that name.");
                }
            } catch (e) {
                return await dispatch_error_embed(ctx, `An error occurred whilst getting command:\n**${e.message}**.`);
            }
        } else {
            try {
                const commandList = await getCommandList(ref);
                const embed = new MessageEmbed();
                embed.setColor("0x03fc6b");
                embed.setTitle("Help Menu");
                for (const {cmdName, cmdAliases, cmdGroups} of commandList) {
                    embed.addField(
                        cmdName,
                        stripIndents`
                            Aliases: **${cmdAliases.join(", ") ? cmdAliases.join(", ") : "None"}**
                            Permission Groups: **${cmdGroups.join(", ") ? cmdGroups.join(", ") : "Everyone"}**
                        `,
                        false
                    )
                }
                return await ctx.channel.createMessage({
                    embed: embed.code
                });
            } catch (e) {
                return await dispatch_error_embed(ctx, `An error occurred whilst getting help list:\n**${e.message}**.`);
            }
        }
    }
}