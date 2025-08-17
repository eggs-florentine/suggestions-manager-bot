import { MessageBuilder, ColorUtils } from 'djs-components-helper';
import { MessageFlags } from 'discord.js';

function newSuggestionCreated(id, title, summary, author, authorAvatarURL) {
    const message = new MessageBuilder()
        .addContainer({
            accentColor: '0xffd103',
            children: [
                { type: 'Text', content: `${title}`}
            ]
        })
        .addSeparator()
        .addSection({
            text: [
                `**Summary: ${summary}`
                `**I support this suggestion:**`
            ],
            accessory: {
                type: 'button',
                customId: `y_${id}`,
                label: 'Vote',
                style: 'success'
            }    
        })
        .addSection({
            text: [
                `**I do not support this suggestion:**`
            ],
            accessory: {
                type: 'button',
                customId: `n_${id}`,
                label: 'Vote',
                style: 'danger'
            }    
        })
        

}