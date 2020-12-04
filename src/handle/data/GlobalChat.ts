function globalChat(message){
    const data = {
     id:message.channel.id,
     guild:message.guild.id
    }
    return data;
}

export default { globalChat }
